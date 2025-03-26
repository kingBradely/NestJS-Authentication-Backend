# NestJS Authentication Backend

A comprehensive authentication system built with NestJS, perfect for learning how to implement secure user authentication in a Node.js application. This project is specifically designed to help junior developers understand authentication concepts in NestJS.

## 🎯 What You'll Learn

- How to implement user authentication in NestJS
- Working with TypeORM for database operations
- JWT (JSON Web Tokens) implementation
- Password hashing with bcrypt
- Role-based access control
- Unit testing in NestJS
- Custom Exception Filters
- Request Logging and Interceptors

## 🚀 Features

- User registration and login system
- Secure password hashing using bcrypt
- JWT-based authentication with configurable expiration
- Role-based authorization using Guards (Admin/User roles)
- Global Exception Handling with Custom Filters for better error responses
- Request Logging with Interceptors for debugging and monitoring
- TypeORM integration with MySQL
- Comprehensive test coverage with Jest
- Swagger API documentation at /api/docs
- CORS enabled for frontend integration
- Environment-based configuration
- Automatic database creation

## 📋 Prerequisites

Before starting, make sure you have:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL database
- Basic understanding of TypeScript
- Basic knowledge of REST APIs

## 🔧 Environment Setup

### Installing Node.js and npm

1. Visit the official Node.js website at [https://nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version for your operating system
3. Run the installer and follow the installation wizard
4. Verify the installation by opening a terminal/command prompt and running:
   ```bash
   node --version
   npm --version
   ```

### Installing NestJS CLI

1. Open a terminal/command prompt
2. Install NestJS CLI globally using npm:
   ```bash
   npm install -g @nestjs/cli
   ```
3. Verify the installation:
   ```bash
   nest --version
   ```

### Installing MySQL

1. Download MySQL Community Server from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Run the installer for your operating system
3. During installation:
   - Set a root password (remember this for later)
   - Choose "Developer Default" setup type
   - Enable MySQL server to run as a Windows Service (if on Windows)
4. Verify the installation:
   ```bash
   mysql --version
   ```

## 🛠️ Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/kingBradely/NestJS-Authentication-Backend.git
cd authentication-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Install MySQL if you haven't already
2. The application will automatically create a database named 'authexample' (configurable)
3. Configure your database connection:

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=
DATABASE_NAME=authexample

# JWT Configuration
JWT_SECRET=your_jwt_secret  # Change this to a secure secret key

# Application Configuration
PORT=3000  # Optional, defaults to 3000
```

### 4. Start the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run start:prod
```

The application will be available at `http://localhost:3000/api`
Swagger documentation: `http://localhost:3000/api/docs`

## 📚 Code Structure

```
src/
├── authentication/          # Authentication module
│   ├── authentication.controller.ts   # Handles auth routes
│   ├── authentication.service.ts      # Authentication logic
│   ├── jwtStrategy.service.ts         # JWT strategy implementation
│   ├── guards/                        # Role-based guards
│   └── dto/                          # Data Transfer Objects
├── users/                   # Users module
│   ├── entities/            # User entity definition
│   ├── dto/                 # User-related DTOs
│   ├── users.service.ts     # User management logic
│   └── users.controller.ts  # User routes
├── common/                  # Shared components
│   ├── filters/             # Global exception filters
│   └── interceptors/        # Logging interceptors
└── config/                  # Configuration files
    ├── database.config.ts   # Database configuration
    └── swagger.config.ts    # Swagger documentation setup
```

## 🔒 Authentication Flow

1. **Registration**: Users can register with email, password, and name
   - Passwords are automatically hashed using bcrypt
   - Email uniqueness is validated
   - Default role is assigned

2. **Login**: Users can login with email and password
   - Returns JWT token with 1-day expiration
   - Includes user role in token payload

3. **Authorization**: Protected routes use JWT Guard
   - Role-based access control using @Roles decorator
   - Global exception handling for unauthorized access

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 API Documentation

Once the application is running, visit `http://localhost:3000/api/docs` to access the Swagger documentation, which includes:

- Detailed API endpoints
- Request/Response schemas
- Authentication requirements
- Testing endpoints directly from the browser

## 🛡️ Security Features

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens with configurable expiration
- Role-based access control
- CORS protection
- Request validation using DTOs
- Global exception handling
- Secure headers with Helmet (TODO)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

Oussema Hedhlie - ossamahedli@gmail.com

Project Link: https://github.com/kingBradely/NestJS-Authentication-Backend

