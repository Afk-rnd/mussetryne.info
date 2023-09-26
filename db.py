from datetime import datetime

from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship




Base = declarative_base()




# Users and authentication:

class UserDB(Base):
    __tablename__ = "users"  # Replace with your actual table name

    id = Column(Integer, primary_key=True, index=True)
    salt = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class User(BaseModel):
    id: int
    salt: str
    email: str
    hashed_password: str

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str




# Straffefisk:

class StraffefiskDB(Base):
    __tablename__ = 'straffefisk'

    id = Column(Integer, primary_key=True)
    number = Column(Integer)
    given_to_id = Column(Integer, ForeignKey('users.id'))
    given_to = relationship('UserDB', foreign_keys=[given_to_id])
    given_by_id = Column(Integer, ForeignKey('users.id'))
    given_by = relationship('UserDB', foreign_keys=[given_by_id])
    description = Column(String)
    given_dt = Column(DateTime)
    taken_dt = Column(DateTime, nullable=True)

class Straffefisk(BaseModel):
    id: int
    number: int
    given_to_id: int
    given_by_id: int
    description: str
    given_dt: datetime
    taken_dt: datetime | None

class StraffefiskCreate(BaseModel):
    number: int
    given_to_id: int
    description: str
