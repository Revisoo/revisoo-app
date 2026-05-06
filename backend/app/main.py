from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import users
from app.routers import notes, streaks

app = FastAPI(title="Revisoo API")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.include_router(users.router, prefix="/api/v1")
app.include_router(notes.router, prefix="/api/v1")
app.include_router(streaks.router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "ok"}
