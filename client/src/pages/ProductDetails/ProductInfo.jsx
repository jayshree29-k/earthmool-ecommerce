import { Star, Heart, ShieldCheck } from "lucide-react";
import QuantitySelector from "./QuantitySelector";

function ProductInfo({ product }) {
  return (
    <div className="flex flex-col">

      {/* Badge */}
      {product.badge && (
        <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          {product.badge}
        </span>
      )}

      {/* Name */}
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

        <span className="font-medium text-gray-900">
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

        {product.comparePrice && (
          <span className="text-lg text-gray-400 line-through">
            ₹{product.comparePrice}
          </span>
        )}

        {product.comparePrice && (
          <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
            {Math.round(
              ((product.comparePrice - product.price) /
                product.comparePrice) *
                100
            )}
            % OFF
          </span>
        )}

      </div>

      {/* Description */}
      <p className="mt-6 leading-8 text-gray-600">
        Carefully selected premium spices packed to preserve
        their natural aroma, flavour, and freshness.
      </p>

      {/* Divider */}
      <div className="my-7 h-px bg-gray-200" />

      {/* Quantity */}
      <QuantitySelector />

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">

        <button
          type="button"
          className="flex-1 rounded-full bg-green-800 px-7 py-4 font-semibold text-white transition hover:bg-green-900"
        >
          Add to Cart
        </button>

        <button
          type="button"
          className="flex-1 rounded-full border-2 border-green-800 px-7 py-4 font-semibold text-green-800 transition hover:bg-green-800 hover:text-white"
        >
          Buy Now
        </button>

        <button
          type="button"
          aria-label="Add to wishlist"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:border-red-300 hover:text-red-500"
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