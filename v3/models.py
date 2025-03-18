from sqlmodel import Field, SQLModel


class Student(SQLModel, table=True):
  id : int | None = Field(default= None, primary_key=True)
  name: str = Field(index=True)
  age: int | None = Field(default = None, index=True)
  nickname: str