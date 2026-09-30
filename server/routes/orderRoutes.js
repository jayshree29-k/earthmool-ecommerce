const express = require("express");

const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
} = require("../controllers/orderController");
const {
  authenticateAdmin,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

router.post("/", createOrder);

router.use(authenticateAdmin, requireAdmin);

// ==========================================
// GET ALL ORDERS
// GET /api/orders
// ==========================================

router.get("/", getOrders);

// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:id
// ==========================================

router.get("/:id", getOrder);

// ==========================================
// UPDATE ORDER STATUS
// PATCH /api/orders/:id/status
// ==========================================

router.patch(
  "/:id/status",
  updateOrderStatus
);

// ==========================================
// UPDATE PAYMENT STATUS
// PATCH /api/orders/:id/payment-status
// ==========================================

router.patch(
  "/:id/payment-status",
  updatePaymentStatus
);

// ==========================================
// DELETE ORDER
// DELETE /api/orders/:id
// ==========================================

router.delete(
  "/:id",
  deleteOrder
);

module.exports = router;