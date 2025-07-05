# LMS Frontend

A modern, responsive Learning Management System frontend built with React, Vite, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Authentication**: JWT-based authentication with role-based access control
- **Course Management**: Browse, create, and manage courses
- **Interactive Learning**: Video lessons, quizzes, and progress tracking
- **Role-based Dashboards**: Different interfaces for Admin, Instructor, and Student
- **Real-time Updates**: React Query for efficient data fetching and caching
- **Form Validation**: React Hook Form with comprehensive validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + React Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **UI Components**: Headless UI + Heroicons
- **Notifications**: React Hot Toast
- **Charts**: Recharts
- **Date Handling**: date-fns

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with navigation
│   ├── ProtectedRoute.jsx  # Route protection component
│   └── PublicRoute.jsx     # Public route component
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication context
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # User dashboard
│   └── admin/          # Admin pages
├── services/           # API services
│   ├── api.js          # Axios configuration
│   └── authService.js  # Authentication API calls
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Key Components

### Authentication
- **AuthContext**: Manages user authentication state
- **ProtectedRoute**: Guards routes requiring authentication
- **PublicRoute**: Redirects authenticated users from public routes

### Layout
- **Layout**: Main application layout with sidebar navigation
- Responsive design with mobile menu
- Role-based navigation items

### Forms
- **Login**: User authentication form
- **Register**: User registration form
- Form validation with React Hook Form
- Password visibility toggle

## API Integration

The frontend communicates with the backend through:

- **api.js**: Axios instance with interceptors for authentication
- **authService.js**: Authentication-related API calls
- **React Query**: For efficient data fetching and caching

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable component classes
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Ready for future dark mode implementation

## State Management

- **React Context**: For global state (authentication)
- **React Query**: For server state management
- **Local State**: For component-specific state

## Routing

- **React Router DOM**: Client-side routing
- **Protected Routes**: Role-based access control
- **Public Routes**: Redirect authenticated users

## Development

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- Consistent component structure

### Performance
- Code splitting with React.lazy()
- Optimized bundle with Vite
- Efficient re-renders with React.memo()

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Environment Variables**: Ensure `VITE_API_URL` is set correctly for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License. 