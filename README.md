# Campsite Booking App Backend Server

This is the backend server for the Campsite Booking App, which provides API services for CRUD operations using a RESTful API. The server is built with Node.js, Express.js, MongoDB with Mongoose, and utilizes JWT for authentication and authorization. The server is implemented in TypeScript for enhanced type safety.

## Table of Contents

- [Frontend](#frontend)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authentication and Authorization](#authentication-and-authorization)


## Frontend

The backend server serves the frontend of the Campsite Booking App, which can be accessed at [example.com](link-example). The frontend provides a user-friendly interface for users to interact with the campsite booking system.

To use the frontend, ensure that you have the necessary prerequisites installed and follow the installation instructions provided in the frontend repository.

- Frontend Repository: [Frontend Repository](https://github.com/kachunone/campsite-booking-web-frontend.git)

## Features

- User authentication and authorization using JWT
- CRUD operations for campsites, bookings, and users
- RESTful API endpoints for interacting with the database
- TypeScript for enhanced type safety
- Integration with MongoDB using Mongoose

## Prerequisites

Before running the backend server, ensure that you have the following prerequisites installed:

- Node.js (version X.X.X)
- MongoDB (version X.X.X)
- ...

## Installation

Follow these steps to set up the backend server:

1. Clone the repository:

    ```
    git clone https://github.com/your/repository.git
    ```
   
2. Install dependencies:

    ```
    npm run build
    ```
  
3. Build the TypeScript code:

    ```
    npm run build
    ```
  
  
## Configuration

The server can be configured using environment variables. Create a .env file in the root directory and specify the following variables:

  ```
  DB_URI=mongodb://localhost:27017/campsite-booking-app
  ```
## Usage

To start the backend server, run the following command:

  ```
  npm start
  ```
  
The server will start listening on port 3000 by default. You can access it at http://localhost:8080.

## API Documentation
The API endpoints and their usage are documented in the API documentation file. Please refer to it for detailed information on each endpoint, request and response formats, and authentication requirements.

## Authentication and Authorization
The server uses JWT for authentication and authorization. When making requests to protected routes, include the JWT token in the Authorization header using the Bearer scheme.

Example:

  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
Refer to the API documentation for specific endpoints that require authentication.


