const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Lesson = sequelize.define('Lesson', {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('video', 'text', 'pdf', 'link', 'quiz'),
    defaultValue: 'text'
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  videoDuration: {
    type: DataTypes.INTEGER, // in seconds
    allowNull: true
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  externalLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id'
    }
  },
  moduleId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Modules',
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
  attachments: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    defaultValue: []
  },
  learningObjectives: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  prerequisites: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: []
  },
  estimatedDuration: {
    type: DataTypes.INTEGER, // in minutes
    defaultValue: 0
  },
  allowDownload: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  allowComments: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  indexes: [
    {
      fields: ['courseId']
    },
    {
      fields: ['moduleId']
    },
    {
      fields: ['instructorId']
    },
    {
      fields: ['order']
    }
  ]
});

// Instance methods
Lesson.prototype.getNextLesson = async function() {
  return await Lesson.findOne({
    where: {
      courseId: this.courseId,
      order: this.order + 1,
      isPublished: true
    },
    order: [['order', 'ASC']]
  });
};

Lesson.prototype.getPreviousLesson = async function() {
  return await Lesson.findOne({
    where: {
      courseId: this.courseId,
      order: this.order - 1,
      isPublished: true
    },
    order: [['order', 'DESC']]
  });
};

// Class methods
Lesson.findByCourse = function(courseId) {
  return this.findAll({
    where: { courseId, isPublished: true },
    order: [['order', 'ASC']]
  });
};

Lesson.findByModule = function(moduleId) {
  return this.findAll({
    where: { moduleId, isPublished: true },
    order: [['order', 'ASC']]
  });
};

module.exports = Lesson; 