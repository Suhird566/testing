from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, Organization
from schemas import OrganizationCreate


# ------------------------------------------------------------------
# Database initialization
# ------------------------------------------------------------------
Base.metadata.create_all(bind=engine)


# ------------------------------------------------------------------
# FastAPI app
# ------------------------------------------------------------------
app = FastAPI(
    title="AI Code Intelligence Platform",
    description="Backend APIs for organization and repository management",
    version="1.0.0",
)


# ------------------------------------------------------------------
# Database dependency
# ------------------------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ------------------------------------------------------------------
# Routes
# ------------------------------------------------------------------

@app.get("/", tags=["Health"])
def root():
    """
    Health check endpoint.
    """
    return {"message": "Backend successfully running 🚀"}


@app.post("/organizations", tags=["Organizations"])
def create_organization(
    payload: OrganizationCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new organization.
    """
    organization = Organization(**payload.dict())
    db.add(organization)
    db.commit()
    db.refresh(organization)
    return organization


@app.get("/organizations", tags=["Organizations"])
def list_organizations(db: Session = Depends(get_db)):
    """
    List all organizations.
    """
    return db.query(Organization).all()
