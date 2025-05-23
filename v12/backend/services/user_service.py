
from sqlmodel import Session
from schemas.user_schema import UserCreate, UserUpdate
from models.user_model import User
from repositories import user_repository
from fastapi import HTTPException


def create_user(session: Session, user_data: UserCreate) -> User:
  user = User(**user_data.dict())
  return user_repository.create_user(session, user)

def get_users(session: Session, offset: int = 0, limit: int = 100) -> list[User]:
  return user_repository.get_users(session, offset, limit)

def get_user(session:Session, user_id: int) -> User:
  user = user_repository.get_user(session, user_id)

  if not user:
    raise HTTPException(status_code=404, detail="User not found")
  
  return user

def update_user(session: Session, user_id: int, user_data: UserUpdate) -> User:
  db_user = user_repository.get_user(session, user_id)

  if not db_user:
    raise HTTPException(status_code=404, detail="User not found")
  
  return user_repository.update_user(session, db_user, user_data.dict(exclude_unset=True))

def delete_user(session: Session, user_id: int) -> None:
  db_user = user_repository.get_user(session, user_id)

  if not db_user:
    raise HTTPException(status_code=404, detail="User not found")
  
  user_repository.delete_user(session, db_user)