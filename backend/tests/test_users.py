import pytest
from fastapi.testclient import TestClient


def test_claim_new_username(client):
    response = client.post("/api/v1/users/claim", json={"username": "testuser"})
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "testuser"
    assert "created_at" in data


def test_claim_duplicate_username(client):
    client.post("/api/v1/users/claim", json={"username": "duplicateuser"})
    response = client.post("/api/v1/users/claim", json={"username": "duplicateuser"})
    assert response.status_code == 409


def test_check_username_available(client):
    response = client.get("/api/v1/users/check/newuser")
    assert response.status_code == 200
    assert response.json()["available"] is True


def test_check_username_taken(client):
    client.post("/api/v1/users/claim", json={"username": "takenuser"})
    response = client.get("/api/v1/users/check/takenuser")
    assert response.status_code == 200
    assert response.json()["available"] is False
