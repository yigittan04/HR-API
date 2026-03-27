from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas
from app.dependencies import get_db, get_current_user
from app.services import employee_service

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("", response_model=schemas.EmployeeResponse, status_code=201)
def create(
    employee: schemas.EmployeeCreateUI,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return employee_service.create(db, employee)


@router.get("", response_model=list[schemas.EmployeeResponse])
def list_employees(
    min_salary: float | None = None,
    max_salary: float | None = None,
    department_id: int | None = None,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return employee_service.list_employees(
        db, skip, limit, min_salary, max_salary, department_id
    )


@router.get("/{employee_id}", response_model=schemas.EmployeeWithDepartmentInfo)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return employee_service.get(db, employee_id)


@router.put("/{employee_id}", response_model=schemas.EmployeeResponse)
def update(
    employee_id: int,
    employee: schemas.EmployeeCreateUI,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return employee_service.update(db, employee_id, employee)


@router.delete("/{employee_id}", status_code=204)
def delete(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    employee_service.delete(db, employee_id)