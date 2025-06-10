from models.korisnik_model import Korisnik
from models.uplata_model import Uplata
from models.usluga_model import Usluga
from schemas.uplata_schema import UplataInfo
from sqlmodel import Session, select


def create_uplata(session: Session, uplata: Uplata) -> Uplata:
    session.add(uplata)
    session.commit()
    session.refresh(uplata)
    return uplata

def get_uplate(session: Session, offset: int = 0, limit: int = 100) -> list[UplataInfo]:
    query = (
        select(Uplata, Korisnik.ime, Korisnik.prezime, Usluga.naziv, Usluga.cijena)
        .join(Korisnik, Uplata.korisnik_id == Korisnik.id)
        .join(Usluga, Uplata.usluga_id == Usluga.id)
        .offset(offset)
        .limit(limit)
    )
    results = session.exec(query).all()

    uplate_info = []
    for uplata, ime_korisnika, prezime_korisnika, naziv_usluge, cijena in results:
        uplate_info.append(UplataInfo(
        id=uplata.id,
        korisnik_id=uplata.korisnik_id,
        usluga_id=uplata.usluga_id,
        datum_uplate=uplata.datum_uplate.isoformat(timespec="milliseconds"),
        ime_korisnika=f"{ime_korisnika} {prezime_korisnika}",
        naziv_usluge=naziv_usluge,
        kolicina=uplata.kolicina,
        ukupno=uplata.kolicina * cijena
    ))

    return uplate_info

def get_uplata(session: Session, uplata_id: int) -> Uplata | None:
    return session.get(Uplata, uplata_id)

def update_uplata(session: Session, db_uplata: Uplata, updates: dict) -> Uplata:
    for key, value in updates.items():
        setattr(db_uplata, key, value)

    session.add(db_uplata)
    session.commit()
    session.refresh(db_uplata)
    return db_uplata

def delete_uplata(session: Session, db_uplata: Uplata) -> None:
    session.delete(db_uplata)
    session.commit()
