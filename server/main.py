# main.py

import os

from PIL import Image
from auth import create_access_token, decode_access_token, hash_password, verify_password
from db import Base, Token
from bucket import BucketCreate, BucketDB
from image import process_mussepicture
from user import User, UserCreate, UserDB, UserLogin
from straffefisk import Straffefisk, StraffefiskCreate, StraffefiskDB

from typing import List
from fastapi import FastAPI
from fastapi import File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from datetime import datetime
from sqlalchemy.orm import Session
from http.client import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status




app = FastAPI()

# Middleware:

origins = [
    "http://localhost",
    "http://localhost:42069",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=["*"],
)





# Constants:

PROFILE_PICTURES_DIRECTORY = "mussepictures"




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
        self.db.refresh(self.user)


def get_db():
    """ Dependency to inject database session into route functions. """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_authenticated_session(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> AuthenticatedSession:
    """ Dependency to inject database session into route functions. Returns AuthenticatedSession object containing database session and current user. User must be approved. """
    email = decode_access_token(token)
    if email:
        user = db.query(UserDB).filter(UserDB.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    try:
        if user.status != "approved":
            raise HTTPException(status_code=401, detail="User not approved")
        yield AuthenticatedSession(user=user, db=db)
    finally:
        db.close()

def get_unapproved_session(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> AuthenticatedSession:
    """ Dependency to inject database session into route functions. Returns AuthenticatedSession object containing database session and current user. User does not have to be approved. """
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

@app.post("/{bucket_name}/straffefisk/", response_model=Straffefisk)
def give_straffefisk(bucket_name: str, sf: StraffefiskCreate, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    # Check if bucket exists:
    try:
        bucket_id = authenticated_session.db.query(BucketDB).filter(BucketDB.name == bucket_name).first().id
    except AttributeError:
        raise HTTPException(status_code=404, detail="Bucket not found")
    
    # Check if user is in bucket:
    if bucket_id not in [bucket.id for bucket in authenticated_session.user.buckets]:
        raise HTTPException(status_code=401, detail="User not in bucket")
    
    # Check if recipient is in bucket:
    if sf.given_to_id not in [user.id for user in authenticated_session.db.query(BucketDB).filter(BucketDB.id == bucket_id).first().users]:
        raise HTTPException(status_code=401, detail="Recipient not in bucket")
    
    # Create StraffefiskDB object and add to database:
    db_item = StraffefiskDB(**sf.model_dump(), given_by_id=authenticated_session.user.id, given_dt=datetime.now(), bucket_id=bucket_id)
    authenticated_session.db.add(db_item)
    authenticated_session.db.commit()
    authenticated_session.db.refresh(db_item)
    return db_item

@app.get("/{bucket_name}/straffefisk/", response_model=List[Straffefisk])
def list_straffefisk_in_bucket(bucket_name: str, skip: int = 0, limit: int = 100, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to get all straffefisk in bucket. """
    # Check if bucket exists:
    try:
        bucket_id = authenticated_session.db.query(BucketDB).filter(BucketDB.name == bucket_name).first().id
    except AttributeError:
        raise HTTPException(status_code=404, detail="Bucket not found")
    
    # Check if user is in bucket and confirmed by owner (if private):
    if bucket_id not in [bucket.id for bucket in authenticated_session.user.buckets]:
        raise HTTPException(status_code=401, detail="User not in bucket")
    
    straffefisk = authenticated_session.db.query(StraffefiskDB).filter(StraffefiskDB.bucket_id == bucket_id)
    straffefisk = straffefisk.offset(skip).limit(limit).all()
    # straffefisk = db.query(StraffefiskDB).offset(skip).limit(limit).all() # All straffefisk.

    return straffefisk

@app.post("/bucket/")
def create_bucket(bucket: BucketCreate, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to create a bucket. Buckets are groups in which one can give out straffefisk. Body of request should be a BucketCreate modeled JSON-object. """
    # Check if bucket name is already in use:
    existing_bucket = authenticated_session.db.query(BucketDB).filter_by(name=bucket.name).first()
    if existing_bucket:
        raise HTTPException(status_code=400, detail="Bucket name already in use")
    
    bucket_item = BucketDB(**bucket.model_dump(), owner=authenticated_session.user)
    authenticated_session.db.add(bucket_item)
    authenticated_session.db.commit()

    authenticated_session.db.refresh(bucket_item)
    bucket_item.users.append(authenticated_session.user)
    authenticated_session.db.add(bucket_item)
    authenticated_session.db.commit()

    authenticated_session.db.refresh(bucket_item)
    return {"message": "Bucket created successfully"}

@app.put("/bucket/{bucket_name}/join")
def join_bucket(bucket_name: str, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route for current user to join a bucket. If the bucket is private, the owner must confirm the join."""
    bucket = authenticated_session.db.query(BucketDB).filter(BucketDB.name == bucket_name).first()
    if bucket:
        # Check if user is already in bucket:
        if authenticated_session.user in bucket.users or authenticated_session.user in bucket.unconfirmed_users:
            raise HTTPException(status_code=401, detail="User already in bucket")
        if bucket.public:
            bucket.users.append(authenticated_session.user)
            authenticated_session.db.add(bucket)
            authenticated_session.db.commit()
            authenticated_session.db.refresh(bucket)
            return {"message": "User joined bucket successfully"}
        else:
            bucket.unconfirmed_users.append(authenticated_session.user)
            authenticated_session.db.add(bucket)
            authenticated_session.db.commit()
            authenticated_session.db.refresh(bucket)
            return {"message": "User joined bucket successfully, but must be confirmed by owner"}
    else:
        raise HTTPException(status_code=404, detail="Bucket not found")

def _confirm_user_in_bucket(bucket_name: str, user: UserDB, db: Session):
    """ Helper function to confirm a user in a bucket. """
    bucket = db.query(BucketDB).filter(BucketDB.name == bucket_name).first()
    if bucket:
        # Check if user is in bucket:
        if user not in bucket.unconfirmed_users:
            raise HTTPException(status_code=401, detail="User not in bucket")
        
        # Move user from unconfirmed to confirmed:
        bucket.unconfirmed_users.remove(user)
        bucket.users.append(user)
        db.add(bucket)
        db.commit()
        db.refresh(bucket)

        return {"message": "User confirmed in bucket successfully"}
    else:
        raise HTTPException(status_code=404, detail="Bucket not found")

@app.put("/bucket/{bucket_name}/confirm/{user_id}")
def confirm_user_in_bucket_by_id(bucket_name: str, user_id: int, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to confirm a user in a bucket. """
    # Check if bucket exists:
    bucket = authenticated_session.db.query(BucketDB).filter(BucketDB.name == bucket_name).first()
    if bucket:

        # Check if authenticated user is owner of bucket:
        if authenticated_session.user.id == bucket.owner_id:
            user = authenticated_session.db.query(UserDB).filter(UserDB.id == user_id).first()
            if user:
                return _confirm_user_in_bucket(bucket_name, user, authenticated_session.db)
            raise HTTPException(status_code=404, detail="User not found")
        
        raise HTTPException(status_code=401, detail="User not authorized")
    
    raise HTTPException(status_code=404, detail="Bucket not found")

@app.get("/bucket/{bucket_name}/unconfirmed_users")
def get_unconfirmed_users_in_bucket(bucket_name: str, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to get all unconfirmed users in a bucket. """
    # Check if bucket exists:
    bucket = authenticated_session.db.query(BucketDB).filter(BucketDB.name == bucket_name).first()
    if bucket:

        # Check if authenticated user is owner of bucket:
        if authenticated_session.user.id == bucket.owner_id:
            return bucket.unconfirmed_users
        
        raise HTTPException(status_code=401, detail="User not authorized")
    
    raise HTTPException(status_code=404, detail="Bucket not found")

@app.post("/login", response_model=Token)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    """ Route to log in user. Body of request should be a UserLogin modeled JSON-object. Returns JWT token. """

    user = db.query(UserDB).filter(UserDB.email == user_login.email).first()
    if user:
        if verify_password(user_login.password, user.hashed_password, user.salt):
            access_token = create_access_token(data={"sub": user.email})
            return {"access_token": access_token, "token_type": "bearer", "user_email": user.email}
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
    user = UserDB(email=user_data.email, hashed_password=hashed_password, salt=salt, status="waiting_for_approval")
    db.add(user)
    db.commit()
    db.refresh(user)

    # Return a response indicating successful registration
    return {"message": "User registered successfully"}

@app.post("/upload_mussepicture")
async def upload_mussepicture(mussepicture: UploadFile = File(...), authenticated_session: AuthenticatedSession = Depends(get_unapproved_session)):
    """ Route to upload profile picture (Mussepicture). Does not require user to be approved. """
    if not os.path.exists(PROFILE_PICTURES_DIRECTORY):
        os.mkdir(PROFILE_PICTURES_DIRECTORY)

    file_path = os.path.join("mussepictures", authenticated_session.user.email + ".jpeg")
    await process_mussepicture(mussepicture, save_path=file_path)

    authenticated_session.user.profile_picture_path = file_path
    authenticated_session.db.commit()
    authenticated_session.db.refresh(authenticated_session.user)

    return {"message": "Profile picture (mussepicture) uploaded successfully"}

@app.get("/profile_picture")
def get_profile_picture(user_email: str, authenticated_session: AuthenticatedSession = Depends(get_unapproved_session)):
    """ Route to get profile picture (Mussepicture). """
    # if user_email != authenticated_session.user.email:
    #     raise HTTPException(status_code=401, detail="Not authorized to view this profile picture")

    if not authenticated_session.user.profile_picture_path:
        raise HTTPException(status_code=404, detail="Profile picture not found")

    return FileResponse(authenticated_session.user.profile_picture_path)

@app.get("/users/me")
def current_user(authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route that requires authentication. """
    return {"user": "%s" % authenticated_session.user.email}

@app.get("/users/me/approved")
def current_user_approved(authenticated_session: AuthenticatedSession = Depends(get_unapproved_session)):
    """ Route that requires authentication. """
    return {"approved": "%d" % authenticated_session.user.approved}

@app.put("/users/approve")
async def approve_user(user_email: str, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to approve user. """
    print(authenticated_session.user.is_admin)
    if not bool(authenticated_session.user.is_admin):
        raise HTTPException(status_code=401, detail="Not authorized to approve users")
    
    user = authenticated_session.db.query(UserDB).filter(UserDB.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.status = "approved"
    authenticated_session.db.add(user)

    authenticated_session.db.commit()
    authenticated_session.db.refresh(user)

    return {"message": "User approved successfully"}

@app.put("/users/reject")
async def reject_user(user_email: str, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to reject user. """
    if not authenticated_session.user.is_admin:
        raise HTTPException(status_code=401, detail="Not authorized to reject users")
    
    user = authenticated_session.db.query(UserDB).filter(UserDB.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.status = "rejected"
    authenticated_session.db.add(user)

    authenticated_session.db.commit()
    authenticated_session.db.refresh(user)

    return {"message": "User rejected successfully"}

@app.get("/users/unapproved", response_model=List[User])
def read_unapproved_users(skip: int = 0, limit: int = 100, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to get all unapproved users. """
    if not authenticated_session.user.is_admin:
        raise HTTPException(status_code=401, detail="Not authorized to view unapproved users")
    
    users = authenticated_session.db.query(UserDB).filter(UserDB.status == "waiting_for_approval").offset(skip).limit(limit).all()

    return users

@app.put("/users/upgrade")
async def upgrade_user(user_email: str, authenticated_session: AuthenticatedSession = Depends(get_authenticated_session)):
    """ Route to upgrade user. """
    if not authenticated_session.user.is_admin:
        raise HTTPException(status_code=401, detail="Not authorized to upgrade users")
    
    user = authenticated_session.db.query(UserDB).filter(UserDB.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_admin = True
    authenticated_session.db.add(user)

    authenticated_session.db.commit()
    authenticated_session.db.refresh(user)

    return {"message": "User upgraded successfully"}

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
