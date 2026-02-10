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
