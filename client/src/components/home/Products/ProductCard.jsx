import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import ProductRating from "./ProductRating";
import { useCart } from "../../../context/CartContext";
import { getProductStock, getStockLabel } from "../../../utils/productStock";

function ProductCard({ product }) {
  const { addToCart, openCart } = useCart();
  const stock = getProductStock(product);

  // ==========================================
  // CALCULATE DISCOUNT
  // ==========================================

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) /
            product.comparePrice) *
            100
        )
      : 0;

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (event) => {
    // Prevent Link from opening
    event.preventDefault();
    event.stopPropagation();

    if (stock === 0) {
      return;
    }

    addToCart({
      ...product,
      quantity: 1,
    });

    openCart();
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* ======================================
          PRODUCT IMAGE
      ====================================== */}

      <Link
        to={`/product/${product.slug}`}
        className="block"
      >
        <div className="relative overflow-hidden bg-[#f7f3e8] p-4">

          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 lg:h-80"
          />

          {/* ==================================
              BADGES
          ================================== */}

          <div className="absolute left-4 top-4 flex flex-col gap-2">

            {discount > 0 && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                -{discount}%
              </span>
            )}

            {product.badge && (
              <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
                {product.badge}
              </span>
            )}

          </div>

        </div>
      </Link>

      {/* ======================================
          PRODUCT INFORMATION
      ====================================== */}

      <div className="flex flex-1 flex-col p-6">

        {/* Product Name */}

        <Link
          to={`/product/${product.slug}`}
          className="block"
        >
          <h3 className="text-xl font-semibold text-gray-900 transition hover:text-green-700">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}

        <ProductRating
          rating={product.rating}
          reviews={product.reviews}
        />

        {/* Price */}

        <div className="mt-4 flex items-center gap-3">

          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>

          {product.comparePrice &&
            product.comparePrice > product.price && (
              <span className="text-gray-400 line-through">
                ₹{product.comparePrice}
              </span>
            )}

        </div>

        <p
          className={`mt-3 text-sm font-medium ${
            stock === 0
              ? "text-red-600"
              : stock <= 5
                ? "text-amber-700"
                : "text-green-700"
          }`}
        >
          {getStockLabel(product)}
        </p>

        {/* ==================================
            ADD TO CART
        ================================== */}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={stock === 0}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300"
        >
          {stock === 0 ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingBag size={18} />
              Add to Cart
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default ProductCard;