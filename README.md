# testing
A foundational backend application for an AI Code Review Platform, providing core data models and authentication.
---

## Codebase Tour (Start Here)

To quickly get oriented with the `testing` repository, we recommend starting with these files:

1.  **`backend/main.py`**
    Reading this file teaches you about the application's primary entry point and how API endpoints are defined, including authentication dependencies.
2.  **`backend/models.py`**
    This file is crucial for understanding the entire data schema of the application, defining all the core entities and their relationships.
3.  **`backend/schemas.py`**
    Reading this file will show you how data validation and serialization are handled for incoming requests and outgoing responses using Pydantic.
4.  **`security.py`**
    This file explains the authentication mechanism, specifically how JSON Web Tokens (JWTs) are verified for secure access to endpoints.

## Architecture & Data Flow

The `testing` application serves as a backend for an AI Code Review Platform. Its primary entry point is `backend/main.py`, which defines API endpoints. Authentication for these endpoints is handled by the `verify_jwt` function in `security.py`, which validates incoming JWTs. Data structures and the database schema are comprehensively defined in `backend/models.py` using SQLAlchemy ORM, while `backend/schemas.py` provides Pydantic models for data validation and serialization, ensuring data integrity for operations like creating new organizations.

Main execution path for an authenticated request:
`backend/main.py` (API endpoint, e.g., `get_me`) → `security.py::verify_jwt` (authentication) → `backend/models.py` (data interaction)

## Key Entry Points

The primary entry point for the `testing` application is:

*   **`backend/main.py`**: This file serves as the main application entry point, where API routes are defined. For example, the `get_me` function handles requests to retrieve details about the authenticated user.

## Folder / File Walkthrough

### `backend/main.py`
**Owns:** Core API endpoints and application logic, including user information retrieval.
**Key symbols:** `get_me`

### `backend/models.py`
**Owns:** Defines the database schema and SQLAlchemy ORM models for all core entities within the platform.
**Key symbols:** `Organization`, `User`, `Repository`, `DocumentationRun`, `PullRequest`, `CodeReviewRun`, `ReviewFinding`
**Gotcha:** Uses `uuid.uuid4` for default primary keys and `func.now()` for default timestamp values, indicating reliance on specific database functions for these operations.

### `backend/schemas.py`
**Owns:** Pydantic schemas for data validation and serialization of API request and response bodies.
**Key symbols:** `OrganizationCreate`

### `security.py`
**Owns:** Authentication logic, specifically the verification of JSON Web Tokens (JWTs).
**Key symbols:** `verify_jwt`
**Gotcha:** Relies on `JWT_SECRET` and `JWT_ALGORITHM` which are expected to be available in the environment or configuration for JWT decoding.

## How to Extend / Modify Safely

**Adding new endpoints**
To add a new API endpoint, you would typically define a new function within `backend/main.py`. This function would likely accept parameters, potentially use `Depends` for authentication (e.g., `verify_jwt` from `security.py`) or other dependencies, and interact with data models defined in `backend/models.py` or validate input using schemas from `backend/schemas.py`.

**Adding new data models**
To introduce a new database entity, create a new class in `backend/models.py`. This class should inherit from `Base` (as seen with `Organization`, `User`, etc.) and define its columns using SQLAlchemy's `Column` type, including primary keys, foreign keys, and data types (e.g., `UUID`, `String`, `Boolean`, `TIMESTAMP`).

**Adding new data validation schemas**
For new data structures that need validation (e.g., for API request bodies), create a new class in `backend/schemas.py`. This class should inherit from `BaseModel` (as seen with `OrganizationCreate`) and define its fields with Python type hints, which Pydantic uses for validation.

**Common pitfalls**
*   **Missing Authentication Dependency**: When creating new API endpoints in `backend/main.py`, remember to include `user=Depends(verify_jwt)` if the endpoint requires authentication. Forgetting this will expose the endpoint without JWT validation.
*   **Schema-Model Mismatch**: If you modify a data model in `backend/models.py` (e.g., adding a new required field), ensure that any corresponding Pydantic schemas in `backend/schemas.py` (like `OrganizationCreate`) are updated to reflect these changes.
*   **Database Migrations**: Changes to SQLAlchemy models in `backend/models.py` typically require database migrations to apply schema changes to your database. The evidence does not provide tools for this, so you would need to integrate a migration tool (e.g., Alembic) separately.

**PR checklist**
*   Ensure any new database models are defined in `backend/models.py` with appropriate columns and relationships.
*   Verify that new API request/response structures have corresponding Pydantic schemas defined in `backend/schemas.py`.
*   Confirm that all new API endpoints in `backend/main.py` requiring authentication correctly utilize the `security.py::verify_jwt` dependency.
*   > ⚠️ Not confirmed — verify before running. (No evidence for linting, testing, or specific CI steps.)

## Project Overview

`testing` is a foundational backend application for an AI Code Review Platform. It is built with Python, leveraging SQLAlchemy for robust database interactions and Pydantic for efficient data validation and serialization.

The application defines a comprehensive database schema in `backend/models.py`, encompassing key entities such as `Organization`, `User`, `Repository`, `DocumentationRun`, `PullRequest`, `CodeReviewRun`, and `ReviewFinding`. Data validation is handled by Pydantic schemas, exemplified by `OrganizationCreate` in `backend/schemas.py`.

The primary entry point for the application is `backend/main.py`, which contains core logic, including a function to retrieve user details.

## Features

This repository contains the foundational components for an AI Code Review Platform, including:

*   **User Information Retrieval**: The `get_me` function in `backend/main.py` is designed to fetch detailed information about an authenticated user, including their ID, GitHub ID, username, role, and organization affiliation. This function utilizes a `verify_jwt` dependency from `security.py`, indicating an authentication mechanism.
*   **Comprehensive Data Models**: `backend/models.py` defines the SQLAlchemy ORM models for key entities within the platform, establishing the database schema:
    *   `Organization`: Manages organizational details such as name, slug, and plan type.
    *   `User`: Stores user profiles, linked to organizations, including email, password hash, and role.
    *   `Repository`: Tracks connected code repositories, including provider, name, URL, and default branch.
    *   `DocumentationRun`: Records details of documentation generation processes, including status, files scanned, and output path.
    *   `PullRequest`: Represents pull requests undergoing review, storing details like PR number, title, author, and status.
    *   `CodeReviewRun`: Stores information about automated code review executions, including status and files analyzed.
    *   `ReviewFinding`: Details specific issues identified during code reviews, including file path, line number, issue type, severity, description, and suggestion.
*   **Data Validation Schemas**: `backend/schemas.py` provides Pydantic models for robust data validation, such as `OrganizationCreate`, used for defining the structure of data when creating new organization records.

## Tech Stack

*   **Python**: The primary programming language for the application.
*   **FastAPI**: Inferred from the use of `Depends` in `backend/main.py` and `security.py`, indicating a web framework for building APIs.
*   **SQLAlchemy**: Used for database interactions and defining ORM models, as seen in `backend/models.py`.
*   **Pydantic**: Utilized for data validation and settings management, as demonstrated by `OrganizationCreate` in `backend/schemas.py`.
*   **PyJWT**: Inferred from `jwt.decode` and `JWTError` in `security.py`, used for handling JSON Web Tokens.
*   **SQL Database**: For persistent data storage, managed through SQLAlchemy (e.g., PostgreSQL, MySQL, SQLite).

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
    pip install -r requirements.txt
    > ⚠️ Not confirmed — verify before running. (requirements.txt is inferred, not provided)
    ```

3.  **Environment Variables**
    The application relies on the following environment variables:
    *   `JWT_SECRET`: Used by `security.py::verify_jwt` for decoding JWTs.
    *   `JWT_ALGORITHM`: Used by `security.py::verify_jwt` to specify the algorithm for JWT decoding.
    > ⚠️ Not confirmed — verify before running. (Specific instructions for setting these or what breaks if missing are not in evidence.)

4.  **Configuration Files**
    No explicit configuration files (e.g., `.env`, `config.ini`) were found in the provided evidence.

## Usage

To run the application:
> ⚠️ Not confirmed — verify before running. (No explicit run command like `uvicorn main:app --reload` or a `Makefile` was found in evidence.)

Once the application is running, you can interact with its API endpoints. For example, to access the user information endpoint:

*   **`GET /me`**: This endpoint, handled by `backend/main.py::get_me`, retrieves details about the authenticated user. It requires a valid JWT in the `Authorization` header.