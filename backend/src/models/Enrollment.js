const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('enrolled', 'completed', 'dropped', 'pending'),
    defaultValue: 'enrolled'
  },
  enrolledAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  progress: {
    type: DataTypes.DECIMAL(5, 2), // percentage (0-100)
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 100
    }
  },
  lastAccessedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  certificateIssued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  certificateIssuedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  certificateUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  paymentAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reviewDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  indexes: [
    {
      fields: ['studentId']
    },
    {
      fields: ['courseId']
    },
    {
      fields: ['status']
    },
    {
      unique: true,
      fields: ['studentId', 'courseId']
    }
  ]
});

// Instance methods
Enrollment.prototype.updateProgress = async function() {
  const { Lesson } = require('./Lesson');
  const { LessonProgress } = require('./LessonProgress');
  
  const totalLessons = await Lesson.count({ 
    where: { courseId: this.courseId, isPublished: true } 
  });
  
  if (totalLessons === 0) {
    await this.update({ progress: 0 });
    return;
  }
  
  const completedLessons = await LessonProgress.count({
    where: { 
      enrollmentId: this.id,
      status: 'completed'
    }
  });
  
  const progressPercentage = (completedLessons / totalLessons) * 100;
  await this.update({ 
    progress: parseFloat(progressPercentage.toFixed(2)),
    lastAccessedAt: new Date()
  });
  
  // Auto-complete if progress is 100%
  if (progressPercentage >= 100 && this.status === 'enrolled') {
    await this.update({ 
      status: 'completed',
      completedAt: new Date()
    });
  }
};

Enrollment.prototype.issueCertificate = async function() {
  if (this.status === 'completed' && !this.certificateIssued) {
    const certificateUrl = `/certificates/${this.id}.pdf`; // Generate certificate logic here
    
    await this.update({
      certificateIssued: true,
      certificateIssuedAt: new Date(),
      certificateUrl
    });
  }
};

// Class methods
Enrollment.findByStudent = function(studentId) {
  return this.findAll({
    where: { studentId },
    order: [['enrolledAt', 'DESC']]
  });
};

Enrollment.findByCourse = function(courseId) {
  return this.findAll({
    where: { courseId },
    order: [['enrolledAt', 'ASC']]
  });
};

Enrollment.findActive = function(studentId) {
  return this.findAll({
    where: { 
      studentId,
      status: ['enrolled', 'pending']
    },
    order: [['lastAccessedAt', 'DESC']]
  });
};

Enrollment.findCompleted = function(studentId) {
  return this.findAll({
    where: { 
      studentId,
      status: 'completed'
    },
    order: [['completedAt', 'DESC']]
  });
};

module.exports = Enrollment; 