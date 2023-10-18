from typing import List
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Integer
from sqlalchemy.orm import relationship, Mapped, mapped_column

from db import Base, bucket_user_associations, unconfirmed_bucket_user_associations

class UserDB(Base):
    """ Database model for User. """
    __tablename__ = "users"  # Replace with your actual table name

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    salt = Column(String)
    hashed_password = Column(String)
    is_admin = Column(Integer, default=0)
    approved = Column(Integer, default=0)
    email = Column(String, unique=True, index=True)
    
    profile_picture_path = Column(String, default="mussepictures/default_profile_picture.jpeg")

    status = Column(String, default="waiting_for_approval")
    buckets: Mapped[List["BucketDB"]] = relationship("BucketDB", secondary=bucket_user_associations, back_populates="users", overlaps="unconfirmed_users")
    unconfirmed_buckets: Mapped[List["BucketDB"]] = relationship("BucketDB", secondary=unconfirmed_bucket_user_associations, back_populates="unconfirmed_users", overlaps="users")

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
