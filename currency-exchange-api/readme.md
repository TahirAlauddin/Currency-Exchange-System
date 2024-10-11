
# Currency Exchange System - Backend

## Overview
This is the backend API for the Currency Exchange System, built with Django and Django REST Framework. It provides RESTful endpoints for managing currencies, transactions, and users.

### Technologies
- **Django**: Python web framework
- **Django REST Framework**: Used for building the RESTful API
- **PostgreSQL**: Database, managed with Docker

### Requirements
- Python 3.9
- Docker
- PostgreSQL (Dockerized)

### Setup
1. **Clone the repository** and navigate to the backend directory:
   ```bash
   cd currency-exchange-system/currency-exchange-api
   ```
2. **Create a virtual environment** and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```
3. **Run PostgreSQL** using Docker:
   ```bash
   docker run -d --name currency-exchange-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=currency_exchange -p 5432:5432 postgres
   ```
4. **Configure the database** settings in `currencyexchange/settings.py` if necessary.
5. **Apply migrations**:
   ```bash
   python manage.py migrate
   ```
6. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

### Endpoints
- `GET /api/currencies/`: Retrieve a list of all currencies
- `POST /api/currencies/`: Create a new currency
- `GET /api/transactions/`: Retrieve a list of all transactions
- `POST /api/transactions/`: Create a new transaction

### License
This project is licensed under the MIT License.
