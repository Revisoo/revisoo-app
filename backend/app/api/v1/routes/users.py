from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.streak import Streak
from app.schemas import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/claim", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def claim_username(data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == data.username).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already taken")

    user = User(username=data.username)
    db.add(user)
    db.flush()

    streak = Streak(username=data.username, current_streak=0, longest_streak=0, freeze_count=0)
    db.add(streak)
    db.commit()
    db.refresh(user)

    return user


@router.get("/check/{username}")
def check_username(username: str, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == username).first()
    return {"available": existing is None}
