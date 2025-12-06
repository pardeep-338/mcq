# UPSC Quiz — Fullstack Starter
This package contains a full-stack UPSC-style MCQ web app:
- Frontend: React + Vite + Tailwind
- Backend: Node.js + Express + MongoDB (Mongoose)
- Features: Register / Login (JWT), Leaderboard, Quiz UI starter, sample dataset

## Quick start (backend)
1. cd backend
2. cp .env.example .env and set MONGO_URI and JWT_SECRET
3. npm install
4. npm run dev

## Quick start (frontend)
1. cd frontend
2. cp .env.example .env and set VITE_API_URL if needed
3. npm install
4. npm run dev

## Notes
- This is a starter; secure secrets before production.
- See /docker-compose.yml for a local Docker setup.
