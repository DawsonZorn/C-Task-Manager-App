# TaskManager

A full-stack task manager: an ASP.NET Core Web API backed by SQLite, and a React + TypeScript frontend built with Vite.

## Tech Stack

| Layer    | Technology                                              |
| -------- | ------------------------------------------------------- |
| Backend  | .NET 9, ASP.NET Core Web API, Entity Framework Core 9   |
| Database | SQLite                                                  |
| API docs | OpenAPI + Swagger UI (Development only)                 |
| Frontend | React 19, TypeScript, Vite                              |

## Project Structure

```
TaskManager/
├── backend/
│   └── TaskManager.Api/
│       ├── Controllers/TasksController.cs   # CRUD endpoints for /api/tasks
│       ├── Data/AppDbContext.cs             # EF Core DbContext
│       ├── Models/TaskItem.cs               # Task entity
│       ├── Migrations/                      # EF Core migrations
│       ├── Program.cs                       # Service registration, CORS, middleware
│       └── appsettings.json                 # SQLite connection string
└── frontend/
    └── taskmanager-client/
        └── src/
            ├── App.tsx                      # Fetches and lists tasks
            └── types/Tasks.ts               # Task TypeScript interface
```

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) 20+ and npm
- (Optional) EF Core CLI for running migrations: `dotnet tool install --global dotnet-ef`

## Getting Started

### 1. Run the backend

```bash
cd backend/TaskManager.Api
dotnet restore
dotnet ef database update   # creates/updates tasks.db (optional if tasks.db already exists)
dotnet run --launch-profile http
```

The API runs at **http://localhost:5292**. In Development, Swagger UI is available at http://localhost:5292/swagger.

### 2. Run the frontend

In a second terminal:

```bash
cd frontend/taskmanager-client
npm install
npm run dev
```

The app runs at **http://localhost:5173** and fetches tasks from the backend. The backend's CORS policy only allows this origin, so keep the default Vite port.

## API Reference

Base URL: `http://localhost:5292/api/tasks`

| Method | Route             | Description        | Success response  |
| ------ | ----------------- | ------------------ | ----------------- |
| GET    | `/api/tasks`      | List all tasks     | `200 OK`          |
| GET    | `/api/tasks/{id}` | Get a task by ID   | `200 OK` / `404`  |
| POST   | `/api/tasks`      | Create a task      | `201 Created`     |
| PUT    | `/api/tasks/{id}` | Update a task      | `204 No Content` / `400` if IDs differ |
| DELETE | `/api/tasks/{id}` | Delete a task      | `204 No Content` / `404` |

### Task model

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "isCompleted": false,
  "createdAt": "2026-09-24T15:38:30Z",
  "dueDate": "2026-09-30T00:00:00Z"
}
```

| Field         | Type      | Notes                                  |
| ------------- | --------- | -------------------------------------- |
| `id`          | int       | Assigned by the database               |
| `title`       | string    | Required                               |
| `description` | string?   | Optional                               |
| `isCompleted` | bool      | Defaults to `false`                    |
| `createdAt`   | DateTime  | Defaults to the current UTC time       |
| `dueDate`     | DateTime? | Optional                               |

### Example requests

```bash
# Create a task
curl -X POST http://localhost:5292/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'

# Mark it complete (the id in the body must match the URL)
curl -X PUT http://localhost:5292/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "title": "Buy groceries", "isCompleted": true}'

# Delete it
curl -X DELETE http://localhost:5292/api/tasks/1
```

You can also send requests from [TaskManager.Api.http](backend/TaskManager.Api/TaskManager.Api.http) in VS Code (REST Client) or Visual Studio.

## Database

The SQLite database file is `backend/TaskManager.Api/tasks.db`, configured via `ConnectionStrings:DefaultConnection` in [appsettings.json](backend/TaskManager.Api/appsettings.json).

After changing a model, add and apply a migration:

```bash
cd backend/TaskManager.Api
dotnet ef migrations add <MigrationName>
dotnet ef database update
```

## Frontend Scripts

Run from `frontend/taskmanager-client`:

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Run ESLint                           |
