# main.py
import os
from db import Item, ItemCreate

from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from passlib.context import CryptContext

app = FastAPI()

# SQLite Database Setup
# SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
database_url = os.getenv("DATABASE_URL", "sqlite:///./test.db")
engine = create_engine(database_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(bind=engine)

@app.post("/items/", response_model=Item)  # Use a valid Pydantic model here
def create_item(item: ItemCreate):
    db_item = Item(**item.dict())
    with SessionLocal() as session:
        session.add(db_item)
        session.commit()
        session.refresh(db_item)
        return db_item
    
# @app.post("/login/")
# def login(username: str)


@app.get("/items/{item_id}", response_model=Item)
def read_item(item_id: int):
    with SessionLocal() as session:
        return session.query(Item).filter(Item.id == item_id).first()
