const express = require("express");

const {
  getProducts,
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} = require("../controllers/productController");
const {
  authenticateAdmin,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC PRODUCT ROUTES
// ==========================================

// GET /api/products
router.get("/", getProducts);

// GET /api/products/:slug
router.get("/:slug", getProduct);

// ADMIN PRODUCT ROUTES
// ==========================================

router.use(authenticateAdmin, requireAdmin);

// GET ALL PRODUCTS
// GET /api/products/admin/all
router.get(
  "/admin/all",
  getAllProducts
);

// CREATE PRODUCT
// POST /api/products
router.post(
  "/",
  createProduct
);

// UPDATE PRODUCT
// PUT /api/products/:id
router.put(
  "/:id",
  updateProduct
);

// DELETE PRODUCT
// DELETE /api/products/:id
router.delete(
  "/:id",
  deleteProduct
);

// TOGGLE STATUS
// PATCH /api/products/:id/status
router.patch(
  "/:id/status",
  toggleProductStatus
);

module.exports = router;