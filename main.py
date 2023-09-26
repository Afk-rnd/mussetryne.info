# main.py

import os

from auth import create_access_token, decode_access_token, hash_password, verify_password
from db import Straffefisk, StraffefiskCreate, StraffefiskDB, Token, User, UserCreate, UserDB, UserLogin, Base

from typing import List
from fastapi import FastAPI
from datetime import datetime
from sqlalchemy.orm import Session
from http.client import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.declarative import declarative_base




app = FastAPI()

# SQLite Database Setup
database_url = os.getenv("DATABASE_URL")
engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)




def get_db():
    """ Dependency to inject database session into route functions. """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """ Retrieves the current user from the database. Only works if the user is authenticated, otherwise raises HTTPException. """
    email = decode_access_token(token)
    if email:
        user = db.query(UserDB).filter(UserDB.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return user




# Routes:

@app.post("/straffefisk/", response_model=Straffefisk)
def give_straffefisk(sf: StraffefiskCreate, current_user: UserDB = Depends(get_current_user)):
    db_item = StraffefiskDB(**sf.model_dump(), given_by_id=current_user.id, given_dt=datetime.now())
    print(db_item)
    with SessionLocal() as session:
        session.add(db_item)
        session.commit()
        session.refresh(db_item)
        return db_item

@app.get("/straffefisk/", response_model=List[Straffefisk])
def read_straffefisk(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """ Route to get all straffefisk. """
    straffefisk = db.query(StraffefiskDB).offset(skip).limit(limit).all()
    return straffefisk

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
    user = UserDB(email=user_data.email, hashed_password=hashed_password, salt=salt)

    # Add the user to the database session and commit the transaction
    with SessionLocal() as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        # return user_item

    # Return a response indicating successful registration
    return {"message": "User registered successfully"}

@app.get("/users/me")
def current_user(current_user: UserDB = Depends(get_current_user)):
    """ Route that requires authentication. """
    return {"user": "%s" % current_user.email}

@app.get("/users/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """ Route to get all users. """
    users = db.query(UserDB).offset(skip).limit(limit).all()
    return users

@app.get("/")
def root():
    return {"message": "Mussetryne2.0 is live and now."}



# Main:

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=42069)
