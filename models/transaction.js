// models/transaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');
const Plan = require('./plan');
const PaymentMethod = require('./paymentMethod');

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'plans',
      key: 'plan_id'
    },
    onDelete: 'CASCADE'
  },
  payment_method_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'payment_methods',
      key: 'payment_method_id'
    },
    onDelete: 'CASCADE'
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'transactions',
  timestamps: true
});

// Associations
Transaction.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Plan, { foreignKey: 'plan_id', onDelete: 'CASCADE' });
Transaction.belongsTo(PaymentMethod, { foreignKey: 'payment_method_id', onDelete: 'CASCADE' });

module.exports = Transaction;
