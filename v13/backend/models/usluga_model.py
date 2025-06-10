from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Usluga(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    naziv: str
    cijena: float
    opis: str

    uplate: List["Uplata"] = Relationship(back_populates="usluga")
