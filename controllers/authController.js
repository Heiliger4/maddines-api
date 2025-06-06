const sessions = {};
const { User } = require("../models");
const crypto = require("crypto");

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

    const sessionToken = crypto.randomBytes(32).toString("hex");
    sessions[sessionToken] = user.id;

    // //
    // console.log({
    //   id: user.user_id,
    //   phone_number: user.phone_number,
    //   role: user.role_id === 1 ? "admin" : "user",
    // });
    // //


    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: sessionToken,
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
  const token = req.headers['authorization']?.split(' ')[1];
  if (token && sessions[token]) {
    delete sessions[token];
  }
  return res.json({ success: true, message: "Logged out" });
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }

    const sessionToken = token.split(" ")[1];
    const userId = sessions[sessionToken];

    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = {
      user_id: user.id,
      role_id: user.role_id,
      role: user.role_id === 1 ? "admin" : "user",
    };

    next();
  } catch (error) {
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