from contextlib import asynccontextmanager
from typing import Annotated

from database import engine
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query
from schemas.usluga_schema import UslugaCreate, UslugaRead, UslugaUpdate
from services import statistika_service
from sqlmodel import Field, Session, SQLModel, create_engine, select


def get_session():
  with Session(engine) as session:
    yield session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter()


@router.get("/")
def get_statistika(session: Session = Depends(get_session)):
    return statistika_service.get_statistika(session)

