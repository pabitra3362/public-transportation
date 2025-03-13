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
	+ `plate`: Vehicle plate number ( required, must be at least 3 characters long)
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

### Admin API Endpoints

#### Admin Registration
* **Endpoint:** `/api/admin/registerAdmin`
* **Method:** `POST`
* **Request Body:**
	+ `name`: Admin's name (required, must be at least 3 characters long)
	+ `email`: Admin's email address (required, must be valid email)
	+ `password`: Admin's password (required, must be at least 7 characters long)
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
	+ `admin`: Admin object with id, name, email
	+ `token`: JWT token for authentication
* **Request Example:**
    ```json
    {
      "name": "Admin User",
      "email": "admin@example.com",
      "password": "admin1234"
    }
    ```
* **Response Example:**
    ```json
    {
      "admin": {
        "id": "1",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "token": "your_jwt_token"
    }
    ```

#### Admin Login
* **Endpoint:** `/api/admin/login`
* **Method:** `POST`
* **Request Body:**
	+ `email`: Admin's email address (required, must be valid email)
	+ `password`: Admin's password (required, must be at least 7 characters long)
* **Response:**
	+ `admin`: Admin object with id, name, email
	+ `token`: JWT token for authentication
* **Request Example:**
    ```json
    {
      "email": "admin@example.com",
      "password": "admin1234"
    }
    ```
* **Response Example:**
    ```json
    {
      "admin": {
        "id": "1",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "token": "your_jwt_token"
    }
    ```

#### Admin Profile
* **Endpoint:** `/api/admin/profile`
* **Method:** `GET`
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `admin`: Admin object with id, name, email
* **Request Example:**
    ```http
    GET /api/admin/profile HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    {
      "admin": {
        "id": "1",
        "name": "Admin User",
        "email": "admin@example.com"
      }
    }
    ```

#### Admin Logout
* **Endpoint:** `/api/admin/logout`
* **Method:** `GET`
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `message`: Confirmation message
* **Request Example:**
    ```http
    GET /api/admin/logout HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### Forget Admin Password
* **Endpoint:** `/api/admin/forgetPassword`
* **Method:** `POST`
* **Request Body:**
	+ `email`: Admin's email address (required, must be valid email)
* **Response:**
	+ `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "email": "admin@example.com"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Email sent successfully"
    }
    ```

#### Set New Password
* **Endpoint:** `/api/admin/setNewPassword`
* **Method:** `POST`
* **Request Body:**
	+ `password`: New password (required, must be between 7 and 12 characters long)
* **Response:**
	+ `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "password": "newpassword123"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Password updated successfully"
    }
    ```

#### Get All Users
* **Endpoint:** `/api/admin/getUsers`
* **Method:** `GET`
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + Array of user objects with id, name, email
* **Request Example:**
    ```http
    GET /api/admin/getUsers HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    [
      {
        "id": "1",
        "name": "User One",
        "email": "user1@example.com"
      },
      {
        "id": "2",
        "name": "User Two",
        "email": "user2@example.com"
      }
    ]
    ```

#### Delete User
* **Endpoint:** `/api/admin/deleteUser`
* **Method:** `DELETE`
* **Request Body:**
	+ `id`: User's ID (required)
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "id": "1"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

#### Update User
* **Endpoint:** `/api/admin/updateUser`
* **Method:** `PUT`
* **Request Body:**
	+ `id`: User's ID (required)
	+ `name`: User's new name (required, must be at least 3 characters long)
	+ `email`: User's new email (required, must be valid email)
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "id": "1",
      "name": "Updated Name",
      "email": "updated@example.com"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "User details updated successfully"
    }
    ```

#### Get All Captains
* **Endpoint:** `/api/admin/getCaptains`
* **Method:** `GET`
* **Headers:**
    + `Authorization`: Bearer token ( required)
* **Response:**
    + Array of captain objects with id, name, email, and vehicle details
* **Request Example:**
    ```http
    GET /api/admin/getCaptains HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    [
      {
        "id": "1",
        "name": "Captain One",
        "email": "captain1@example.com",
        "vehicle": {
          "plate": "ABC123",
          "vehicleType": "car",
          "capacity": 4
        }
      },
      {
        "id": "2",
        "name": "Captain Two",
        "email": "captain2@example.com",
        "vehicle": {
          "plate": "XYZ789",
          "vehicleType": "motorcycle",
          "capacity": 2
        }
      }
    ]
    ```

#### Get Single Captain
* **Endpoint:** `/api/admin/getCaptain`
* **Method:** `GET`
* **Query Parameters:**
	+ `id`: Captain's ID (required)
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + Captain object with full details
* **Request Example:**
    ```http
    GET /api/admin/getCaptain?id=1 HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    {
      "id": "1",
      "name": "Captain One",
      "email": "captain1@example.com",
      "vehicle": {
        "plate": "ABC123",
        "vehicleType": "car",
        "capacity": 4
      }
    }
    ```

#### Delete Captain
* **Endpoint:** `/api/admin/deleteCaptain`
* **Method:** `DELETE`
* **Request Body:**
	+ `id`: Captain's ID (required)
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "id": "1"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Driver deleted successfully"
    }
    ```

#### Update Captain
* **Endpoint:** `/api/admin/updateCaptain`
* **Method:** `PUT`
* **Request Body:**
	+ `id`: Captain's ID (required)
	+ `name`: Captain's new name (required, must be at least 3 characters long)
	+ `email`: Captain's new email (required, must be valid email)
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "id": "1",
      "name": "Updated Captain",
      "email": "updated@example.com"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Driver details updated successfully"
    }
    ```

#### Get Rides
* **Endpoint:** `/api/admin/getRides`
* **Method:** `GET`
* **Query Parameters:**
	+ `status`: Ride status (required)
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + Array of ride objects with full details
* **Request Example:**
    ```http
    GET /api/admin/getRides?status=active HTTP/1.1
    Authorization: Bearer your_jwt_token
    ```
* **Response Example:**
    ```json
    [
      {
        "id": "1",
        "user": {
          "id": "1",
          "name": "User One"
        },
        "captain": {
          "id": "1",
          "name": "Captain One"
        },
        "status": "active",
        "startLocation": "Location A",
        "endLocation": "Location B"
      }
    ]
    ```

#### Cancel Ride
* **Endpoint:** `/api/admin/cancelRide`
* **Method:** `POST`
* **Request Body:**
	+ `rideId`: Ride's ID (required)
* **Headers:**
    + `Authorization`: Bearer token (required)
* **Response:**
    + `message`: Confirmation message
* **Request Example:**
    ```json
    {
      "rideId": "1"
    }
    ```
* **Response Example:**
    ```json
    {
      "message": "Ride cancelled successfully"
    }
    ```

## Validation Errors for Admin Endpoints
* If the name is less than 3 characters long, a 400 error will be returned with the message: "Name must be at least 3 characters long"
* If the email is not valid, a 400 error will be returned with the message: "Please enter a valid email"
* If the password is less than 7 characters long, a 400 error will be returned with the message: "Password must be at least 7 characters long"
* If any required field is missing, a 400 error will be returned with the message: "All fields are required"

## Error Handling
* If an internal server error occurs, a 500 error will be returned with a JSON response containing the error message
