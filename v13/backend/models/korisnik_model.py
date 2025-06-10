from typing import Optional, List
from sqlmodel import Field, Relationship, SQLModel

class Korisnik(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ime: str
    prezime: str

    uplate: List["Uplata"] = Relationship(back_populates="korisnik")
