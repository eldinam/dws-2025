from contextlib import asynccontextmanager
from typing import Annotated

from database import engine
from fastapi import Depends, FastAPI, HTTPException, Query
from models import Student
from sqlmodel import Field, Session, SQLModel, create_engine, select


def create_db_and_tables():
  SQLModel.metadata.create_all(engine)


def get_session():
  with Session(engine) as session:
    yield session


SessionDep = Annotated[Session, Depends(get_session)]


@asynccontextmanager
async def lifespan(app: FastAPI):
  create_db_and_tables()
  yield
  print("Gašenje aplikacije")



app = FastAPI(lifespan=lifespan)


@app.get("/")
def index():
  return {"data": {"name": "Hello", "nesto": "World"}}

@app.post("/student/")
def create_student(session:SessionDep, student:Student) -> Student:
  session.add(student)
  session.commit()
 
  session.refresh(student)

  return student

@app.get("/student-list/")
def student_list(session:SessionDep, offest: int = 0, limit: int = 100) -> list[Student]:
  statement = select(Student).offset(offest).limit(limit)
  students = session.exec(statement).all()

  return students
