import garamMasala from "../assets/images/products/garam-masala.png";
import turmeric from "../assets/images/products/turmeric.png";
import chilli from "../assets/images/products/red-chilli.png";
import coriander from "../assets/images/products/coriander.png";
import khadagram from "../assets/images/products/khada-garam-masala.png";

const productData = [
  {
    id: 1,

    name: "Garam Masala",

    slug: "garam-masala",

    category: "Blended Spices",

    image: garamMasala,

    price: 199,

    comparePrice: 249,

    rating: 4.9,

    reviews: 128,

    badge: "Best Seller",

    description:
      "Earthmool Garam Masala is a premium blend of carefully selected Indian spices. It adds a rich aroma, warm flavour, and authentic taste to curries, vegetables, dals, and other traditional dishes.",

    ingredients: [
      "Coriander",
      "Cumin",
      "Black Pepper",
      "Cardamom",
      "Cinnamon",
      "Cloves",
    ],

    benefits: [
      "Rich and authentic flavour",
      "Premium hand-selected spices",
      "Freshly packed for maximum aroma",
      "No artificial colours",
    ],

    howToUse: [
      "Add Garam Masala towards the end of cooking.",
      "Use in curries, vegetables, dals, and gravies.",
      "Add according to your preferred taste.",
      "Keep the pack tightly sealed after use.",
    ],

    storage:
      "Store in a cool, dry place away from direct sunlight. Keep the pack tightly sealed after opening to preserve freshness and aroma.",
  },

  {
    id: 2,

    name: "Turmeric Powder",

    slug: "turmeric-powder",

    category: "Single Spices",

    image: turmeric,

    price: 149,

    comparePrice: 199,

    rating: 4.8,

    reviews: 96,

    badge: "Organic",

    description:
      "Earthmool Turmeric Powder is made from carefully selected turmeric to provide natural colour, flavour, and aroma to your everyday cooking.",

    ingredients: [
      "Pure Turmeric",
    ],

    benefits: [
      "Natural golden colour",
      "Fresh and aromatic",
      "Carefully selected turmeric",
      "No artificial colours",
    ],

    howToUse: [
      "Add while preparing curries and vegetables.",
      "Use in dals, soups, and traditional dishes.",
      "Add according to your recipe.",
      "Store properly after use.",
    ],

    storage:
      "Store in a cool and dry place away from direct sunlight. Keep the pack sealed tightly after opening.",
  },

  {
    id: 3,

    name: "Red Chilli Powder",

    slug: "red-chilli-powder",

    category: "Single Spices",

    image: chilli,

    price: 179,

    comparePrice: 229,

    rating: 4.9,

    reviews: 210,

    badge: "Hot Sale",

    description:
      "Earthmool Red Chilli Powder is made from carefully selected red chillies to bring vibrant colour and bold flavour to your favourite dishes.",

    ingredients: [
      "Pure Red Chillies",
    ],

    benefits: [
      "Rich natural colour",
      "Bold and authentic flavour",
      "Freshly ground spices",
      "No artificial colours",
    ],

    howToUse: [
      "Add according to your preferred spice level.",
      "Use in curries, gravies, and vegetables.",
      "Mix with other spices while cooking.",
      "Store properly after opening.",
    ],

    storage:
      "Store in a cool, dry place away from direct sunlight. Keep the pack tightly sealed to maintain freshness.",
  },

  {
    id: 4,

    name: "Coriander Powder",

    slug: "coriander-powder",

    category: "Single Spices",

    image: coriander,

    price: 159,

    comparePrice: 199,

    rating: 4.7,

    reviews: 82,

    badge: "Fresh",

    description:
      "Earthmool Coriander Powder is made from carefully selected coriander seeds and delivers a fresh aroma and mild authentic flavour to everyday meals.",

    ingredients: [
      "Pure Coriander Seeds",
    ],

    benefits: [
      "Fresh natural aroma",
      "Authentic mild flavour",
      "Carefully selected coriander",
      "Freshly packed",
    ],

    howToUse: [
      "Add while preparing curries and gravies.",
      "Use in vegetable and dal recipes.",
      "Mix with other spices according to your recipe.",
      "Store properly after use.",
    ],

    storage:
      "Store in a cool, dry place away from sunlight. Keep the pack sealed tightly after opening.",
  },

  {
    id: 5,

    name: "Khada Garam Masala",

    slug: "khada-garam-masala",

    category: "Whole Spices",

    image: khadagram,

    price: 249,

    comparePrice: 299,

    rating: 4.9,

    reviews: 156,

    badge: "Best Seller",

    description:
      "Earthmool Khada Garam Masala is a carefully selected blend of whole spices that delivers a deep aroma and authentic flavour to traditional Indian dishes.",

    ingredients: [
      "Cinnamon",
      "Green Cardamom",
      "Black Cardamom",
      "Cloves",
      "Black Pepper",
      "Bay Leaves",
    ],

    benefits: [
      "Premium whole spices",
      "Rich traditional aroma",
      "Authentic Indian flavour",
      "Freshly packed for maximum freshness",
    ],

    howToUse: [
      "Add whole spices at the beginning of cooking.",
      "Allow the spices to release their natural aroma.",
      "Use in biryani, pulao, curries, and gravies.",
      "Store the pack properly after use.",
    ],

    storage:
      "Store in a cool, dry place away from moisture and direct sunlight. Keep the pack tightly sealed after opening.",
  },
];

export default productData;