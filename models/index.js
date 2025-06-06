const { sequelize } = require("../config/database");

// Import all models
const User = require("./user");
const GymDetails = require("./gymDetails");
const GymImages = require("./gymImages");
const Plan = require("./plan");
const PaymentMethod = require("./paymentMethod");
const Role = require("./role");
const Transaction = require("./transaction");

// --------------------
// Associations
// --------------------

// One GymDetails has many GymImages
GymDetails.hasMany(GymImages, {
  foreignKey: "gym_id",
  as: "images",
  onDelete: "CASCADE",
});
GymImages.belongsTo(GymDetails, { foreignKey: "gym_id", as: "gym" });

// One Role has many Users, User belongs to one Role
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
  onDelete: "SET NULL",
});
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });

// One Plan has many Users (optional), User belongs to one Plan (nullable)
Plan.hasMany(User, {
  foreignKey: "plan_id",
  as: "users",
  onDelete: "SET NULL",
});
User.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

// One User has many Transactions
User.hasMany(Transaction, {
  foreignKey: "userId",
  as: "transactions",
  onDelete: "CASCADE",
});
Transaction.belongsTo(User, { foreignKey: "userId", as: "user" });

// One Plan has many Transactions
Plan.hasMany(Transaction, {
  foreignKey: "plan_id",
  as: "transactions",
  onDelete: "CASCADE",
});
Transaction.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

// One PaymentMethod has many Transactions
PaymentMethod.hasMany(Transaction, {
  foreignKey: "paymentMethodId",
  as: "transactions",
  onDelete: "CASCADE",
});
Transaction.belongsTo(PaymentMethod, {
  foreignKey: "paymentMethodId",
  as: "paymentMethod",
});

// --------------------
// Export models and sequelize instance
// --------------------
const models = {
  User,
  GymDetails,
  GymImages,
  Plan,
  PaymentMethod,
  Role,
  Transaction,
};

module.exports = {
  sequelize,
  ...models,
};
