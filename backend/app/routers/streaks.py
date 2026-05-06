from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.models.user import User
from app.models.note import Note
from app.models.streak import Streak
from app.schemas import RecordViewRequest, StreakResponse, LeaderboardEntry, LeaderboardResponse
from app.services import streak_service, score_service

router = APIRouter(tags=["streaks"])


@router.post("/streaks/record-view", response_model=StreakResponse)
def record_view(data: RecordViewRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    streak = streak_service.record_view(db, data.username)
    return streak


@router.get("/leaderboard", response_model=LeaderboardResponse)
def get_leaderboard(db: Session = Depends(get_db)):
    users = db.query(User).all()
    entries = []
    for user in users:
        total_words = db.query(func.sum(Note.word_count)).filter(Note.username == user.username).scalar() or 0
        syllo_score = score_service.compute_score(db, user.username, total_words)
        streak_obj = db.query(Streak).filter(Streak.username == user.username).first()
        current_streak = streak_obj.current_streak if streak_obj else 0
        entries.append(LeaderboardEntry(
            username=user.username,
            syllo_score=syllo_score,
            current_streak=current_streak,
        ))
    entries.sort(key=lambda e: e.syllo_score, reverse=True)
    return LeaderboardResponse(entries=entries[:50])
