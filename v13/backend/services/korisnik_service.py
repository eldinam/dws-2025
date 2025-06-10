from fastapi import HTTPException
from models.korisnik_model import Korisnik
from repositories import korisnik_repository
from sqlmodel import Session


def get_korisnici(session: Session, offset: int = 0, limit: int = 100) -> list[Korisnik]:
    return korisnik_repository.get_korisnici(session, offset, limit)
