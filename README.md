# testing

## Project Overview
`testing` is a backend application designed for an **AI Code Review Platform**, built with FastAPI and SQLAlchemy. It provides a RESTful API primarily for managing organizations. The application defines its database schema using SQLAlchemy models in `backend/models.py` and validates incoming request payloads with Pydantic schemas in `backend/schemas.py`.

The system includes models for various entities within a code review platform, such as `Organization`, `User`, `Repository`, `DocumentationRun`, `PullRequest`, `CodeReviewRun`, and `ReviewFinding`, indicating a comprehensive backend structure for managing code analysis and review processes.

## Features
This backend application exposes the following API endpoints:

*   **Health Check** (`GET /`)
    *   Returns a simple success message, confirming the backend is operational.
    *   Example response: `{"message": "Backend successfully running 🚀"}`

*   **Create Organization** (`POST /organizations`)
    *   Accepts an `OrganizationCreate` payload, creates a new organization record in the database, and returns the newly created object.

*   **List Organizations** (`GET /organizations`)
    *   Retrieves and returns a list of all organizations currently stored in the database.

## Tech Stack
*   **Python**: 3.10+
*   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
*   **SQLAlchemy**: A Python SQL toolkit and Object Relational Mapper (ORM) for database interactions, providing a full suite of well-known enterprise-level persistence patterns.
*   **Pydantic**: Data validation and settings management using Python type hints, used for request payload validation via `schemas.py`.
*   **SQL Database**: For persistent data storage, managed through SQLAlchemy (e.g., SQLite, PostgreSQL, MySQL).

## Setup
To get the `testing` backend running locally, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd testing
    ```

2.  **Create a virtual environment & install dependencies**
    It is recommended to use a virtual environment to manage project dependencies.
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows: venv\Scripts\activate
    pip install -r requirements.txt   # (Assuming a requirements.txt file exists)
    ```

3.  **Configure the database**
    Ensure your SQL database connection is configured. The application uses SQLAlchemy for database interactions. Depending on your setup, you might need to set environment variables or modify a configuration file for the database connection string.

## Usage
Once the setup is complete, you can start the FastAPI server using Uvicorn:

```bash
uvicorn backend.main:app --reload
```

The API will be available at `http://localhost:8000`.

### Available Endpoints

| Method | Endpoint          | Description                                 |
| :----- | :---------------- | :------------------------------------------ |
| `GET`  | `/`               | Health check – returns a welcome message.   |
| `POST` | `/organizations`  | Create a new organization.                  |
| `GET`  | `/organizations`  | Retrieve a list of all organizations.       |

### Example Request (`POST /organizations`)

To create a new organization, send a `POST` request to `/organizations` with a JSON body conforming to the `OrganizationCreate` schema:

```json
{
  "name": "Acme Corp",
  "slug": "acme-corp",
  "plan_type": "free"
}
```

### Example Response

A successful `POST /organizations` request will return the newly created organization object, including its generated ID and timestamps:

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