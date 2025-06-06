// models/gymImages.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GymImage = sequelize.define('GymImage', {
  image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  gym_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'gym_details',
      key: 'gym_id'
    },
    onDelete: 'CASCADE'
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'gym_images',
  timestamps: true
});

module.exports = GymImage;
