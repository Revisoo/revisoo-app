# Syllo App

FastAPI backend + Next.js frontend for the Syllo study note platform.

## Setup

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in DATABASE_URL
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Docs
- Design spec: `docs/superpowers/specs/2026-05-06-syllo-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-06-syllo-app.md`
