from datetime import datetime
from typing import Optional

from pydantic import BaseModel, condecimal


class UplataCreate(BaseModel):
    datum_uplate: datetime
    korisnik_id: int
    usluga_id: int
    kolicina: int

class UplataRead(BaseModel):
    id: int
    datum_uplate: datetime
    korisnik_id: int
    usluga_id: int
    kolicina: int
    ukupno: condecimal(decimal_places=2)

    class Config:
        from_attributes = True

class UplataUpdate(BaseModel):
    datum_uplate: Optional[datetime] = None
    korisnik_id: Optional[int] = None
    usluga_id: Optional[int] = None
    kolicina: Optional[int] = None


class UplataInfo(BaseModel):
    id: int
    korisnik_id: int
    usluga_id: int
    datum_uplate: str
    ime_korisnika: str
    naziv_usluge: str
    kolicina: int
    ukupno: float