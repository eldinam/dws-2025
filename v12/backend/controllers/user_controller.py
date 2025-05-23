from contextlib import asynccontextmanager
from typing import Annotated

from database import engine
from fastapi import Depends, FastAPI, HTTPException, Query, APIRouter
from sqlmodel import Field, Session, SQLModel, create_engine, select
from services import user_service
from schemas.user_schema import UserCreate, UserRead, UserUpdate

def get_session():
  with Session(engine) as session:
    yield session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter()

@router.post("/", response_model=UserRead)
def create_user(session: SessionDep, user_data: UserCreate):
  return user_service.create_user(session, user_data)

@router.get("/")
def list_users(session: SessionDep, offset: int = 0, limit: int = 100):
  return user_service.get_users(session, offset, limit)

@router.get("/{user_id}")
def get_user(session: SessionDep, user_id: int):
  return user_service.get_user(session, user_id)

@router.put("/{user_id}")
def update_user(session: SessionDep, user_id: int, user_data: UserUpdate):
  return user_service.update_user(session, user_id, user_data)

@router.delete("/{user_id}")
def delete_user(user_id: int, session: Session = Depends(get_session)):
  user_service.delete_user(session, user_id)

  return {"message": "User deleted successfully"}