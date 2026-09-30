const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // ==========================================
    // BASIC PRODUCT INFORMATION
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    // ==========================================
    // PRICE
    // ==========================================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    comparePrice: {
      type: Number,
      min: 0,
    },

    // ==========================================
    // INVENTORY
    // ==========================================

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ==========================================
    // PRODUCT RATING
    // ==========================================

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ==========================================
    // PRODUCT BADGE
    // ==========================================

    badge: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================================
    // PRODUCT DESCRIPTION
    // ==========================================

    description: {
      type: String,
      required: true,
    },

    // ==========================================
    // PRODUCT DETAILS
    // ==========================================

    ingredients: {
      type: [String],
      default: [],
    },

    benefits: {
      type: [String],
      default: [],
    },

    howToUse: {
      type: String,
      default: "",
    },

    storage: {
      type: String,
      default: "",
    },

    // ==========================================
    // PRODUCT STATUS
    // ==========================================

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

module.exports = Product;