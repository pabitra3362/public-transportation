# Public Transportation Backend API

This is the backend API for the public transportation system. It provides endpoints for user registration, login, and authentication.

## Endpoints

### User API Endpoints

#### User Registration
* **Endpoint:** `/api/user/register`
* **Method:** `POST`
* **Request Body:**
	+ `email`: User's email address (required)
	+ `username`: User's username (required, must be between 5 and 10 characters long)
	+ `password`: User's password (required, must be between 7 and 12 characters long)
* **Response:**
	+ `token`: JWT token for authentication
	+ `user`: User object with id, email, username, and password
* **Request Example:**
    ```json
    {
      "email": "user@example.com",
      "username": "user123",
      "password": "password123"
    }
    ```
* **Response Example:**
    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "id": "1",
        "email": "user@example.com",
        "username": "user123",
        "password": "password123"
      }
    }
    ```

#### User Login
* **Endpoint:** `/api/user/login`
* **Method:** `POST`
* **Request Body:**
	+ `email`: User's email address (required)
	+ `password`: User's password (required, must be between 7 and 12 characters long)
* **Response:**
	+ `token`: JWT token for authentication
	+ `user`: User object with id, email, username, and password
* **Request Example:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
* **Response Example:**
    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "id": "1",
        "email": "user@example.com",
        "username": "user123",
        "password": "password123"
      }
    }
    ```

#### User Profile
* **Endpoint:** `/api/user/profile`
* **Method:** `GET`
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `user`: User object with id, email, username
* **Request Example:**
    ```http
    GET /api/user/profile HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    {
      "user": {
        "id": "1",
        "email": "user@example.com",
        "username": "user123"
      }
    }
    ```

#### User Logout
* **Endpoint:** `/api/user/logout`
* **Method:** `GET`
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `message`: Confirmation message
* **Request Example:**
    ```http
    GET /api/user/logout HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    {
      "message": "Successfully logged out"
    }
    ```

## Validation Errors

* If the username is less than 5 characters or more than 10 characters, a 400 error will be returned with a JSON response containing the error message: "Username must be between 5 and 10 characters long".
* If the password is less than 7 characters or more than 12 characters, a 400 error will be returned with a JSON response containing the error message: "Password must be between 7 and 12 characters long".
* If the email is not a valid email address, a 400 error will be returned with a JSON response containing the error message: "Email is not valid".

## Error Handling

* If an internal server error occurs, a 500 error will be returned with a JSON response containing the error message.
