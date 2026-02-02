# README

## Introduction

`testing` is a lightweight **FastAPI** back‑end that serves as a minimal AI Code Review Platform.  
The service exposes a small set of HTTP endpoints that allow you to create and list organizations in a relational database. The code uses **SQLAlchemy** for persistence and relies on a separate `database.py` module for the engine and session configuration.

Key components:

- **FastAPI** application defined in `backend/main.py`.
- **SQLAlchemy** models in `backend/models.py`.
- Pydantic schema definitions in `backend/schemas.py`.
- Database session handling in `database.py`.

> The application is intentionally small to illustrate how the routing, database, and schema layers interact.

---

## Usage

> **Prerequisites**  
> - Python 3.10+  
> - A compatible SQL database (PostgreSQL, MySQL, SQLite, etc.). The connection details are expected to be configured in `database.py`.

### 1. Install dependencies

```bash
# Create a virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install the required packages
pip install fastapi uvicorn sqlalchemy pydantic
```

> **Note:**  
> The repository does not ship a `requirements.txt`. If you prefer one, create it with the packages above.

### 2. Configure the database

Open `database.py` and set the database URL and create the SQLAlchemy `engine` and `SessionLocal`.  
Example (SQLite in‑memory):

```python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

> Adjust `DATABASE_URL` to match your database provider.  

### 3. Run the server

```bash
# Launch the application using Uvicorn
uvicorn backend.main:app --reload
```

The server will start on `http://127.0.0.1:8000`.  
You can visit the automatically generated Swagger UI at `http://127.0.0.1:8000/docs` to interact with the endpoints.

### 4. Test the endpoints

| Method | Path            | Description                                   |
|--------|-----------------|-----------------------------------------------|
| `GET`  | `/`             | Health check – confirms the server is running |
| `POST` | `/organizations`| Create a new organization                      |
| `GET`  | `/organizations`| List all organizations                         |

**Example: Create an organization**

```bash
curl -X POST "http://127.0.0.1:8000/organizations" \
     -H "Content-Type: application/json" \
     -d '{"name": "Acme Corp", "email": "contact@acme.com"}'
```

**Example: List organizations**

```bash
curl -X GET "http://127.0.0.1:8000/organizations"
```

---

## Features

| Feature                      | Detail                                                                 |
|------------------------------|------------------------------------------------------------------------|
| **Root endpoint** (`/`)      | Returns a simple JSON message confirming the backend is active.         |
| **Create organization** (`POST /organizations`) | Accepts a JSON payload defined by `OrganizationCreate` schema, inserts a new record into the database, and returns the created object. |
| **List organizations** (`GET /organizations`) | Queries the database for all `Organization` records and returns them as a JSON array. |
| **Dependency Injection**    | Uses FastAPI’s `Depends` to inject a SQLAlchemy `Session` into each route. |
| **Automatic migrations**    | `models.Base.metadata.create_all(bind=engine)` ensures the database schema is created on startup. |

> All business logic is contained within the route handlers in `backend/main.py`; the models are defined in `backend/models.py` and the request validation schema in `backend/schemas.py`.

---

## Configuration

The project relies on two configuration points:

1. **Database Connection** – Defined in `database.py`.  
   - `DATABASE_URL`: URL string for the target database.  
   - `engine`: SQLAlchemy engine instance.  
   - `SessionLocal`: Session factory for dependency injection.  
   - `Base`: Base class for model declarations.

2. **FastAPI Application** – Instantiated in `backend/main.py` with the title `"AI Code Review Platform"`.  
   - The app is exposed as `app`, making it compatible with ASGI servers such as Uvicorn or Hypercorn.

> No additional configuration files are required at this time. If environment variables are preferred, modify `database.py` accordingly to read from `os.getenv()`.

---

*End of README*