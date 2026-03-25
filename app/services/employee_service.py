from sqlalchemy.orm import Session
from app.models import Employee, Department
from app.repositories.employee_repository import employee_repository

def list_employees(db: Session, skip=0, limit=10, min_salary=None, max_salary=None, department_id=None):
    query = db.query(Employee)
    if min_salary is not None:
        query = query.filter(Employee.salary >= min_salary)
    if max_salary is not None:
        query = query.filter(Employee.salary <= max_salary)
    if department_id is not None:
        query = query.filter(Employee.department_id == department_id)
    return query.offset(skip).limit(limit).all()

def get_employee_by_email(db: Session, email: str):
    return db.query(Employee).filter(Employee.email == email).first()

def create(db: Session, employee_data):
    dept = db.query(Department).filter(Department.id == employee_data.department_id).first()
    if not dept:
        raise ValueError("Invalid department ID")
    db_employee = Employee(
        first_name=employee_data.first_name,
        last_name=employee_data.last_name,
        email=employee_data.email,
        salary=employee_data.salary,
        start_date=employee_data.start_date,
        department_id=employee_data.department_id
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def get_by_id(db: Session, employee_id: int):
    return employee_repository.get(db, employee_id)

def update(db: Session, employee_id: int, employee_data):
    db_employee = employee_repository.get(db, employee_id)
    if hasattr(employee_data, "department_id"):
        dept = db.query(Department).filter(Department.id == employee_data.department_id).first()
        if not dept:
            raise ValueError("Invalid department ID")
    return employee_repository.update(db, db_employee, employee_data)

def delete(db: Session, employee_id: int):
    db_employee = employee_repository.get(db, employee_id)
    employee_repository.delete(db, db_employee)