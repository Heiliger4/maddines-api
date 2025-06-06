const { sequelize } = require('../config/database');

exports.getStats = async (req, res, next) => {
  try {
    // Total revenue from all users' plans
    const [[totalRevenue]] = await sequelize.query(`
      SELECT COALESCE(SUM(p.price), 0) AS totalRevenue
      FROM users u
      JOIN plans p ON u.plan_id = p.plan_id
    `);

    // Revenue generated this month
    const [[revenueThisMonth]] = await sequelize.query(`
      SELECT COALESCE(SUM(p.price), 0) AS revenueThisMonth
      FROM users u
      JOIN plans p ON u.plan_id = p.plan_id
      WHERE MONTH(u.createdAt) = MONTH(CURRENT_DATE())
        AND YEAR(u.createdAt) = YEAR(CURRENT_DATE())
    `);

    // Total number of registered members
    const [[totalMembers]] = await sequelize.query(`
      SELECT COUNT(*) AS totalMembers FROM users
    `);

    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue.totalRevenue,
        revenueThisMonth: revenueThisMonth.revenueThisMonth,
        totalMembers: totalMembers.totalMembers,
      },
    });
  } catch (error) {
    next(error);
  }
};
