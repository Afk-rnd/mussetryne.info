from datetime import datetime

from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(BaseModel):
    id: int
    salt: str
    email: str
    hashed_password: str

class UserCreate(BaseModel):
    email: str
    password: str

class UserDB(Base):
    __tablename__ = "users"  # Replace with your actual table name

    id = Column(Integer, primary_key=True, index=True)
    salt = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Straffefisk(BaseModel):
    __tablename__ = "items"
    id: int
    number: int
    given_to: User
    given_by: User
    description: str
    given_dt: datetime
    taken_dt: datetime

class StraffefiskCreate(BaseModel):
    number: int
    given_to: User
    given_by: User
    description: str
    given_dt: datetime
    taken_dt: datetime
    