require('dotenv').config();
const jwt = require('jsonwebtoken');
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

    const token = jwt.sign(
      { user_id: user.user_id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        phone_number: user.phone_number,
        role: user.role_id === 1 ? "admin" : "user",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

exports.logout = (req, res) => {
  return res.json({ success: true, message: "Logged out" });
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.user_id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = {
      user_id: user.user_id,
      role_id: user.role_id,
      role: user.role_id === 1 ? "admin" : "user",
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
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
