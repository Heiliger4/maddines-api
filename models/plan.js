const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Plan = sequelize.define('Plan', {
  plan_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  days_span: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  features_desc: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'plans', // Matches the SQL table name exactly
  timestamps: true     // createdAt and updatedAt columns (optional)
});

module.exports = Plan;
