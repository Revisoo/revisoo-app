from sqlalchemy.orm import Session
from app.models.note import Note
from app.schemas import NoteCreate


def create_note(db: Session, data: NoteCreate) -> Note:
    word_count = len(data.content.split())
    note = Note(
        username=data.username,
        syllabus_id=data.syllabus_id,
        topic=data.topic,
        week_number=data.week_number,
        day_number=data.day_number,
        note_type=data.note_type,
        content=data.content,
        word_count=word_count,
        valid_until=data.valid_until,
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return note
