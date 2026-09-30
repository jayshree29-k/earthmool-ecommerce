const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

// ==========================================
// EARTHMOOL PRODUCTS
// ==========================================

const products = [
  {
    name: "Garam Masala",
    slug: "garam-masala",
    category: "Blended Spices",

    image: "/images/products/garam-masala.png",

    price: 199,
    comparePrice: 249,

    rating: 4.9,
    reviews: 128,

    badge: "Best Seller",

    description:
      "Aromatic and flavorful blend of premium Indian spices, carefully crafted to add rich depth and warmth to your everyday dishes.",

    ingredients: [
      "Coriander",
      "Cumin",
      "Black Pepper",
      "Cardamom",
      "Cinnamon",
      "Cloves",
    ],

    benefits: [
      "Rich aromatic flavor",
      "Made from premium spices",
      "Perfect for everyday cooking",
      "Authentic Indian taste",
    ],

    howToUse:
      "Add 1-2 teaspoons to curries, vegetables, rice, or other dishes according to taste.",

    storage:
      "Store in a cool, dry place away from direct sunlight. Keep the package tightly closed.",

    isActive: true,
  },

  {
    name: "Turmeric Powder",
    slug: "turmeric-powder",
    category: "Single Spices",

    image: "/images/products/turmeric.png",

    price: 149,
    comparePrice: 199,

    rating: 4.8,
    reviews: 96,

    badge: "Organic",

    description:
      "Pure and vibrant turmeric powder made from carefully selected turmeric roots, bringing natural color and earthy flavor to your cooking.",

    ingredients: [
      "100% Turmeric",
    ],

    benefits: [
      "Natural vibrant color",
      "Rich earthy flavor",
      "Made from quality turmeric",
      "Ideal for everyday cooking",
    ],

    howToUse:
      "Add according to your recipe to curries, vegetables, dals, rice, and other dishes.",

    storage:
      "Store in a cool, dry place away from moisture and direct sunlight.",

    isActive: true,
  },

  {
    name: "Red Chilli Powder",
    slug: "red-chilli-powder",
    category: "Single Spices",

    image: "/images/products/red-chilli.png",

    price: 179,
    comparePrice: 229,

    rating: 4.9,
    reviews: 210,

    badge: "Hot Sale",

    description:
      "Bold and vibrant red chilli powder that adds authentic color, aroma, and heat to your favorite Indian recipes.",

    ingredients: [
      "100% Red Chilli",
    ],

    benefits: [
      "Rich natural color",
      "Bold spicy flavor",
      "Carefully selected chillies",
      "Perfect for Indian recipes",
    ],

    howToUse:
      "Add according to your preferred level of heat in curries, marinades, vegetables, and snacks.",

    storage:
      "Store in a cool, dry place away from moisture and direct sunlight.",

    isActive: true,
  },

  {
    name: "Coriander Powder",
    slug: "coriander-powder",
    category: "Single Spices",

    image: "/images/products/coriander.png",

    price: 159,
    comparePrice: 199,

    rating: 4.7,
    reviews: 82,

    badge: "Fresh",

    description:
      "Freshly ground coriander powder with a naturally warm and citrusy aroma, perfect for enhancing everyday Indian dishes.",

    ingredients: [
      "100% Coriander Seeds",
    ],

    benefits: [
      "Fresh aromatic flavor",
      "Naturally rich aroma",
      "Ideal for Indian cooking",
      "Carefully ground spices",
    ],

    howToUse:
      "Add to curries, dals, vegetables, gravies, and spice blends according to taste.",

    storage:
      "Store in a cool, dry place away from moisture and direct sunlight.",

    isActive: true,
  },

  {
    name: "Khada Garam Masala",
    slug: "khada-garam-masala",
    category: "Whole Spices",

    image: "/images/products/khada-garam-masala.png",

    price: 249,
    comparePrice: 299,

    rating: 4.9,
    reviews: 156,

    badge: "Best Seller",

    description:
      "A premium selection of whole aromatic spices designed to bring authentic fragrance and depth to Indian cooking.",

    ingredients: [
      "Cinnamon",
      "Cardamom",
      "Cloves",
      "Black Pepper",
      "Bay Leaf",
      "Star Anise",
    ],

    benefits: [
      "Premium whole spices",
      "Rich natural aroma",
      "Authentic Indian flavor",
      "Perfect for slow cooking",
    ],

    howToUse:
      "Add whole spices while cooking rice, curries, biryani, pulao, and other dishes.",

    storage:
      "Store in a cool, dry place away from moisture and direct sunlight.",

    isActive: true,
  },
];

// ==========================================
// INSERT PRODUCTS
// ==========================================

const seedProducts = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB.");

    // Remove existing products
    await Product.deleteMany({});

    console.log("Existing products removed.");

    // Insert products
    const createdProducts = await Product.insertMany(products);

    console.log(
      `${createdProducts.length} products inserted successfully.`
    );

    process.exit(0);
  } catch (error) {
    console.error("Product seeding failed:", error.message);

    process.exit(1);
  }
};

seedProducts();