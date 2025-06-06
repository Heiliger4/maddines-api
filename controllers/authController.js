const { User } = require("../models");

exports.login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    const user = await User.findOne({ where: { phone_number } });
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        phone_number: user.phone_number,
        role: user.role_id === 1 ? "admin" : "user",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = {
      user_id: user.id,
      role_id: user.role_id,
      role: user.role_id === 1 ? "admin" : "user",
    };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during authentication",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role_id !== 1) {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admins only",
    });
  }
  next();
};