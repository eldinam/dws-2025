from models.usluga_model import Usluga
from sqlmodel import Session, select


def create_usluga(session: Session, usluga: Usluga) -> Usluga:
    session.add(usluga)
    session.commit()
    session.refresh(usluga)
    return usluga

def get_usluge(session: Session, offset: int = 0, limit: int = 100) -> list[Usluga]:
    return session.exec(select(Usluga).offset(offset).limit(limit)).all()

def get_usluga(session: Session, usluga_id: int) -> Usluga | None:
    return session.get(Usluga, usluga_id)

def update_usluga(session: Session, db_usluga: Usluga, updates: dict) -> Usluga:
    for key, value in updates.items():
        setattr(db_usluga, key, value)

    session.add(db_usluga)
    session.commit()
    session.refresh(db_usluga)
    return db_usluga

def delete_usluga(session: Session, db_usluga: Usluga) -> None:
    session.delete(db_usluga)
    session.commit()
