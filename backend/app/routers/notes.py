from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.note import Note
from app.schemas import NoteCreate, NoteResponse
from app.services import note_service

router = APIRouter(prefix="/notes", tags=["notes"])


@router.post("", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def push_note(data: NoteCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    note = note_service.create_note(db, data)
    return note


@router.get("/{username}", response_model=List[NoteResponse])
def list_notes(username: str, db: Session = Depends(get_db)):
    notes = (
        db.query(Note)
        .filter(Note.username == username)
        .order_by(Note.pushed_at.desc())
        .all()
    )
    return notes
