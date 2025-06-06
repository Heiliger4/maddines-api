// models/gymDetails.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const GymImage = require('./gymImages');

const GymDetail = sequelize.define('GymDetail', {
  gym_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  working_hours: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'gym_details',
  timestamps: true
});

GymDetail.hasMany(GymImage, { foreignKey: 'gym_id' });
GymImage.belongsTo(GymDetail, { foreignKey: 'gym_id' });

module.exports = GymDetail;
