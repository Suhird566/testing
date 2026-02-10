# testing

## Project Overview
`testing` is a backend application designed as a foundational component for an **AI Code Review Platform**. It is built with Python, leveraging SQLAlchemy for robust database interactions and Pydantic for efficient data validation and serialization.

The application defines a comprehensive database schema in `backend/models.py`, encompassing key entities such as `Organization`, `User`, `Repository`, `DocumentationRun`, `PullRequest`, `CodeReviewRun`, and `ReviewFinding`. Data validation is handled by Pydantic schemas, exemplified by `OrganizationCreate` in `backend/schemas.py`.

The primary entry point for the application is `backend/main.py`, which contains core logic, including a function to retrieve user details.

## Features
This repository contains the foundational components for an AI Code Review Platform, including:

*   **User Information Retrieval**: The `get_me` function in `backend/main.py` is designed to fetch detailed information about an authenticated user, including their ID, GitHub ID, username, role, and organization affiliation. This function utilizes a `verify_jwt` dependency, indicating an authentication mechanism.
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
*   **Python**: 3.10+
*   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. (Inferred from the use of `Depends` in `backend/main.py` and common project structure).
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
    pip install -r requirements.txt