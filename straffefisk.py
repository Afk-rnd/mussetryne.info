from datetime import datetime
from pydantic import BaseModel
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from db import Base

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