from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.note import Note
from app.models.streak import Streak


def compute_score(db: Session, username: str, word_count: int) -> float:
    topics_completed = db.query(func.count(func.distinct(Note.syllabus_id))).filter(
        Note.username == username
    ).scalar() or 0

    streak_obj = db.query(Streak).filter(Streak.username == username).first()
    streak = streak_obj.current_streak if streak_obj else 0

    return streak * topics_completed * (word_count / 500)
