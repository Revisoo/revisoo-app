from datetime import datetime, timezone, timedelta


def make_note(username="testuser", syllabus_id="s1"):
    return {
        "username": username,
        "syllabus_id": syllabus_id,
        "topic": "Intro",
        "week_number": 1,
        "day_number": 1,
        "note_type": "daily",
        "content": "hello world this is a note",
        "valid_until": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
    }


def test_push_note_existing_user(client):
    client.post("/api/v1/users/claim", json={"username": "testuser"})
    response = client.post("/api/v1/notes", json=make_note())
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "testuser"
    assert data["word_count"] == 6


def test_push_note_unknown_user(client):
    response = client.post("/api/v1/notes", json=make_note(username="nobody"))
    assert response.status_code == 404


def test_list_notes(client):
    client.post("/api/v1/users/claim", json={"username": "lister"})
    client.post("/api/v1/notes", json=make_note(username="lister"))
    client.post("/api/v1/notes", json=make_note(username="lister", syllabus_id="s2"))
    response = client.get("/api/v1/notes/lister")
    assert response.status_code == 200
    assert len(response.json()) == 2
