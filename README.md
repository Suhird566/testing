# testing

## Project Overview
`testing` is a backend application designed for an **AI Code Review Platform**, built with FastAPI and SQLAlchemy. It provides a RESTful API primarily for managing organizations. The application defines its database schema using SQLAlchemy models in `backend/models.py` and validates incoming request payloads with Pydantic schemas in `backend/schemas.py`.

The system includes models for various entities within a code review platform, such as `Organizations`, `Users`, `Repositories`, `DocumentationRuns`, `PullRequests`, `CodeReviewRuns`, and `ReviewFindings`, indicating a comprehensive backend structure for managing code analysis and review processes.

## Features
-   **Health Check** – `GET /` returns a simple success message, confirming the backend is operational.
-   **Create Organization** – `POST /organizations` accepts an `OrganizationCreate` payload, creates a new organization record in the database, and returns the newly created object.
-   **List Organizations** – `GET /organizations` retrieves and returns a list of all organizations currently stored in the database.

## Tech Stack
-   **Python** – 3.10+
-   **FastAPI** – Modern, fast (high-performance) web framework for building APIs.
-   **SQLAlchemy** – Python SQL toolkit and Object Relational Mapper (ORM) for database interactions.
-   **Pydantic** – Data validation and settings management using Python type hints (used for request payload validation via `schemas.py`).
-   **SQL Database** (e.g., SQLite) – For persistent data storage, managed through SQLAlchemy.

## Setup
1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd testing
    ```

2.  **Create a virtual environment & install dependencies**
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows: venv\Scripts\activate
    pip install -r requirements.txt   # (Install dependencies from requirements.txt if available)
    ```

3.  **Configure the database**
    Ensure your SQL database connection is configured. The application uses SQLAlchemy for database interactions.

## Usage
Start the FastAPI server using Uvicorn:

```bash
uvicorn backend.main:app --reload
```

The API will be available at `http://localhost:8000`.

| Method | Endpoint          | Description                                 |
|--------|-------------------|---------------------------------------------|
| `GET`  | `/`               | Health check – returns a welcome message.   |
| `POST` | `/organizations`  | Create a new organization.                   |
| `GET`  | `/organizations`  | Retrieve a list of all organizations.       |

**Example Request** (`POST /organizations`)

```json
{
  "name": "Acme Corp",
  "slug": "acme-corp",
  "plan_type": "free"
}
```

**Example Response**

```json
{
  "id": "b1d5f6c3-d2e1-4a7b-8c9f-0a1b2c3d4e5f",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "plan_type": "free",
  "is_active": true,
  "created_at": "2023-10-27T10:00:00+00:00",
  "updated_at": "2023-10-27T10:00:00+00:00"
}
```

The API is automatically documented via FastAPI’s interactive docs, accessible at `http://localhost:8000/docs`.