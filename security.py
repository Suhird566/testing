from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt, JWTError
from app.config import JWT_SECRET, JWT_ALGORITHM

security = HTTPBearer()

def verify_jwt(token=Depends(security)):
    try:
        payload = jwt.decode(
            token.credentials,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM]
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
