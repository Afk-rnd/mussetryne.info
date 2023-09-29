# main.py

import os

from auth import create_access_token, decode_access_token, hash_password, verify_password
from db import Base, Token
from bucket import BucketCreate, BucketDB
from user import User, UserCreate, UserDB, UserLogin
from straffefisk import Straffefisk, StraffefiskCreate, StraffefiskDB

from typing import List
from fastapi import FastAPI
from datetime import datetime
from sqlalchemy.orm import Session
from http.client import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status




app = FastAPI()

# SQLite Database Setup
database_url = os.getenv("DATABASE_URL")
engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)




class AuthenticatedSession():
    """ Class to hold database session and authenticated current user. """
    def __init__(self, db: SessionLocal, user: UserDB):
        self.db = db
        self.user = user


def get_db():
    """ Dependency to inject database session into route functions. """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_authenticated_session(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> AuthenticatedSession:
    """ Dependency to inject database session into route functions. """
    email = decode_access_token(token)
    if email:
        user = db.query(UserDB).filter(UserDB.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    try:
        yield AuthenticatedSession(user=user, db=db)
    finally:
        db.close()




# Routes:

@app.post("/straffefisk/", response_model=Straffefisk)
def give_straffefisk(sf: StraffefiskCreate, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    db_item = StraffefiskDB(**sf.model_dump(), given_by_id=authenticated_session.user.id, given_dt=datetime.now())
    authenticated_session.db.add(db_item)
    authenticated_session.db.commit()
    authenticated_session.db.refresh(db_item)
    return db_item

@app.get("/straffefisk/", response_model=List[Straffefisk])
def read_straffefisk(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """ Route to get all straffefisk. """
    straffefisk = db.query(StraffefiskDB).offset(skip).limit(limit).all()
    return straffefisk

@app.post("/bucket/")
def create_bucket(bucket: BucketCreate, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to create a bucket. Buckets are groups in which one can give out straffefisk. Body of request should be a BucketCreate modeled JSON-object. """
    bucket_item = BucketDB(**bucket.model_dump(), owner=authenticated_session.user)
    authenticated_session.db.add(bucket_item)
    authenticated_session.db.commit()

    authenticated_session.db.refresh(bucket_item)
    bucket_item.users.append(authenticated_session.user)
    authenticated_session.db.add(bucket_item)
    authenticated_session.db.commit()

    authenticated_session.db.refresh(bucket_item)
    return {"message": "Bucket created successfully"}

@app.post("/login", response_model=Token)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    """ Route to log in user. Body of request should be a UserLogin modeled JSON-object. Returns JWT token. """

    user = db.query(UserDB).filter(UserDB.email == user_login.email).first()
    if user:
        if verify_password(user_login.password, user.hashed_password, user.salt):
            access_token = create_access_token(data={"sub": user.email})
            return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.post("/register")
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """ Route to register new user. Body of request should be a UserCreate modeled JSON-object. """
    # Check if the email is already in use
    existing_email = db.query(UserDB).filter_by(email=user_data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password, salt = hash_password(user_data.password)

    # Add the user to the database session and commit the transaction
    user = UserDB(email=user_data.email, hashed_password=hashed_password, salt=salt)
    db.add(user)
    db.commit()
    db.refresh(user)

    # Return a response indicating successful registration
    return {"message": "User registered successfully"}

@app.get("/users/me")
def current_user(authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route that requires authentication. """
    return {"user": "%s" % authenticated_session.user.email}

@app.get("/users/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """ Route to get all users. """
    users = db.query(UserDB).offset(skip).limit(limit).all()
    return users

@app.get("/")
def root():
    """ Route to test if the API is live. """
    return {"message": "Mussetryne2.0 is live and now."}




# Main:

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=42069)
