class BaseRepository:
    def __init__(self, model):
        self.model = model

    def create(self, db, data):
        db_object = self.model(**data.dict())
        db.add(db_object)
        db.commit()
        db.refresh(db_object)
        return db_object

    def get(self, db, object_id):
        return db.query(self.model).filter(self.model.id == object_id).first()

    def list(self, db, skip=0, limit=10):
        return db.query(self.model).offset(skip).limit(limit).all()

    def update(self, db, db_object, data):
        for key, value in data.dict().items():
            setattr(db_object, key, value)
        db.commit()
        db.refresh(db_object)
        return db_object

    def delete(self, db, db_object):
        db.delete(db_object)
        db.commit()