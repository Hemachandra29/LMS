const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Quiz = sequelize.define('Quiz', {
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
    allowNull: true
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id'
    }
  },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Lessons',
      key: 'id'
    }
  },
  instructorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  timeLimit: {
    type: DataTypes.INTEGER, // in minutes, 0 = no limit
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  passingScore: {
    type: DataTypes.INTEGER, // percentage
    defaultValue: 70,
    validate: {
      min: 0,
      max: 100
    }
  },
  maxAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isRandomized: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  showCorrectAnswers: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  showResults: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  allowReview: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  totalQuestions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  indexes: [
    {
      fields: ['courseId']
    },
    {
      fields: ['lessonId']
    },
    {
      fields: ['instructorId']
    },
    {
      fields: ['isPublished']
    }
  ]
});

// Instance methods
Quiz.prototype.updateStats = async function() {
  const { Question } = require('./Question');
  
  const questions = await Question.findAll({ where: { quizId: this.id } });
  const totalQuestions = questions.length;
  const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);
  
  await this.update({
    totalQuestions,
    totalPoints
  });
};

Quiz.prototype.isAvailable = function() {
  const now = new Date();
  
  if (!this.isPublished) return false;
  if (this.startDate && now < this.startDate) return false;
  if (this.endDate && now > this.endDate) return false;
  
  return true;
};

// Class methods
Quiz.findByCourse = function(courseId) {
  return this.findAll({
    where: { courseId, isPublished: true },
    order: [['createdAt', 'ASC']]
  });
};

Quiz.findByLesson = function(lessonId) {
  return this.findAll({
    where: { lessonId, isPublished: true },
    order: [['createdAt', 'ASC']]
  });
};

module.exports = Quiz; 