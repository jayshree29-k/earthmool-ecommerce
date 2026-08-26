import { Link } from "react-router-dom";

function ShopHero() {
  return (
    <section className="bg-[#F8F3EA] py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-green-700">
            Home
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-900">
            Shop
          </span>
        </div>

        <p className="mt-10 text-sm font-semibold uppercase tracking-[3px] text-green-700">
          Earthmool Spices
        </p>

        <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          Authentic Flavours for Every Kitchen
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Explore our collection of premium Indian spices,
          carefully selected to bring authentic flavour to every meal.
        </p>

      </div>
    </section>
  );
}

export default ShopHero;