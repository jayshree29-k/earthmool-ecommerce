import { useState } from "react";

function ProductDescription({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    {
      id: "description",
      label: "Description",
    },
    {
      id: "ingredients",
      label: "Ingredients",
    },
    {
      id: "howToUse",
      label: "How to Use",
    },
    {
      id: "storage",
      label: "Storage",
    },
  ];

  return (
    <section className="bg-[#FCFAF6] py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}

        </div>

        {/* Content */}
        <div className="mt-8 rounded-2xl bg-white p-6 sm:p-10">

          {activeTab === "description" && (
            <div>
              <h2 className="text-2xl font-bold">
                About {product.name}
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div>
              <h2 className="text-2xl font-bold">
                Ingredients
              </h2>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.ingredients?.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="rounded-xl bg-[#F8F3EA] px-5 py-3 text-gray-700"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "howToUse" && (
            <div>
              <h2 className="text-2xl font-bold">
                How to Use
              </h2>

              <ol className="mt-5 space-y-4">
                {product.howToUse?.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-semibold text-white">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-gray-600">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "storage" && (
            <div>
              <h2 className="text-2xl font-bold">
                Storage Instructions
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                {product.storage}
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default ProductDescription;