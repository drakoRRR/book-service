import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router


def create_app():
    fast_api_app = FastAPI(
        docs_url="/api/docs/",
    )

    fast_api_app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return fast_api_app

app = create_app()

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)