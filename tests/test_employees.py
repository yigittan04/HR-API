from app.repositories.employee_repository import employee_repository
from app.models import Employee
from app.schemas import EmployeeCreate

def test_create_employee(db, test_department):
    employee_data = EmployeeCreate(
        first_name="Name",
        last_name="Surname",
        email="mail@example.com",
        salary=50000,
        start_date="2026-03-13",
        department_id=test_department.id
    )
    employee = employee_repository.create(db, employee_data)
    assert employee.email == "mail@example.com"

def test_update_employee(db, test_department):
    employee = db.query(Employee).filter(Employee.email == "mail@example.com").first()

    updated_data = EmployeeCreate(
        first_name="Updated_name",
        last_name="Updated_surname",
        email="updated_mail@example.com",
        salary=60000,
        start_date="2026-03-14",
        department_id=test_department.id
    )
    employee_repository.update(db, employee, updated_data)

    updated_employee = employee_repository.get(db, employee.id)
    assert updated_employee.email == "updated_mail@example.com"

def test_delete_employee(db, test_department):
    employee = db.query(Employee).filter(Employee.email == "updated_mail@example.com").first()
    employee_repository.delete(db, employee)

    deleted = employee_repository.get(db, employee.id)
    assert deleted is None