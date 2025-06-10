from models.korisnik_model import Korisnik
from sqlmodel import Session, select


def get_korisnici(session: Session, offset: int = 0, limit: int = 100) -> list[Korisnik]:
    return session.exec(select(Korisnik).offset(offset).limit(limit)).all()

