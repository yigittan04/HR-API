import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MIN_SALARY: int = 10000
    DATABASE_URL: str

    class Config:
        env_file = ".env"

settings = Settings()
