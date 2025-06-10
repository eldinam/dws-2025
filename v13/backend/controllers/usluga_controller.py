from contextlib import asynccontextmanager
from typing import Annotated

from database import engine
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query
from schemas.usluga_schema import UslugaCreate, UslugaRead, UslugaUpdate
from services import usluga_service
from sqlmodel import Field, Session, SQLModel, create_engine, select


def get_session():
  with Session(engine) as session:
    yield session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter()

@router.post("/", response_model=UslugaRead)
def create_usluga(session: SessionDep, usluga_data: UslugaCreate):
  return usluga_service.create_usluga(session, usluga_data)

@router.get("/")
def list_usluge(session: SessionDep, offset: int = 0, limit: int = 100):
  return usluga_service.get_usluge(session, offset, limit)

@router.get("/{usluga_id}")
def get_usluga(session: SessionDep, usluga_id: int):
  return usluga_service.get_usluga(session, usluga_id)

@router.put("/{usluga_id}")
def update_usluga(session: SessionDep, usluga_id: int, usluga_data: UslugaUpdate):
  return usluga_service.update_usluga(session, usluga_id, usluga_data)

@router.delete("/{usluga_id}")
def delete_usluga(usluga_id: int, session: Session = Depends(get_session)):
  usluga_service.delete_usluga(session, usluga_id)
  return {"message": "Usluga deleted successfully"}
