from fastapi import APIRouter, Depends
from app.security import verify_jwt
from app.api.orgs import _get_db_user

router = APIRouter(prefix="/me", tags=["Me"])       # tags are for swagger grouping
@router.get("/")        # becomes /me/ endpoint , answers "who am i-- user"
def get_me(user=Depends(verify_jwt)):
    user_id = user.get("user_id")
    db_user = _get_db_user(user_id)
    org_id = db_user.get("organization_id")
    return {
        "user_id": str(db_user["_id"]),
        "github_id": db_user.get("github_id"),
        "username": db_user.get("username"),
        "role": db_user.get("role", "pending"),
        "organization_id": str(org_id) if org_id else None,
        "has_org": bool(org_id),
    }
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
    return {"message": "Backend running successfully🚀"}

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




