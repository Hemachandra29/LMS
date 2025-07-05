const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({ 
        message: 'Invalid or expired token' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired' 
      });
    }
    return res.status(500).json({ 
      message: 'Authentication error' 
    });
  }
};

// Role-based access control
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Insufficient permissions' 
      });
    }

    next();
  };
};

// Specific role middlewares
const requireAdmin = authorize('admin');
const requireInstructor = authorize('instructor', 'admin');
const requireStudent = authorize('student', 'instructor', 'admin');

// Check if user owns the resource or is admin
const checkOwnership = (model, paramName = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[paramName];
      const resource = await model.findByPk(resourceId);

      if (!resource) {
        return res.status(404).json({ 
          message: 'Resource not found' 
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        req.resource = resource;
        return next();
      }

      // Check ownership based on model
      let ownerField = 'userId';
      if (model.name === 'Course' || model.name === 'Lesson' || model.name === 'Quiz') {
        ownerField = 'instructorId';
      }

      if (resource[ownerField] !== req.user.id) {
        return res.status(403).json({ 
          message: 'Access denied' 
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({ 
        message: 'Authorization error' 
      });
    }
  };
};

// Optional authentication (for public routes that can show different content for logged users)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await User.findByPk(decoded.userId);
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

module.exports = {
  authenticateToken,
  authorize,
  requireAdmin,
  requireInstructor,
  requireStudent,
  checkOwnership,
  optionalAuth
}; 