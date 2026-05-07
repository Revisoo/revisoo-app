from datetime import date, timedelta
from sqlalchemy.orm import Session
from app.models.streak import Streak
from app.models.note import Note


def record_view(db: Session, username: str) -> Streak:
    has_notes = db.query(Note).filter(Note.username == username).first() is not None

    streak = db.query(Streak).filter(Streak.username == username).first()
    if not streak:
        streak = Streak(username=username, current_streak=0, longest_streak=0, freeze_count=0)
        db.add(streak)
        db.commit()
        db.refresh(streak)
        return streak

    if not has_notes:
        return streak

    today = date.today()
    yesterday = today - timedelta(days=1)

    if streak.last_view_date == today:
        return streak

    old_streak = streak.current_streak

    if streak.last_view_date == yesterday:
        streak.current_streak += 1
        if streak.current_streak > streak.longest_streak:
            streak.longest_streak = streak.current_streak
    else:
        if streak.freeze_count > 0:
            streak.freeze_count -= 1
        else:
            streak.current_streak = 1

    new_streak = streak.current_streak

    if old_streak < 7 <= new_streak:
        streak.freeze_count += 1
    if old_streak < 30 <= new_streak:
        streak.freeze_count += 2

    streak.last_view_date = today
    db.commit()
    db.refresh(streak)
    return streak
