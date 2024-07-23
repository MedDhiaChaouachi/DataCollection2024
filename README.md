# DATA COLLECTION Platform

## Overview

Welcome to the DATA COLLECTION Platform! This full-stack web application is developed using Django for the backend and React for the frontend. It enables analysts to create and share posts, which users and clients can easily view and interact with. The platform also allows users to manage third-party cookies and visualize real-time data through a modern graphical extension. Additionally, the application features JWT authentication for secure user registration and login. The database used is PostgreSQL.

## Features

- **Analyst Posts:** Analysts can create and share insightful posts.
- **User Interaction:** Users and clients can view and engage with posts.
- **Third-Party Cookie Management:** Users can control third-party cookies.
- **Real-Time Data Collection:** Collects user data in real-time, displayed via a browser extension.
- **Modern Graphics:** Real-time data is presented with a sleek, user-friendly interface.
- **JWT Authentication:** Secure registration and login with JSON Web Tokens (JWT).
- **PostgreSQL Database:** Utilizes PostgreSQL for data storage.

## Tech Stack

- **Backend:** Django
- **Frontend:** React
- **Styling:** Tailwind CSS
- **Authentication:** JWT
- **Database:** PostgreSQL

## Installation

### Prerequisites

- Python 3.x
- Node.js
- npm or yarn
- PostgreSQL

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/meddhiachaouachi/data-collection-2024.git
   cd data-collection-platform
   ```

2. Set up a virtual environment and activate it:

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. Install Python dependencies: i will add the requirements file as soon as possible

   ```bash
   pip install -r requirements.txt
   ```

4. Configure the PostgreSQL database:

   - Create a new database and user.
   - Update `settings.py` with your PostgreSQL credentials:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.postgresql',
             'NAME': 'your_db_name',
             'USER': 'your_db_user',
             'PASSWORD': 'your_db_password',
             'HOST': 'localhost',
             'PORT': '5432',
         }
     }
     ```

5. Apply migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install npm dependencies:

   ```bash
   npm install  # or `yarn install`
   ```

3. Start the React development server:
   ```bash
   npm start  # or `yarn start`
   ```

## Usage

1. Access the backend server at `http://localhost:8000`.
2. Access the frontend server at `http://localhost:3000`.
3. Create, view, and interact with analyst posts.
4. Manage third-party cookies and visualize real-time data with the browser extension.
5. Register and log in securely using JWT authentication.

### Donate

Support the development of this project by donating Bitcoin to the following address:

**BTC Wallet Address:** 1CELHLsoEe7zbHNgbNFKafHeAy95yksT7S

Thank you for your support!
# Realtime-Data-Collection
