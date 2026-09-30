import { useState } from "react";
import { Star, Heart, ShieldCheck } from "lucide-react";

import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import { getProductStock, getStockLabel } from "../../utils/productStock";

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const stock = getProductStock(product);

  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    if (stock === 0) {
      return;
    }

    addToCart(product, quantity);
    openCart();
  };

  return (
    <div className="flex flex-col">

      {product.badge && (
        <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          {product.badge}
        </span>
      )}

      <h1 className="mt-5 text-4xl font-bold text-gray-900 sm:text-5xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-5 flex items-center gap-3">

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={18}
              fill="#C28A32"
              color="#C28A32"
            />
          ))}
        </div>

        <span className="font-medium">
          {product.rating}
        </span>

        <span className="text-gray-500">
          ({product.reviews} Reviews)
        </span>

      </div>

      {/* Price */}
      <div className="mt-6 flex items-center gap-4">

        <span className="text-3xl font-bold text-green-800">
          ₹{product.price}
        </span>

        <span className="text-lg text-gray-400 line-through">
          ₹{product.comparePrice}
        </span>

      </div>

      <p
        className={`mt-4 text-sm font-semibold ${
          stock === 0
            ? "text-red-600"
            : stock <= 5
              ? "text-amber-700"
              : "text-green-700"
        }`}
      >
        {getStockLabel(product)}
      </p>

      {/* Description */}
      <p className="mt-6 leading-8 text-gray-600">
        {product.description}
      </p>

      <div className="my-7 h-px bg-gray-200" />

      {/* Quantity */}
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        stock={stock}
      />

      {/* Buttons */}
      <div className="mt-6 flex gap-3">

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={stock === 0}
          className="flex-1 rounded-full bg-green-800 px-7 py-4 font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300"
        >
          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>

        <button
          type="button"
          className="flex-1 rounded-full border-2 border-green-800 px-7 py-4 font-semibold text-green-800 transition hover:bg-green-800 hover:text-white"
        >
          Buy Now
        </button>

        <button
          type="button"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:text-red-500"
          aria-label="Add to wishlist"
        >
          <Heart size={21} />
        </button>

      </div>

      {/* Trust */}
      <div className="mt-8 rounded-2xl bg-white p-5">

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={22}
            className="text-green-700"
          />

          <div>
            <p className="font-semibold">
              Quality You Can Trust
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Carefully packed to preserve freshness.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ProductInfo;