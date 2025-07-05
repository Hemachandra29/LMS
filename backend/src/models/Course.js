const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 300]
    }
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    validate: {
      min: 0
    }
  },
  isFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    defaultValue: 'beginner'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    defaultValue: 0
  },
  totalLessons: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalStudents: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 5
    }
  },
  totalRatings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  instructorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  requirements: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  learningOutcomes: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  certificateTemplate: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  maxStudents: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  enrollmentDeadline: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  indexes: [
    {
      fields: ['category']
    },
    {
      fields: ['level']
    },
    {
      fields: ['isPublished']
    },
    {
      fields: ['instructorId']
    }
  ]
});

// Instance methods
Course.prototype.updateStats = async function() {
  const { Lesson } = require('./Lesson');
  const { Enrollment } = require('./Enrollment');
  
  const lessonCount = await Lesson.count({ where: { courseId: this.id } });
  const studentCount = await Enrollment.count({ 
    where: { courseId: this.id, status: 'enrolled' } 
  });
  
  await this.update({
    totalLessons: lessonCount,
    totalStudents: studentCount
  });
};

Course.prototype.calculateRating = async function() {
  const { Review } = require('./Review');
  
  const reviews = await Review.findAll({ where: { courseId: this.id } });
  if (reviews.length === 0) return;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  await this.update({
    rating: parseFloat(averageRating.toFixed(2)),
    totalRatings: reviews.length
  });
};

// Class methods
Course.findPublished = function() {
  return this.findAll({ 
    where: { isPublished: true },
    order: [['createdAt', 'DESC']]
  });
};

Course.findByCategory = function(category) {
  return this.findAll({ 
    where: { category, isPublished: true },
    order: [['createdAt', 'DESC']]
  });
};

Course.findByInstructor = function(instructorId) {
  return this.findAll({ 
    where: { instructorId },
    order: [['createdAt', 'DESC']]
  });
};

module.exports = Course; 