import pytest
from app.database import SessionLocal
from app.models import Department, Employee

@pytest.fixture(scope="function")
def db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture(scope="function")
def test_department(db):
    department = Department(name="Department of Test", location="City of Test")
    db.add(department)
    db.commit()
    db.refresh(department)
    try:
        yield department
    finally:
        db.delete(department)
        db.commit()