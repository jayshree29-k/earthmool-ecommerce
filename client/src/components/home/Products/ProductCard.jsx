import { Heart, ShoppingBag } from "lucide-react";
import ProductRating from "./ProductRating";

function ProductCard({ product }) {
    const discount = Math.round(
        ((product.comparePrice - product.price) /
            product.comparePrice) *
            100
    );
    return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative overflow-hidden bg-[#f7f3e8] p-4">
        <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition duration-500 sm:h-72 lg:h-80"
        />
   
      <div className="absolute left-4 top-4 flex flex-col gap-2">

        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            -{discount}%
        </span>

        <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
        </span>

        </div>

     <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:bg-red-500 hover:text-white">
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>

        <ProductRating rating={product.rating} reviews={product.reviews} />

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-gray-400 line-through">₹{product.comparePrice}</span>
        </div>

        <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800">
          <ShoppingBag size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;