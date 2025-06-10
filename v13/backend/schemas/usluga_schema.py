from typing import Optional

from pydantic import BaseModel, condecimal


class UslugaCreate(BaseModel):
    naziv: str
    cijena: condecimal(decimal_places=2)
    opis: str

class UslugaRead(BaseModel):
    id: int
    naziv: str
    cijena: condecimal(decimal_places=2)
    opis: str

    class Config:
        from_attributes = True  # ili orm_mode = True za starije verzije Pydantic

class UslugaUpdate(BaseModel):
    naziv: Optional[str] = None
    cijena: Optional[condecimal(decimal_places=2)] = None
    opis: Optional[str] = None
