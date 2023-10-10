from typing import List
from pydantic import BaseModel
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Column, Integer, String, ForeignKey

from db import Base, bucket_user_associations

class BucketDB(Base):
    """ Database model for Bucket. """
    __tablename__ = 'buckets'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name = Column(String)
    topic = Column(String)

    # Define the relationship between BucketDB and UserDB:
    users: Mapped[List["UserDB"]] = relationship("UserDB", secondary=bucket_user_associations, back_populates="buckets")

    # Define the relationship between BucketDB and owner (UserDB):
    owner_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship('UserDB', foreign_keys=[owner_id])

class Bucket(BaseModel):
    """ Pydantic model for Bucket. """
    id: int
    name: str
    topic: str
    users: List[int]  # List of userIDs.
    owner_id: int

class BucketCreate(BaseModel):
    """ Pydantic model for creating Bucket. """
    name: str
    topic: str
