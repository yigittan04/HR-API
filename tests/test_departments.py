from app.repositories.department_repository import department_repository
from app.schemas import DepartmentCreate

def test_create_department(db, test_department):
    db_department = department_repository.get(db, test_department.id)
    assert db_department.name == "Department of Test"
    assert db_department.location == "City of Test"

def test_update_department(db, test_department):
    updated_data = DepartmentCreate(name="Department of Test Updated", location="City of Test Updated")
    department_repository.update(db, test_department, updated_data)

    db_department = department_repository.get(db, test_department.id)
    assert db_department.name == "Department of Test Updated"
    assert db_department.location == "City of Test Updated"