# README

## Project Overview  
`testing` is a minimal **AI Code Review Platform** backend built with FastAPI and SQLAlchemy.  
It exposes a RESTful API to create and list organizations. The database schema is defined in `backend/models.py` and the request payloads are validated with Pydantic schemas in `backend/schemas.py`.

## Features  
- **Health Check** – `GET /` returns a simple success message.  
- **Create Organization** – `POST /organizations` accepts an `OrganizationCreate` payload, creates a new organization record, and returns the created object.  
- **List Organizations** – `GET /organizations` retrieves all organizations from the database.

## Tech Stack  
- **Python** – 3.10+  
- **FastAPI** – Web framework  
- **SQLAlchemy** – ORM for database interactions  
- **Pydantic** – Data validation (via `schemas.py`)  
- **SQLite** (default) – Persisted via SQLAlchemy `engine` in `backend/database.py`

## Setup  
1. **Clone the repository**  
   ```bash
   git clone <repository-url>
   cd testing
   ```

2. **Create a virtual environment & install dependencies**  
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   pip install -r requirements.txt   # (If a requirements file exists)
   ```

3. **Configure the database**  
   The database connection string is defined in `backend/database.py`.  
   *If you need to use a different database (PostgreSQL, MySQL, etc.), update the connection URL accordingly.*

4. **Run database migrations**  
   ```bash
   python backend/main.py   # The script creates tables automatically on startup
   ```

## Usage  
Start the FastAPI server:

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
  "description": "An example organization."
}
```

**Example Response**

```json
{
  "id": "b1d5f6c3-...-...",
  "name": "Acme Corp",
  "description": "An example organization."
}
```

The API is documented automatically via FastAPI’s interactive docs at `http://localhost:8000/docs`.

---