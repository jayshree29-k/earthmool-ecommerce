import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function PromoBannerContent() {
  return (
    <div className="px-6 py-10 sm:px-8 lg:px-16 lg:py-12">
      <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
        Premium Indian Spices
      </span>

      <h2 className="mt-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
        Bring Authentic Indian Flavours to Every Meal
      </h2>

      <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
        Made from carefully selected spices, Earthmool brings freshness,
        purity, and authentic taste to your kitchen.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          to="/shop"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800 sm:w-auto"
        >
          Shop Now
          <ArrowRight size={18} />
        </Link>

        <Link
          to="/about"
          className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 px-8 py-4 font-semibold transition hover:bg-white sm:w-auto"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default PromoBannerContent;