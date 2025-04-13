import httpx
from fastapi import APIRouter

router = APIRouter()

USER_SERVICE_URL = "http://user-service:5000"
BOOK_SERVICE_URL = "http://book-service:6000"
READING_SERVICE_URL = "http://reading-service:7000"


async def forward_request(method: str, service_url: str, path: str, **kwargs):
    url = f"{service_url}{path}"
    async with httpx.AsyncClient() as client:
        response = await client.request(method, url, **kwargs)
        return response.json()


@router.post("/users/register")
async def register_user(data: dict):
    return await forward_request("POST", USER_SERVICE_URL, "/users/register", json=data)


@router.post("/users/login")
async def login_user(data: dict):
    return await forward_request("POST", USER_SERVICE_URL, "/users/login", json=data)


@router.post("/books")
async def add_book(data: dict):
    return await forward_request("POST", BOOK_SERVICE_URL, "/books", json=data)


@router.get("/books")
async def list_books():
    return await forward_request("GET", BOOK_SERVICE_URL, "/books")


@router.get("/books/{book_id}")
async def book_detail(book_id: str):
    return await forward_request("GET", BOOK_SERVICE_URL, f"/books/{book_id}")


@router.put("/books/{book_id}")
async def edit_book(book_id: str, data: dict):
    return await forward_request("PUT", BOOK_SERVICE_URL, f"/books/{book_id}", json=data)


@router.post("/reading-progress")
async def add_progress(data: dict):
    return await forward_request("POST", READING_SERVICE_URL, "/reading-progress", json=data)


@router.get("/reading-progress/{user_id}")
async def list_user_progress(user_id: str):
    return await forward_request("GET", READING_SERVICE_URL, f"/reading-progress/{user_id}")


@router.put("/reading-progress/{progress_id}")
async def edit_progress(progress_id: str, data: dict):
    return await forward_request("PUT", READING_SERVICE_URL, f"/reading-progress/{progress_id}", json=data)
