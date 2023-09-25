from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String

class Item(BaseModel):
    __tablename__ = "items"
    id: int
    name: str
    description: str

class ItemCreate(BaseModel):
    name: str
    description: str

# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)

