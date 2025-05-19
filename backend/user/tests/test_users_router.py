import bcrypt
import pytest
from fastapi import HTTPException, status
from fastapi.security import HTTPBasicCredentials

import app.routers.users as users_mod
from app.schemas import UserCreate

def test_register_user_conflict(monkeypatch):
    monkeypatch.setattr(users_mod, "get_user_by_email", lambda db, email: object())
    with pytest.raises(HTTPException) as exc:
        users_mod.register_user(
            UserCreate(name="A", email="a@example.com", password="x"),
            db=None
        )
    assert exc.value.status_code == 400
    assert "Email already registered" in str(exc.value.detail)

def test_register_user_success(monkeypatch):
    dummy = object()
    monkeypatch.setattr(users_mod, "get_user_by_email", lambda db, email: None)
    monkeypatch.setattr(users_mod, "create_user", lambda db, user: dummy)

    out = users_mod.register_user(
        UserCreate(name="B", email="b@example.com", password="y"),
        db=None
    )
    assert out is dummy

def test_login_user_fail_no_user(monkeypatch):
    monkeypatch.setattr(users_mod, "get_user_by_email", lambda db, u: None)
    creds = HTTPBasicCredentials(username="x", password="y")
    with pytest.raises(HTTPException) as exc:
        users_mod.login_user(credentials=creds, db=None)
    assert exc.value.status_code == status.HTTP_401_UNAUTHORIZED

def test_login_user_fail_bad_pw(monkeypatch):
    class FakeUser:
        password = bcrypt.hashpw(b"right", bcrypt.gensalt()).decode()
    monkeypatch.setattr(users_mod, "get_user_by_email", lambda db, u: FakeUser())
    monkeypatch.setattr(bcrypt, "checkpw", lambda a, b: False)

    creds = HTTPBasicCredentials(username="x", password="wrong")
    with pytest.raises(HTTPException) as exc:
        users_mod.login_user(credentials=creds, db=None)
    assert exc.value.status_code == status.HTTP_401_UNAUTHORIZED

def test_login_user_success(monkeypatch):
    class FakeUser:
        id = "id123"
        email = "me@example.com"
        password = bcrypt.hashpw(b"pw", bcrypt.gensalt()).decode()
    fake_user = FakeUser()

    monkeypatch.setattr(users_mod, "get_user_by_email", lambda db, u: fake_user)
    monkeypatch.setattr(bcrypt, "checkpw", lambda a, b: True)

    creds = HTTPBasicCredentials(username="me@example.com", password="pw")
    resp = users_mod.login_user(credentials=creds, db=None)
    assert resp["message"] == "Login successful"
    assert resp["user_id"] == "id123"
    assert resp["email"] == "me@example.com"
