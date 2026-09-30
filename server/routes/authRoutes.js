const express = require("express");
const {
  getCurrentAdmin,
  loginAdmin,
} = require("../controllers/authController");
const {
  authenticateAdmin,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/me", authenticateAdmin, requireAdmin, getCurrentAdmin);

module.exports = router;
