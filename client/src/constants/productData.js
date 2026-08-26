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
  },
];

export default productData;