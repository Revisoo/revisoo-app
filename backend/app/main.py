from fastapi import FastAPI
from app.api.v1.routes import users
from app.routers import notes

app = FastAPI(title="Revisoo API")

app.include_router(users.router, prefix="/api/v1")
app.include_router(notes.router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "ok"}
