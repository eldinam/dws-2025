from contextlib import asynccontextmanager
from typing import Annotated

from database import engine
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query
from schemas.usluga_schema import UslugaCreate, UslugaRead, UslugaUpdate
from services import korisnik_service
from sqlmodel import Field, Session, SQLModel, create_engine, select


def get_session():
  with Session(engine) as session:
    yield session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter()


@router.get("/")
def list_korisnici(session: SessionDep, offset: int = 0, limit: int = 100):
  return korisnik_service.get_korisnici(session, offset, limit)

