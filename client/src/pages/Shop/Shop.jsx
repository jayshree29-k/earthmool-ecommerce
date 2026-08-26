import { useMemo, useState } from "react";
import products from "../../components/home/Products/productData";
import ProductGrid from "../../components/home/Products/ProductGrid";
import ShopHero from "./ShopHero";
import ShopFilters from "./ShopFilters";
import ShopToolbar from "./ShopToolbar";

function Shop() {
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("default");

  const [filters, setFilters] = useState({
    category: "All",
    maxPrice: 1000,
    rating: 0,
  });

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setSearch("");

    setSort("default");

    setFilters({
      category: "All",
      maxPrice: 1000,
      rating: 0,
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category
    if (filters.category !== "All") {
      result = result.filter(
        (product) =>
          product.category === filters.category
      );
    }

    // Price
    result = result.filter(
      (product) =>
        product.price <= filters.maxPrice
    );

    // Rating
    result = result.filter(
      (product) =>
        product.rating >= filters.rating
    );

    // Sorting
    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        result.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      default:
        break;
    }

    return result;
  }, [search, sort, filters]);

  return (
    <main>
      <ShopHero />

      <section className="bg-[#FCFAF6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <ShopToolbar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            productCount={filteredProducts.length}
          />

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

            <ShopFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={clearFilters}
            />

            <div>
              {filteredProducts.length > 0 ? (
                <ProductGrid
                  products={filteredProducts}
                />
              ) : (
                <div className="rounded-2xl bg-white p-16 text-center">
                  <h2 className="text-2xl font-semibold">
                    No products found
                  </h2>

                  <p className="mt-3 text-gray-500">
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-full bg-green-700 px-6 py-3 font-medium text-white hover:bg-green-800"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Shop;