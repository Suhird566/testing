from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models
import schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Code Intelligence Platform")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- ROUTES ----------------

@app.get("/")
def root():
    return {"message": "Backend successfully running🚀"}

@app.post("/organizations")
def create_organization(data: schemas.OrganizationCreate, db: Session = Depends(get_db)):
    org = models.Organization(**data.dict())
    db.add(org)
    db.commit()
    db.refresh(org)
    return org

@app.get("/organizations")
def list_organizations(db: Session = Depends(get_db)):
    return db.query(models.Organization).all()




