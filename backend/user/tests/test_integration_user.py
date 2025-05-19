# tests/test_integration_user.py

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import fastapi_app
from app.database import Base, get_db

# ----------------------
# in-memory SQLite
# ----------------------

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)

@pytest.fixture(scope="session", autouse=True)
def initialize_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture()
def db_session():
    conn = engine.connect()
    tx = conn.begin()
    session = TestingSessionLocal(bind=conn)
    try:
        yield session
    finally:
        session.close()
        tx.rollback()
        conn.close()

# ----------------------
# TestClient із override get_db
# ----------------------

@pytest.fixture()
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    fastapi_app.dependency_overrides[get_db] = override_get_db
    return TestClient(fastapi_app)

# ----------------------
# Integration tests
# ----------------------

def test_register_and_login_success_flow(client):
    r1 = client.post(
        "/users/register",
        json={"name": "Alice", "email": "alice@example.com", "password": "secret123"}
    )
    assert r1.status_code == 200
    data1 = r1.json()
    assert data1["email"] == "alice@example.com"
    assert "id" in data1 and "created_at" in data1

    r2 = client.post(
        "/users/login",
        auth=("alice@example.com", "secret123")
    )
    assert r2.status_code == 200
    data2 = r2.json()
    assert data2["message"] == "Login successful"
    assert data2["email"] == "alice@example.com"
    assert data2["user_id"] == data1["id"]

def test_register_conflict_returns_400(client):
    payload = {"name": "Bob", "email": "bob@example.com", "password": "pw"}
    client.post("/users/register", json=payload)

    r = client.post("/users/register", json=payload)
    assert r.status_code == 400
    assert r.json()["detail"] == "Email already registered"

def test_login_invalid_credentials_returns_401(client):
    r1 = client.post("/users/login", auth=("noone@example.com", "pw"))
    assert r1.status_code == 401

    client.post("/users/register",
                json={"name":"Carol","email":"carol@example.com","password":"correct"})
    r2 = client.post("/users/login",
                     auth=("carol@example.com", "wrongpw"))
    assert r2.status_code == 401
