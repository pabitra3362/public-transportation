# Public Transportation Backend API

This is the backend API for the public transportation system. It provides endpoints for user registration, login, and authentication.

## Endpoints

### User API Endpoints

#### User Registration
* **Endpoint:** `/api/user/register`
* **Method:** `POST`
* **Request Body:**
	+ `email`: User's email address (required)
	+ `name`: User's name (required, must be at least 5 characters long)
	+ `password`: User's password (required, must be between 7 and 12 characters long)
* **Response:**
	+ `token`: JWT token for authentication
	+ `user`: User object with id, email, name, and password
* **Request Example:**
    ```json
    {
      "email": "user@example.com",
      "name": "user123",
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
        "name": "user123",
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
	+ `user`: User object with id, email, name, and password
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
        "name": "user123",
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
    + `user`: User object with id, email, name
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
        "name": "user123"
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

* If the name is less than 5 characters or more than 10 characters, a 400 error will be returned with a JSON response containing the error message: "name must be between 5 and 10 characters long".
* If the password is less than 7 characters or more than 12 characters, a 400 error will be returned with a JSON response containing the error message: "Password must be between 7 and 12 characters long".
* If the email is not a valid email address, a 400 error will be returned with a JSON response containing the error message: "Email is not valid".

## Error Handling

* If an internal server error occurs, a 500 error will be returned with a JSON response containing the error message.

### Forget Password
* **Endpoint:** `/api/user/forgetPassword`
* **Method:** `POST`
* **Request Body:**
	+ `email`: User's email address (required)
* **Response:**
	+ `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "email": "user@example.com"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Email sent successfully"
    }
    ```

### Set New Password
* **Endpoint:** `/api/user/setNewPassword`
* **Method:** `POST`
* **Request Body:**
	+ `id`: User's ID (required)
	+ `password`: New password (required, must be between 7 and 12 characters long)
* **Response:**
	+ `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "id": "1",
      "password": "newpassword123"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Password updated successfully"
    }
    ```

## Validation Errors

* If the name is less than 5 characters or more than 10 characters, a 400 error will be returned with a JSON response containing the error message: "name must be between 5 and 10 characters long".
* If the password is less than 7 characters or more than 12 characters, a 400 error will be returned with a JSON response containing the error message: "Password must be between 7 and 12 characters long".
* If the email is not a valid email address, a 400 error will be returned with a JSON response containing the error message: "Email is not valid".

## Error Handling

* If an internal server error occurs, a 500 error will be returned with a JSON response containing the error message.


### Captain (Driver) API Endpoints

#### Captain Registration
* **Endpoint:** `/api/captain/register`
* **Method:** `POST`
* **Request Body:**
	+ `email`: Captain's email address (required)
	+ `name`: Captain's name (required, must be at least 5 characters long)
	+ `password`: Captain's password (required, must be at least 7 characters long)
	+ `color`: Vehicle color (required, must be at least 3 characters long)
	+ `plate`: Vehicle plate number (required, must be at least 3 characters long)
	+ `vehicleType`: Type of vehicle (required, must be one of 'car', 'motorcycle', 'bike')
	+ `capacity`: Seating capacity of the vehicle (required, must be at least 1)
* **Response:**
	+ `token`: JWT token for authentication
	+ `captain`: Captain object with id, email, name, and vehicle details
* **Request Example:**
    ```json
    {
      "email": "driver@example.com",
      "name": "John Doe",
      "password": "securepassword",
      "file": "user file",
      "plate": "ABC123",
      "vehicleType": "car",
      "capacity": 4
    }
    ```
* **Response Example:**
    ```json
    {
      "token": "your_jwt_secret",
      "captain": {
        "name": "John Doe",
        "email": "driver@example.com",
        "password": "securepassword",
        "file": "user file",
        "status": "inactive",
        "vehicle": {
            "plate": "ABC123",
            "vehicleType": "car",
            "capacity": 4
        },
        "_id": "1",
        "__v": 0
      }
    }
    ```

### Validation Errors for Captain Registration
* If the name is less than 5 characters or more than 11 characters, a 400 error will be returned with a JSON response containing the error message: "Name must be between 5 and 11 characters long".
* If the password is less than 7 characters, a 400 error will be returned with a JSON response containing the error message: "Password must be at least 7 characters long".
* If the email is not a valid email address, a 400 error will be returned with a JSON response containing the error message: "Email is not valid".
* If the vehicle details are invalid, a 400 error will be returned with appropriate error messages for each field.

### Error Handling
* If an internal server error occurs during captain registration, a 500 error will be returned with a JSON response containing the error message.

#### Captain Login
* **Endpoint:** `/api/captain/login`
* **Method:** `POST`
* **Request Body:**
	+ `email`: Captain's email address (required)
	+ `password`: Captain's password (required, must be between 7 and 12 characters long)
* **Response:**
	+ `token`: JWT token for authentication
	+ `captain`: Captain object with id, email, name, and vehicle details
* **Request Example:**
    ```json
    {
      "email": "driver@example.com",
      "password": "securepassword"
    }
    ```
* **Response Example:**
    ```json
    {
      "token": "your_jwt_token",
      "captain": {
        "id": "1",
        "email": "driver@example.com",
        "name": "John Doe",
        "file": "user file",
        "vehicle": {
            "plate": "ABC123",
            "vehicleType": "car",
            "capacity": 4
        }
      }
    }
    ```

### Validation Errors for Captain Login
* If the email is not a valid email address, a 400 error will be returned with a JSON response containing the error message: "Email is not valid".
* If the password is less than 7 characters or more than 12 characters, a 400 error will be returned with a JSON response containing the error message: "Password must be between 7 and 12 characters long".

### Captain Profile
* **Endpoint:** `/api/captain/profile`
* **Method:** `GET`
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `captain`: Captain object with id, email, name
* **Request Example:**
    ```http
    GET /api/captain/profile HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    {
      "vehicle": {
          "plate": "gj051230",
          "vehicleType": "car",
          "capacity": 4
      },
      "_id": "1",
      "name": "John Doe",
      "email": "driver@example.com",
      "status": "inactive",
      "file": "user file",
      "__v": 0
    }
    ```

### Captain Logout
* **Endpoint:** `/api/captain/logout`
* **Method:** `GET`
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `message`: Confirmation message
* **Request Example:**
    ```http
    GET /api/captain/logout HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

### Error Handling
* If an internal server error occurs during captain logout, a 500 error will be returned with a JSON response containing the error message

### Forget Captain Password
* **Endpoint:** `/api/captain/forgetPassword`
* **Method:** `POST`
* **Request Body:**
	+ `email`: Captain's email address (required)
* **Response:**
	+ `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "email": "driver@example.com"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Email sent successfully"
    }
    ```

### Set New Password for Captain
* **Endpoint:** `/api/captain/setNewPassword`
* **Method:** `POST`
* **Request Body:**
	+ `id`: Captain's ID (required)
	+ `password`: New password (required, must be between 7 and 12 characters long)
* **Response:**
	+ `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "id": "1",
      "password": "newpassword123"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Password updated successfully"
    }
    ```

### Validation Errors for Captain
* If the email is not a valid email address, a 400 error will be returned with a JSON response containing the error message: "Email is not valid".

### Error Handling
* If an internal server error occurs during captain operations, a 500 error will be returned with a JSON response containing the error message.