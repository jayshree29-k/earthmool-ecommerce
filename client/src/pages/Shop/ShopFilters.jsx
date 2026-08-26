import { useState } from "react";

function ShopFilters({ filters, onFilterChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "All",
    "Blended Spices",
    "Whole Spices",
    "Single Spices",
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-left font-medium lg:hidden"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } rounded-2xl border border-gray-200 bg-white p-6 lg:block`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Filter Products
          </h2>

          <button
            type="button"
            onClick={onClear}
            className="text-sm text-green-700 hover:text-green-900"
          >
            Clear All
          </button>
        </div>

        {/* Category */}
        <div className="mt-8">
          <h3 className="font-medium">
            Categories
          </h3>

          <div className="mt-4 space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
              >
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() =>
                    onFilterChange("category", category)
                  }
                  className="accent-green-700"
                />

                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-8">
          <h3 className="font-medium">
            Maximum Price
          </h3>

          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={filters.maxPrice}
            onChange={(event) =>
              onFilterChange(
                "maxPrice",
                Number(event.target.value)
              )
            }
            className="mt-5 w-full accent-green-700"
          />

          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>₹0</span>
            <span>₹{filters.maxPrice}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-8">
          <h3 className="font-medium">
            Minimum Rating
          </h3>

          <select
            value={filters.rating}
            onChange={(event) =>
              onFilterChange(
                "rating",
                Number(event.target.value)
              )
            }
            className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2"
          >
            <option value="0">All Ratings</option>
            <option value="4">4★ & above</option>
            <option value="4.5">4.5★ & above</option>
            <option value="4.8">4.8★ & above</option>
          </select>
        </div>
      </aside>
    </>
  );
}

export default ShopFilters;