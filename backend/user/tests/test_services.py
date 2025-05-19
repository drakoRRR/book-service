import bcrypt
import pytest

from sqlalchemy.orm import Session
from app.services import hash_password, create_user, get_user_by_email
from app.schemas import UserCreate
from app.models import User
from app.database import Base, engine, SessionLocal

# ----------------------
# Unit tests
# ----------------------

def test_hash_password():
    pw = "secret123"
    hashed = hash_password(pw)
    assert hashed != pw
    assert bcrypt.checkpw(pw.encode(), hashed.encode())

class DummySession:
    def __init__(self):
        self.added = []
        self.committed = False
        self.refreshed = []
    def add(self, obj):
        self.added.append(obj)
    def commit(self):
        self.committed = True
    def refresh(self, obj):
        self.refreshed.append(obj)

def test_create_user_monkeypatched(monkeypatch):
    dummy_sess = DummySession()
    fake_hashed = "hashed_pw"
    monkeypatch.setattr("app.services.hash_password", lambda pw: fake_hashed)

    user_in = UserCreate(name="Ivan", email="ivan@example.com", password="pw")
    new_user = create_user(dummy_sess, user_in)

    assert isinstance(new_user, User)
    assert new_user.name == "Ivan"
    assert new_user.email == "ivan@example.com"
    assert new_user.password == fake_hashed

    assert dummy_sess.added == [new_user]
    assert dummy_sess.committed is True
    assert dummy_sess.refreshed == [new_user]

def test_get_user_by_email_unit_no_user():
    class DummyQuery:
        def filter(self, *args, **kwargs): return self
        def first(self): return None
    class DummySessionQuery:
        def query(self, model): return DummyQuery()
    sess = DummySessionQuery()
    assert get_user_by_email(sess, "noone@example.com") is None


def test_get_user_by_email_unit_found():
    dummy_user = User(name="Test", email="test@example.com", password="h")
    class DummyQuery:
        def filter(self, *args, **kwargs): return self
        def first(self): return dummy_user
    class DummySessionQuery:
        def query(self, model): return DummyQuery()
    sess = DummySessionQuery()
    assert get_user_by_email(sess, "test@example.com") is dummy_user


def test_get_user_by_email_monkeypatched():
    dummy_user = User(name="Injected", email="inject@example.com", password="x")
    class TrackSession:
        def __init__(self):
            self.queried_model = None
            self.filtered = False
        def query(self, model):
            self.queried_model = model
            return self
        def filter(self, *args, **kwargs):
            self.filtered = True
            return self
        def first(self):
            return dummy_user

    sess = TrackSession()
    result = get_user_by_email(sess, "inject@example.com")
    assert result is dummy_user
    assert sess.queried_model is User
    assert sess.filtered is True

# ----------------------
# Integration test
# ----------------------

@pytest.fixture(scope="module")
def sqlite_session():
    Base.metadata.create_all(bind=engine)
    sess = SessionLocal()
    yield sess
    sess.close()
    Base.metadata.drop_all(bind=engine)

def test_get_user_by_email_integration(sqlite_session):
    assert get_user_by_email(sqlite_session, "noone@x") is None

    u = User(name="Test", email="test@x.com", password="h")
    sqlite_session.add(u)
    sqlite_session.commit()

    found = get_user_by_email(sqlite_session, "test@x.com")
    assert found is not None
    assert found.email == "test@x.com"

