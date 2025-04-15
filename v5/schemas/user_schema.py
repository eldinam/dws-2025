from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
  username: str
  email: EmailStr

class UserRead(BaseModel):
  id: int
  username: str
  email: EmailStr

  class Config:
    from_attributes = True

class UserUpdate(BaseModel):
  username: str | None = None
  email: EmailStr | None = None
  