# User Management API

This is a User Management API built with Node.js, Express, and MongoDB. It provides functionality for user registration, login, and profile management. Additionally, users can fetch random jokes from an external API. The API is secured using JWT (JSON Web Tokens) to protect routes that require authentication.

## Table of Contents
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies](#technologies)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)

## Features
- **User Authentication**: Users can sign up, log in, and access protected routes.
- **JWT Authorization**: Secure routes using JSON Web Tokens for authentication.
- **Random Jokes**: Retrieve a random joke from an external API.
- **Error Handling**: Centralized error responses for improved API usability.

## Technologies
- **Node.js**: JavaScript runtime environment to build the API.
- **Express**: Web framework for building server-side logic.
- **MongoDB**: NoSQL database to store user information.
- **JWT**: Token-based authentication system.
- **Axios**: Promise-based HTTP client for making API requests (used for joke fetching).

## Getting Started
### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
- **MongoDB**: A MongoDB instance (local or cloud) for storing user data.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/AjayDumaraliya19/user_routes.git
   cd USER_ROUTES

2. Install the dependencies:
   ```bash
   npm install

3. Set up environment variables: Create a `.env` file in the root directory and add the following:
    ```bash
    PORT=3000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.e6yvs5g.mongodb.net/user_test
    JWT_SECRET_KEY=your_secret_key
Replace `<username>` and `<password>` with your MongoDB credentials.

4. Start the development server:
    ```bash
    npm start

The server will run on `http://localhost:3000`.

## Folder Structure
```json
├── src
│ ├── errors
│ │ └── comman_message.ts
│ ├── middlewares
│ │ └── authMiddleware.ts
│ ├── models
│ │ └── user.ts
│ ├── routes
│ │ ├── jokeRoutes.ts
│ │ └── userRoutes.ts
│ └── index.ts
├── env.d.ts
├── nodemon.json
├── package.json
├── README.md
└── tsconfig.json
```

## API Endpoints
### User Endpoints
#### POST `/api/users/signup`
- **Description**: Register a new user.
- **Body**:
    ```bash
    {
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "password": "string"
    }

#### POST `/api/users/login`
- **Description**: Log in an existing user and receive a JWT token.
- **Body**:
    ```bash
    {
        "email": "string",
        "password": "string"
    }

#### POST `/api/users/logout`
- **Description**: Log out the user.
- **Headers**:
    ```bash
    {
        "Authorization": "Bearer <token>"
    }

#### GET `/api/users/me`
- **Description**: Retrieve the logged-in user's profile information.
- **Headers**:
    ```bash
    {
        "Authorization": "Bearer <token>"
    }


#### Joke Endpoint
#### GET `/api/random-joke`
- **Description**: Fetch a random joke from the Chuck Norris joke API.

### Error Handling
The API is equipped with centralized error handling for consistency. Here are some common error messages you may encounter:
- **No token, authorization denied..!**
- **Invalid token..!**
- **Error fetching joke..!**
- **Email and Password are required..!**
- **Email already exists..!**
- **User not found..!**
- **Invalid credentials..!**
- **Error creating user..!**
- **Error during login..!**
- **Server error..!**

## Conclusion
This User Management API provides essential functionality for managing users and retrieving jokes. It’s designed for scalability and easy extension, making it an ideal starting point for further development. Contributions are welcome, and feel free to explore the code and add new features!
