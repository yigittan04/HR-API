import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    MIN_SALARY: int = 10000

    class Config:
        env_file = ".env"

settings = Settings()