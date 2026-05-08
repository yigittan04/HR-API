from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.department_repository import department_repository
from app.models import Department

def create_department(db: Session, department):
    return department_repository.create(db, department)

def list_departments(db: Session, page: int, page_size: int):
    query = db.query(Department)

    total = query.count()

    offset = (page - 1) * page_size
    departments = query.offset(offset).limit(page_size).all()

    return {
        "data": departments,
        "total": total,
        "page": page,
        "pageSize": page_size
    }

def get_department(db: Session, department_id: int):
    dept = department_repository.get(db, department_id)
    if not dept:
        raise HTTPException(status_code=404, detail="Departman bulunamadı.")
    return dept

def update_department(db: Session, department_id: int, department_data):
    db_dept = department_repository.get(db, department_id)
    if not db_dept:
        raise HTTPException(status_code=404, detail="Departman bulunamadı.")
    return department_repository.update(db, db_dept, department_data)

def delete_department(db: Session, department_id: int):
    db_dept = department_repository.get(db, department_id)
    if not db_dept:
        raise HTTPException(status_code=404, detail="Departman bulunamadı.")
    department_repository.delete(db, db_dept)