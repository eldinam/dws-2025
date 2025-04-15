from contextlib import asynccontextmanager
from typing import Annotated

from database import engine
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from controllers import user_controller

def create_db_and_tables():
  SQLModel.metadata.create_all(engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
  create_db_and_tables()
  yield
  print("Gašenje aplikacije")



app = FastAPI(lifespan=lifespan)


app.include_router(user_controller.router, prefix="/users", tags=["Users"])