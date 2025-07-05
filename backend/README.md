# LMS Backend

A robust Learning Management System backend built with Node.js, Express, and PostgreSQL.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Admin, Instructor, and Student roles
- **Course Management**: Create, update, and manage courses with rich content
- **Enrollment System**: Track student enrollments and progress
- **Quiz System**: Create and manage assessments with automatic grading
- **File Upload**: Support for videos, PDFs, and other course materials
- **Notifications**: Email and in-app notification system
- **Security**: Rate limiting, input validation, and security headers

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting
- **File Upload**: Multer

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=lms_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:3000
   ```

4. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE lms_db;
   CREATE USER lms_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE lms_db TO lms_user;
   ```

5. **Run database migrations**
   ```bash
   npm run dev
   ```
   The server will automatically sync the database schema.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PATCH /api/users/:id/role` - Update user role (Admin only)
- `PATCH /api/users/:id/status` - Toggle user status (Admin only)
- `GET /api/users/instructors` - Get all instructors (Public)

### Courses (TODO)
- `GET /api/courses` - Get published courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/:id` - Update course (Instructor/Admin)
- `DELETE /api/courses/:id` - Delete course (Instructor/Admin)

### Enrollments (TODO)
- `POST /api/enrollments` - Enroll in course (Student)
- `GET /api/enrollments/student/:id` - Get student enrollments
- `GET /api/enrollments/course/:id` - Get course enrollments (Instructor/Admin)

### Quizzes (TODO)
- `GET /api/quizzes/course/:id` - Get course quizzes
- `POST /api/quizzes` - Create quiz (Instructor/Admin)
- `POST /api/quizzes/:id/submit` - Submit quiz (Student)

## Development

### Running the server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### Database
The application uses Sequelize ORM with PostgreSQL. Models are automatically synced in development mode.

### File Structure
```
src/
├── config/          # Database and app configuration
├── controllers/     # Route controllers (TODO)
├── middlewares/     # Custom middleware
├── models/          # Sequelize models
├── routes/          # API routes
├── utils/           # Utility functions
└── server.js        # Main server file
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin, Instructor, Student roles
- **Input Validation**: Express-validator for request validation
- **Rate Limiting**: Prevent abuse with request rate limiting
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configured for frontend communication
- **Password Hashing**: bcryptjs for secure password storage

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | lms_db |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | password |
| `JWT_SECRET` | JWT secret key | your-secret-key |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License. 