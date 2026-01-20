from pydantic import BaseModel

class OrganizationCreate(BaseModel):
    name: str
    slug: str
    plan_type: str
