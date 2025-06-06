// models/paymentMethod.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PaymentMethod = sequelize.define('PaymentMethod', {
  payment_method_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  method_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'payment_methods',
  timestamps: true
});

module.exports = PaymentMethod;
