from datetime import datetime, timezone, timedelta
from unittest.mock import patch


def test_record_view_increments_streak(client):
    client.post("/api/v1/users/claim", json={"username": "streakuser"})
    response = client.post("/api/v1/streaks/record-view", json={"username": "streakuser"})
    assert response.status_code == 200
    data = response.json()
    assert data["current_streak"] >= 1


def test_record_view_idempotent_same_day(client):
    client.post("/api/v1/users/claim", json={"username": "idempuser"})
    r1 = client.post("/api/v1/streaks/record-view", json={"username": "idempuser"})
    r2 = client.post("/api/v1/streaks/record-view", json={"username": "idempuser"})
    assert r1.json()["current_streak"] == r2.json()["current_streak"]


def test_leaderboard_ordering(client):
    client.post("/api/v1/users/claim", json={"username": "userA"})
    client.post("/api/v1/users/claim", json={"username": "userB"})
    response = client.get("/api/v1/leaderboard")
    assert response.status_code == 200
    entries = response.json()["entries"]
    scores = [e["syllo_score"] for e in entries]
    assert scores == sorted(scores, reverse=True)
