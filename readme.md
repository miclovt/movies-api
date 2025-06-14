# How to Run the Movies Project

This project has two main parts: an API built with NestJS and a web application built with Next.js. Follow the steps below to get both up and running.

---

## 0. Initial Setup: Create PostgreSQL Database

Before starting the applications, you'll need to create a PostgreSQL database that the API will connect to.

1.  **Create a database named `movies`**. You can do this using a PostgreSQL client (like `psql`, pgAdmin, or DBeaver) or directly from your terminal:

    ```bash
    # If using psql, connect to your PostgreSQL server and then:
    CREATE DATABASE movies;
    ```

    _Ensure your PostgreSQL server is running and you have the necessary permissions to create databases._

---

## 1. API (NestJS)

The API handles all your backend logic, including database interactions.

**Location:** `api/` folder

**Technology:** NestJS

**Port:** 3001

### Setup and Running:

1.  **Navigate to the API directory:**

    ```bash
    cd api
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a **`.env`** file in the `api/` directory. This file will store your database connection credentials and other sensitive information.

    **Example `.env` file:**

    ```
    DB_HOST=localhost
    DB_USERNAME=postgres
    DB_USERPASS=admin
    DB_NAME=movies
    ```

    _Replace `user` and `password` with your PostgreSQL credentials. Notice that the `DATABASE_URL` now points to the `movies` database we created._

4.  **Run the API:**

    ```bash
    yarn start
    ```

    The API should now be running on `http://localhost:3001`.

---

## 2. Web Application (Next.js)

The web application is the user-facing part of your movies project.

**Location:** `web/` folder

**Technology:** Next.js

**Port:** 3000

### Setup and Running:

1.  **Navigate to the Web directory:**

    ```bash
    cd web
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a **`.env.local`** file in the `web/` directory. This file will store environment variables specific to your Next.js application, including the URL of your API.

    **Example `.env.local` file:**

    ```
    NEXT_PUBLIC_BASE_API_URL=http://localhost:3001
    # ... other Next.js specific environment variables
    ```

    _Make sure **`NEXT_PUBLIC_BASE_API_URL`** points to the address where your NestJS API is running._

4.  **Run the Web Application:**

    ```bash
    yarn dev
    ```

    The web application should now be accessible at `http://localhost:3000`.

---

You should now have both the API and the web application running, ready for you to start working on the Movies Project!
