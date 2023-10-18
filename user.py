from typing import List
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, Mapped, mapped_column

from db import Base, bucket_user_associations

class UserDB(Base):
    """ Database model for User. """
    __tablename__ = "users"  # Replace with your actual table name

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    is_admin: Mapped[bool] = mapped_column(Integer, default=0)
    approved: Mapped[bool] = mapped_column(Integer, default=0)
    
    email = Column(String, unique=True, index=True)
    
    salt = Column(String)
    hashed_password = Column(String)

    buckets: Mapped[List["BucketDB"]] = relationship("BucketDB", secondary=bucket_user_associations, back_populates="users")
    unconfirmed_buckets: Mapped[List["BucketDB"]] = relationship("BucketDB", secondary=bucket_user_associations, back_populates="unconfirmed_users")

class User(BaseModel):
    """ Pydantic model for User. """
    id: int
    salt: str
    email: str
    hashed_password: str

class UserCreate(BaseModel):
    """ Pydantic model for creating User. """
    email: str
    password: str

class UserLogin(BaseModel):
    """ Pydantic model for logging in User. """
    email: str
    password: str
