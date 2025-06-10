from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from database import engine
from schemas.uplata_schema import UplataCreate, UplataInfo, UplataRead, UplataUpdate
from services import uplata_service

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter()

@router.post("/", response_model=UplataRead)
def create_uplata(session: SessionDep, uplata_data: UplataCreate):
    return uplata_service.create_uplata(session, uplata_data)

@router.get("/", response_model=list[UplataInfo])
def list_uplate(session: SessionDep, offset: int = 0, limit: int = 100):
    return uplata_service.get_uplate(session, offset, limit)

@router.get("/{uplata_id}", response_model=UplataRead)
def get_uplata(session: SessionDep, uplata_id: int):
    return uplata_service.get_uplata(session, uplata_id)

@router.put("/{uplata_id}", response_model=UplataRead)
def update_uplata(uplata_id: int, uplata_data: UplataUpdate, session: Session = Depends(get_session)):
    return uplata_service.update_uplata(session, uplata_id, uplata_data)

@router.delete("/{uplata_id}")
def delete_uplata(uplata_id: int, session: Session = Depends(get_session)):
    uplata_service.delete_uplata(session, uplata_id)
    return {"message": "Uplata deleted successfully"}
