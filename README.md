# Task Tracker

Full-stack task management application.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4
- **Backend:** Node.js, Express 5, TypeScript, Mongoose, Zod, neverthrow
- **Database:** MongoDB 7
- **Package Manager:** Bun

## Architecture

### Backend

Layered architecture following a strict data flow:

```
Client -> Router -> Handler -> Service -> Repository -> Database
```

- **Router** maps HTTP endpoints to handlers and attaches validation middleware
- **Handler** extracts request data, calls the service layer, formats the HTTP response
- **Service** contains business logic, orchestrates repository calls
- **Repository** abstracts database access with Mongoose
- All layers communicate via `neverthrow` `Result` types — no try-catch blocks

### Frontend

- **React 19** with TypeScript
- **@tanstack/react-query** for server state (queries, mutations, cache invalidation)
- **Zustand** for client-only UI state (filters, notifications, modal state)
- Reusable UI primitives under `components/ui/`
- Feature components under `components/task/`

## Project Structure

```
task-tracker/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── src/
│       ├── index.ts              # Express app entry
│       ├── config/               # env, db, logger
│       ├── errors/               # AppError classes
│       ├── models/               # Mongoose schemas
│       ├── repositories/         # Data access (interface + class)
│       ├── services/             # Business logic (interface + class)
│       ├── handlers/             # HTTP request handlers (class)
│       ├── routes/               # Express router definitions
│       ├── schemas/              # Zod validation schemas
│       ├── middleware/            # validate, error-handler, request-id, request-logger
│       └── types/                # Shared types
└── frontend/
    ├── Dockerfile
    └── src/
        ├── main.tsx / App.tsx
        ├── config/               # API base URL
        ├── types/                # Task types
        ├── lib/                  # Typed API client
        ├── store/                # Zustand UI store
        ├── hooks/                # React-query hooks
        ├── components/
        │   ├── ui/               # Button, Input, Select, Modal, Badge, Toast
        │   ├── task/             # TaskCard, TaskList, TaskForm, TaskFilter
        │   └── layout/           # Header, Container
        └── pages/                # Home
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List all tasks (supports `?status=`, `?priority=`, `?search=`) |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Error responses follow `{ error: { code, message, details? } }`.

## Getting Started

### Prerequisites

- Node.js 22+
- Bun
- MongoDB (local or remote)

### Local Development

```bash
# Backend
cd backend
cp .env.example .env
bun install
bun run dev

# Frontend
cd frontend
bun install
bun run dev
```

The frontend runs on port 5173, the backend on port 3000.

### Docker

```bash
docker compose up --build
```

Starts MongoDB 7, the backend on port 3000, and the frontend on port 5173.

### Testing

```bash
cd backend
bun test          # vitest
bun test:coverage # with coverage report
```

## Deployment

The project is containerized. Each service has its own Dockerfile for independent deployment:

- **Backend:** Deploy to Fly.io, Railway, Koyeb, or any container platform
- **Frontend:** Deploy to Vercel, Netlify, or serve from the Docker image
- **Database:** MongoDB Atlas offers a free 512MB tier
