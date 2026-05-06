from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from app.models.note import NoteType


class UserCreate(BaseModel):
    username: str


class UserResponse(BaseModel):
    username: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class NoteCreate(BaseModel):
    username: str
    syllabus_id: str
    topic: str
    week_number: int
    day_number: Optional[int] = None
    note_type: NoteType
    content: str
    valid_until: datetime


class NoteResponse(BaseModel):
    id: str
    username: str
    syllabus_id: str
    topic: str
    week_number: int
    day_number: Optional[int] = None
    note_type: NoteType
    word_count: int
    content: str
    pushed_at: datetime
    valid_until: datetime

    model_config = ConfigDict(from_attributes=True)


class StreakResponse(BaseModel):
    username: str
    current_streak: int
    longest_streak: int
    freeze_count: int
    last_view_date: Optional[date] = None

    model_config = ConfigDict(from_attributes=True)


class LeaderboardEntry(BaseModel):
    username: str
    syllo_score: float
    current_streak: int

    model_config = ConfigDict(from_attributes=True)


class LeaderboardResponse(BaseModel):
    entries: List[LeaderboardEntry]


class RecordViewRequest(BaseModel):
    username: str
