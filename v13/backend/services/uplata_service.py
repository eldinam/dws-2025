from datetime import date

from fastapi import HTTPException
from models.korisnik_model import Korisnik
from models.uplata_model import Uplata
from models.usluga_model import Usluga
from repositories import uplata_repository
from schemas.uplata_schema import UplataCreate, UplataInfo, UplataUpdate
from sqlmodel import Session


def create_uplata(session: Session, uplata_data: UplataCreate) -> Uplata:
    # Provjera da li korisnik postoji
    korisnik = session.get(Korisnik, uplata_data.korisnik_id)
    if not korisnik:
        raise HTTPException(status_code=404, detail="Korisnik nije pronađen")

    # Provjera da li usluga postoji
    usluga = session.get(Usluga, uplata_data.usluga_id)
    if not usluga:
        raise HTTPException(status_code=404, detail="Usluga nije pronađena")

    # Računanje ukupnog iznosa
    ukupno = round(usluga.cijena * uplata_data.kolicina, 2)

    if not uplata_data.datum_uplate:
        uplata_data.datum_uplate = date.today()

    uplata = Uplata(
        datum_uplate=uplata_data.datum_uplate,
        korisnik_id=uplata_data.korisnik_id,
        usluga_id=uplata_data.usluga_id,
        kolicina=uplata_data.kolicina,
        ukupno=ukupno
    )

    return uplata_repository.create_uplata(session, uplata)


def get_uplate(session: Session, offset: int = 0, limit: int = 100) -> list[UplataInfo]:
    return uplata_repository.get_uplate(session, offset, limit)


def get_uplata(session: Session, uplata_id: int) -> Uplata:
    uplata = uplata_repository.get_uplata(session, uplata_id)

    if not uplata:
        raise HTTPException(status_code=404, detail="Uplata nije pronađena")
    
    return uplata


def update_uplata(session: Session, uplata_id: int, uplata_data: UplataUpdate) -> Uplata:
    db_uplata = uplata_repository.get_uplata(session, uplata_id)

    if not db_uplata:
        raise HTTPException(status_code=404, detail="Uplata nije pronađena")

    updates = uplata_data.dict(exclude_unset=True)

    # Ako se promijeni kolicina ili usluga_id, mora se ponovno izračunati ukupan_iznos
    if "kolicina" in updates or "usluga_id" in updates:
        usluga_id = updates.get("usluga_id", db_uplata.usluga_id)
        kolicina = updates.get("kolicina", db_uplata.kolicina)
        usluga = session.get(Usluga, usluga_id)
        if not usluga:
            raise HTTPException(status_code=404, detail="Usluga nije pronađena")

        updates["ukupno"] = usluga.cijena * kolicina

    return uplata_repository.update_uplata(session, db_uplata, updates)


def delete_uplata(session: Session, uplata_id: int) -> None:
    db_uplata = uplata_repository.get_uplata(session, uplata_id)

    if not db_uplata:
        raise HTTPException(status_code=404, detail="Uplata nije pronađena")

    uplata_repository.delete_uplata(session, db_uplata)
