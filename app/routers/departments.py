from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas
from app.dependencies import get_db, get_current_user
from app.services import department_service
from app.models import User
from app.dependencies import require_admin

router = APIRouter(prefix="/departments", tags=["Departments"])


@router.post("", response_model=schemas.DepartmentResponse, status_code=201)
def create_department(
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    return department_service.create_department(db, department)


@router.get("", response_model=schemas.DepartmentListResponse)
def list_departments(
    page: int = 1,
    pageSize: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return department_service.list_departments(
        db=db,
        page=page,
        page_size=pageSize
    )


@router.get("/{department_id}", response_model=schemas.DepartmentWithEmployeeInfo)
def get_department(
    department_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return department_service.get_department(db, department_id)


@router.put("/{department_id}", response_model=schemas.DepartmentResponse)
def update_department(
    department_id: int,
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    return department_service.update_department(db, department_id, department)


@router.delete("/{department_id}", status_code=204)
def delete_department(
    department_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    department_service.delete_department(db, department_id)