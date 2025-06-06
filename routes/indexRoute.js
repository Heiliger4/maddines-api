const express = require("express");
const router = express.Router();

const authController = require("./controllers/authController");
const gymDetailsController = require("./controllers/gymDetailsController");
const planController = require("./controllers/planController");
const userController = require("./controllers/userController");

const errorHandler = (error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    success: false,
    message: "An error occurred",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

router.post("/login", authController.login);

router.get("/gym-details", authController.isAuthenticated, gymDetailsController.getGymDetails);
router.post("/gym-details", authController.isAuthenticated, authController.isAdmin, gymDetailsController.createGymDetail);
router.put("/gym-details/:id", authController.isAuthenticated, authController.isAdmin, gymDetailsController.updateGymDetail);
router.delete("/gym-details/:id", authController.isAuthenticated, authController.isAdmin, gymDetailsController.deleteGymDetail);

router.get("/plans", authController.isAuthenticated, planController.getAllPlans);
router.get("/plans/:id", authController.isAuthenticated, authController.isAdmin, planController.getPlanById);
router.post("/plans", authController.isAuthenticated, authController.isAdmin, planController.createPlan);
router.put("/plans/:id", authController.isAuthenticated, authController.isAdmin, planController.updatePlan);
router.delete("/plans/:id", authController.isAuthenticated, authController.isAdmin, planController.deletePlan);

router.get("/users", authController.isAuthenticated, authController.isAdmin, userController.getAllUsers);
router.get("/users/:id", authController.isAuthenticated, authController.isAdmin, userController.getUserById);
router.post("/users", authController.isAuthenticated, authController.isAdmin, userController.createUser);
router.put("/users/:id", authController.isAuthenticated, authController.isAdmin, userController.updateUser);
router.patch("/users/:id/toggle-status", authController.isAuthenticated, authController.isAdmin, userController.toggleUserStatus);
router.delete("/users/:id", authController.isAuthenticated, authController.isAdmin, userController.deleteUser);

router.use(errorHandler);

module.exports = router;