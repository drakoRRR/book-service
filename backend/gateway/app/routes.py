import base64
from json import JSONDecodeError

import httpx
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from .schemas import *

router = APIRouter()
security = HTTPBasic()

USER_SERVICE_URL = "http://user-service:5000"
BOOK_SERVICE_URL = "http://book-service:6000"
READING_SERVICE_URL = "http://reading-service:7000"


async def forward_request(method: str, service_url: str, path: str, **kwargs):
    url = f"{service_url.rstrip('/')}/{path.lstrip('/')}"
    async with httpx.AsyncClient() as client:
        response = await client.request(method, url, **kwargs)

    if not response.is_success:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Error from book service. Status: {response.status_code}, text: {response.text}"
        )

    try:
        return response.json()
    except JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to decode JSON. Got: {response.text}"
        )


@router.post("/users/register")
async def register_user(data: UserCreate):
    return await forward_request("POST", USER_SERVICE_URL, "/users/register", json=data.dict())


@router.post("/users/login")
async def login_user(credentials: HTTPBasicCredentials = Depends(security)):
    basic_token = base64.b64encode(f"{credentials.username}:{credentials.password}".encode("utf-8")).decode("utf-8")
    headers = {"Authorization": f"Basic {basic_token}"}
    return await forward_request("POST", USER_SERVICE_URL, "/users/login", headers=headers)


@router.post("/books")
async def add_book(data: BookCreate):
    return await forward_request("POST", BOOK_SERVICE_URL, "/books/", json=data.dict())


@router.get("/books")
async def list_books():
    return await forward_request("GET", BOOK_SERVICE_URL, "/books/")


@router.get("/books/{book_id}")
async def book_detail(book_id: str):
    return await forward_request("GET", BOOK_SERVICE_URL, f"/books/{book_id}")


@router.put("/books/{book_id}")
async def edit_book(book_id: str, data: BookUpdate):
    return await forward_request("PUT", BOOK_SERVICE_URL, f"/books/{book_id}", json=data.dict())


@router.post("/reading-progress")
async def add_progress(data: ReadingProgressCreate):
    return await forward_request("POST", READING_SERVICE_URL, "/reading-progress/", json=data.dict())


@router.get("/reading-progress/{user_id}")
async def list_user_progress(user_id: str):
    return await forward_request("GET", READING_SERVICE_URL, f"/reading-progress/{user_id}")


@router.put("/reading-progress/{progress_id}")
async def edit_progress(progress_id: str, data: ReadingProgressUpdate):
    return await forward_request("PUT", READING_SERVICE_URL, f"/reading-progress/{progress_id}", json=data.dict())

