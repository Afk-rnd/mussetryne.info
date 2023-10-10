from pydantic import BaseModel
from sqlalchemy.orm import declarative_base, DeclarativeBase
from sqlalchemy import Column, Integer, ForeignKey, Table

class Base(DeclarativeBase):
    pass

# Base = declarative_base()

# Metatables:

# Define the secondary table for the many-to-many relationship:
bucket_user_associations = Table('bucket_user', Base.metadata,
    Column('bucket_id', Integer, ForeignKey('buckets.id')),
    Column('user_id', Integer, ForeignKey('users.id'))
)

# Authentification:

class Token(BaseModel):
    """ Pydantic model for JWT access-tokens used for user authentication. """
    access_token: str
    token_type: str
