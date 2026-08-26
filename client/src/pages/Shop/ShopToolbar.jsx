import { Search } from "lucide-react";

function ShopToolbar({
  search,
  setSearch,
  sort,
  setSort,
  productCount,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {productCount}
        </span>{" "}
        products
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search spices..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-green-700 sm:w-64"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
          className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-700"
        >
          <option value="default">
            Sort By
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="rating">
            Highest Rated
          </option>

          <option value="name">
            Name: A-Z
          </option>
        </select>

      </div>
    </div>
  );
}

export default ShopToolbar;