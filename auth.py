import os
import secrets
from typing import Tuple

from fastapi import HTTPException
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt




# Password Hashing:

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> Tuple[str, str]:
    """ Hash the given password and return the hashed password and salt value. """
    
    # Generate a random salt value
    salt = secrets.token_hex(16)

    # Hash the password with the salt value
    hashed_password = pwd_context.hash(password + salt)

    # Return the hashed password and salt value
    return f"{hashed_password}:{salt}", salt

def verify_password(plain_password: str, hashed_password: str, salt: str) -> bool:
    """ Verify that the given plain text password matches the hashed password. """

    # Split the hashed password and salt value
    hashed_password, salt_in_db = hashed_password.split(":")

    # Hash the plain text password with the salt value
    return pwd_context.verify(plain_password + salt_in_db, hashed_password)




# Access Token:

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """ Create a JWT access token with the given data. """
    if not SECRET_KEY:
        raise HTTPException(status_code=500, detail="No secret key set for JWT token.")
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    try:
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    except JWTError:
        raise HTTPException(status_code=500, detail="Could not create access token.")

def decode_access_token(token: str):
    """ Decode a JWT access token and return the email address. """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
