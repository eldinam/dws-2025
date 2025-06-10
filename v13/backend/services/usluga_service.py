from sqlmodel import Session
from schemas.usluga_schema import UslugaCreate, UslugaUpdate
from models.usluga_model import Usluga
from repositories import usluga_repository
from fastapi import HTTPException


def create_usluga(session: Session, usluga_data: UslugaCreate) -> Usluga:
    usluga = Usluga(**usluga_data.dict())
    return usluga_repository.create_usluga(session, usluga)


def get_usluge(session: Session, offset: int = 0, limit: int = 100) -> list[Usluga]:
    return usluga_repository.get_usluge(session, offset, limit)


def get_usluga(session: Session, usluga_id: int) -> Usluga:
    usluga = usluga_repository.get_usluga(session, usluga_id)

    if not usluga:
        raise HTTPException(status_code=404, detail="Usluga nije pronađena")
    
    return usluga


def update_usluga(session: Session, usluga_id: int, usluga_data: UslugaUpdate) -> Usluga:
    db_usluga = usluga_repository.get_usluga(session, usluga_id)

    if not db_usluga:
        raise HTTPException(status_code=404, detail="Usluga nije pronađena")
    
    return usluga_repository.update_usluga(session, db_usluga, usluga_data.dict(exclude_unset=True))


def delete_usluga(session: Session, usluga_id: int) -> None:
    db_usluga = usluga_repository.get_usluga(session, usluga_id)

    if not db_usluga:
        raise HTTPException(status_code=404, detail="Usluga nije pronađena")
    
    usluga_repository.delete_usluga(session, db_usluga)
