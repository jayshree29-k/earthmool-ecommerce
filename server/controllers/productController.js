const Product = require("../models/Product");

// ==========================================
// GET ACTIVE PRODUCTS
// GET /api/products
// ==========================================

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch products.",
      error: error.message,
    });
  }
};

// ==========================================



// GET SINGLE ACTIVE PRODUCT
// GET /api/products/:slug
// ==========================================

const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch product.",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL PRODUCTS FOR ADMIN
// GET /api/products/admin/all
// ==========================================

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get all products error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch all products.",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE PRODUCT
// POST /api/products
// ==========================================

const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      image,
      price,
      comparePrice,
      stock,
      rating,
      reviews,
      badge,
      description,
      ingredients,
      benefits,
      howToUse,
      storage,
      isActive,
    } = req.body;

    // ========================================
    // REQUIRED FIELDS
    // ========================================

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required.",
      });
    }

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Product slug is required.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Product category is required.",
      });
    }

    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Product price is required.",
      });
    }

    // ========================================
    // CHECK SLUG
    // ========================================

    const existingProduct =
      await Product.findOne({ slug });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message:
          "A product with this slug already exists.",
      });
    }

    // ========================================
    // CREATE PRODUCT
    // ========================================

    const product = await Product.create({
      name,
      slug,
      category,
      image: image || "",
      price: Number(price),
      comparePrice:
        comparePrice !== undefined &&
        comparePrice !== ""
          ? Number(comparePrice)
          : Number(price),
      stock:
        stock !== undefined && stock !== ""
          ? Number(stock)
          : 0,
      rating:
        rating !== undefined && rating !== ""
          ? Number(rating)
          : 0,
      reviews:
        reviews !== undefined && reviews !== ""
          ? Number(reviews)
          : 0,
      badge: badge || "",
      description: description || "",
      ingredients: Array.isArray(ingredients)
        ? ingredients
        : [],
      benefits: Array.isArray(benefits)
        ? benefits
        : [],
      howToUse: howToUse || "",
      storage: storage || "",
      isActive:
        isActive !== undefined
          ? Boolean(isActive)
          : true,
    });

    // ========================================
    // RESPONSE
    // ========================================

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Create product error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to create product.",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE PRODUCT
// PUT /api/products/:id
// ==========================================

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update product.",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE PRODUCT
// DELETE /api/products/:id
// ==========================================

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete product error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to delete product.",
      error: error.message,
    });
  }
};

// ==========================================
// TOGGLE PRODUCT STATUS
// PATCH /api/products/:id/status
// ==========================================

const toggleProductStatus = async (
  req,
  res
) => {
  try {
    const productId = req.params.id;

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    product.isActive = !product.isActive;

    await product.save();

    res.status(200).json({
      success: true,
      message: product.isActive
        ? "Product activated successfully."
        : "Product deactivated successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Toggle product status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update product status.",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getProducts,
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
};