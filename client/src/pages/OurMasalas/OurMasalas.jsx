import { Link } from "react-router-dom";

import ProductCard from "../../components/home/Products/ProductCard";
import productData from "../../constants/productData";

function OurMasalas() {
  return (
    <main className="bg-[#FCFAF6]">
      <section className="bg-[#173D28] px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-[#E2B35D]">
            From our kitchen to yours
          </p>
          <h1 className="mt-5 text-4xl font-bold sm:text-6xl">Our Masalas</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-50">
            Thoughtfully blended and freshly packed spices that make everyday cooking taste like home.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">The Earthmool collection</p>
            <h2 className="mt-3 text-3xl font-bold text-[#163824] sm:text-4xl">A better starting point for every meal</h2>
          </div>
          <Link to="/shop" className="font-semibold text-green-700 hover:text-green-900">Browse the full shop <span aria-hidden="true">-&gt;</span></Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {productData.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="border-t border-[#eadfce] bg-[#FFF8F1] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 text-center sm:grid-cols-3">
          <div><p className="text-3xl font-bold text-[#163824]">100%</p><p className="mt-2 text-gray-600">Honest ingredients</p></div>
          <div><p className="text-3xl font-bold text-[#163824]">Small batch</p><p className="mt-2 text-gray-600">Packed for freshness</p></div>
          <div><p className="text-3xl font-bold text-[#163824]">No shortcuts</p><p className="mt-2 text-gray-600">Just real flavour</p></div>
        </div>
      </section>
    </main>
  );
}

export default OurMasalas;
