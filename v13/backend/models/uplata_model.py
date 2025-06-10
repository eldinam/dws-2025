from datetime import datetime
from typing import Optional

from sqlmodel import Field, Relationship, SQLModel


class Uplata(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    datum_uplate: datetime
    korisnik_id: int = Field(foreign_key="korisnik.id")
    usluga_id: int = Field(foreign_key="usluga.id")
    kolicina: int
    ukupno: float

    korisnik: Optional["Korisnik"] = Relationship(back_populates="uplate")
    usluga: Optional["Usluga"] = Relationship(back_populates="uplate")
