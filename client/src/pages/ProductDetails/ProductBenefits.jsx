import {
  Leaf,
  Sparkles,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

function ProductBenefits({ product }) {
  const icons = [
    Leaf,
    Sparkles,
    ShieldCheck,
    PackageCheck,
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">
            Why Earthmool
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Made for Authentic Flavour
          </h2>

        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {product.benefits?.map((benefit, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={benefit}
                className="rounded-2xl border border-gray-100 bg-[#FCFAF6] p-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Icon size={24} />
                </div>

                <p className="mt-5 font-semibold text-gray-900">
                  {benefit}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default ProductBenefits;