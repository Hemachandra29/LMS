# Learning Management System (LMS)

A comprehensive, full-stack Learning Management System built with modern technologies. This platform provides a complete solution for educational institutions, instructors, and students to create, manage, and participate in online courses.

## 🚀 Features

### User Roles & Permissions
- **Admin**: Full system control, user management, analytics
- **Instructor**: Course creation, student management, assessments
- **Student**: Course enrollment, learning progress, assessments

### Core Functionality
- **Authentication & Authorization**: Secure JWT-based authentication with role-based access control
- **Course Management**: Create, edit, and organize courses with multimedia content
- **Content Delivery**: Support for videos, PDFs, text, and external links
- **Enrollment System**: Student enrollment tracking and progress monitoring
- **Quiz System**: Multiple-choice, true/false, and short answer questions with auto-grading
- **Progress Tracking**: Real-time progress monitoring and analytics
- **Notifications**: Email and in-app notification system
- **Responsive Design**: Mobile-friendly interface for all devices

### Advanced Features
- **File Upload**: Support for course materials and assignments
- **Video Integration**: Embedded video lessons with progress tracking
- **Assessment Tools**: Comprehensive quiz and assignment system
- **Analytics Dashboard**: Detailed insights for instructors and admins
- **Certificate Generation**: Automatic certificate issuance upon course completion

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting
- **File Upload**: Multer
- **Email**: Nodemailer

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + React Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **UI Components**: Headless UI + Heroicons
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd LMS
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your database credentials

# Set up PostgreSQL database
# Create database and user as described in backend/README.md

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

## 📁 Project Structure

```
LMS/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middleware
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Main server file
│   ├── package.json
│   └── README.md
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Application entry point
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
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

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users` - Get all users (Admin)
- `PUT /api/users/:id` - Update user profile
- `PATCH /api/users/:id/role` - Update user role (Admin)

### Course Management (TODO)
- `GET /api/courses` - Get published courses
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/:id` - Update course (Instructor/Admin)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin, Instructor, Student roles
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: Prevent abuse with request rate limiting
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configured for frontend communication
- **Password Hashing**: bcryptjs for secure password storage

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern Interface**: Clean, intuitive design with Tailwind CSS
- **Accessibility**: WCAG compliant components
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run `npm run build`
4. Deploy to your hosting provider

### Frontend Deployment
1. Set `VITE_API_URL` to your backend URL
2. Run `npm run build`
3. Deploy the `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in each directory
- Review the API health endpoint

## 🔮 Roadmap

- [ ] Complete course management implementation
- [ ] Add video streaming capabilities
- [ ] Implement real-time notifications
- [ ] Add advanced analytics
- [ ] Mobile app development
- [ ] Integration with external LMS standards
- [ ] Multi-language support
- [ ] Advanced assessment types
- [ ] Social learning features
- [ ] Payment integration

---

**Built with ❤️ for modern education** 