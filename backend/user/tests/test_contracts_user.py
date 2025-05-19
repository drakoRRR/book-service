import pytest
import requests
from pactman import Consumer, Provider, Like

PACT_HOST = 'localhost'
PACT_PORT = 1234
PACT_DIR = './pacts'
LOG_DIR = './logs'

@pytest.fixture(scope='module')
def pact():
    """
    Запускає mock-сервер Pactman перед тестами і зупиняє після.
    """
    pact = (
        Consumer('FrontendApp')
        .has_pact_with(
            Provider('UserService'),
            host_name=PACT_HOST,
            port=PACT_PORT,
            pact_dir=PACT_DIR,
            log_dir=LOG_DIR,
        )
    )
    pact.start_service()
    yield pact
    pact.stop_service()


def test_user_registration_contract(pact):
    request_body = {
        'name': 'Alice',
        'email': 'alice@example.com',
        'password': 'secret123'
    }
    response_body = {
        'id': Like('550e8400-e29b-41d4-a716-446655440000'),
        'name': Like('Alice'),
        'email': Like('alice@example.com'),
        'created_at': Like('2025-05-19T12:00:00Z')
    }

    (pact
     .given('email alice@example.com is not yet registered')
     .upon_receiving('a user registration request')
     .with_request(
         method='POST',
         path='/users/register',
         headers={'Content-Type': 'application/json'},
         body=request_body
     )
     .will_respond_with(
         status=200,
         headers={'Content-Type': 'application/json; charset=utf-8'},
         body=response_body
     )
    )

    with pact:
        resp = requests.post(
            f'http://{PACT_HOST}:{PACT_PORT}/users/register',
            json=request_body,
            headers={'Content-Type': 'application/json'}
        )
    assert resp.status_code == 200
    data = resp.json()
    assert data['email'] == request_body['email']


def test_user_login_contract(pact):
    expected_response = {
        'message': Like('Login successful'),
        'user_id': Like('550e8400-e29b-41d4-a716-446655440000'),
        'email': Like('alice@example.com')
    }

    (pact
     .given('user alice@example.com exists with matching password')
     .upon_receiving('a user login request')
     .with_request(
         method='POST',
         path='/users/login',
         headers={'Authorization': Like('Basic ...')}
     )
     .will_respond_with(
         status=200,
         headers={'Content-Type': 'application/json; charset=utf-8'},
         body=expected_response
     )
    )

    with pact:
        resp = requests.post(
            f'http://{PACT_HOST}:{PACT_PORT}/users/login',
            auth=('alice@example.com', 'secret123')
        )
    assert resp.status_code == 200
    data = resp.json()
    assert data['message'] == 'Login successful'
    assert data['email'] == 'alice@example.com'
