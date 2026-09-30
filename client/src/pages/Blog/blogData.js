import { BookOpen, Leaf, Sparkles } from "lucide-react";
import cuminImage from "../../assets/images/spices/cumin.jpg";
import farmerImage from "../../assets/images/farmer/farmer.avif";
import dalImage from "../../assets/images/recipes/dal-tadka.jpg";

const posts = [
  {
    title: "How to build a balanced Indian spice box",
    category: "Kitchen notes",
    date: "September 12, 2026",
    image: cuminImage,
    icon: Leaf,
    slug: "balanced-indian-spice-box",
    text: "The everyday whole and ground spices that help you cook with confidence.",
  },
  {
    title: "Why freshly packed spices taste different",
    category: "Our process",
    date: "August 28, 2026",
    image: farmerImage,
    icon: Sparkles,
    slug: "freshly-packed-spices",
    text: "From careful sourcing to the final seal, freshness is a chain of small decisions.",
  },
  {
    title: "Three ways to make weeknight dal special",
    category: "Cooking ideas",
    date: "August 10, 2026",
    image: dalImage,
    icon: BookOpen,
    slug: "weeknight-dal-special",
    text: "A few aromatic finishing touches can turn a simple staple into the best part of dinner.",
  },
];

export default posts;