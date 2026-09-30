import { useEffect, useMemo, useState } from "react";
import productImages from "../../components/home/Products/productImages";
import ProductGrid from "../../components/home/Products/ProductGrid";
import ShopHero from "./ShopHero";
import ShopFilters from "./ShopFilters";
import ShopToolbar from "./ShopToolbar";

function Shop() {
  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState("");

  // ==========================================
  // SORT
  // ==========================================

  const [sort, setSort] = useState("default");

  // ==========================================
  // FILTERS
  // ==========================================

  const [filters, setFilters] = useState({
    category: "All",
    maxPrice: 1000,
    rating: 0,
  });

  // ==========================================
  // FETCH PRODUCTS FROM BACKEND
  // ==========================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching products...");

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

const data = await response.json();

console.log("Products API response:", data);

const productsWithImages = (data.products || []).map(
  (product) => {
    const imageName = product.image.split("/").pop();

    return {
      ...product,
      image:
        productImages[imageName] || product.image,
    };
  }
);

setProducts(productsWithImages);
      } catch (error) {
        console.error("Product fetch error:", error);

        setError(
          error.message || "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==========================================
  // FILTER CHANGE
  // ==========================================

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");

    setSort("default");

    setFilters({
      category: "All",
      maxPrice: 1000,
      rating: 0,
    });
  };

  // ==========================================
  // FILTER + SORT PRODUCTS
  // ==========================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // ------------------------------------------
    // SEARCH
    // ------------------------------------------

    if (search.trim()) {
      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // ------------------------------------------
    // CATEGORY
    // ------------------------------------------

    if (filters.category !== "All") {
      result = result.filter(
        (product) =>
          product.category === filters.category
      );
    }

    // ------------------------------------------
    // PRICE
    // ------------------------------------------

    result = result.filter(
      (product) =>
        product.price <= filters.maxPrice
    );

    // ------------------------------------------
    // RATING
    // ------------------------------------------

    result = result.filter(
      (product) =>
        product.rating >= filters.rating
    );

    // ------------------------------------------
    // SORTING
    // ------------------------------------------

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
  }, [products, search, sort, filters]);

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFAF6]">
        <ShopHero />

        <section className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-700" />

            <p className="text-lg text-gray-600">
              Loading products...
            </p>
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#FCFAF6]">
        <ShopHero />

        <section className="flex min-h-[400px] items-center justify-center px-6">
          <div className="max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-red-600">
              Unable to load products
            </h2>

            <p className="mt-3 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
            >
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // SHOP
  // ==========================================

  return (
    <main>
      <ShopHero />

      <section className="bg-[#FCFAF6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ==================================
              TOOLBAR
          ================================== */}

          <ShopToolbar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            productCount={filteredProducts.length}
          />

          {/* ==================================
              SHOP CONTENT
          ================================== */}

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

            {/* ==================================
                FILTERS
            ================================== */}

            <ShopFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={clearFilters}
            />

            {/* ==================================
                PRODUCTS
            ================================== */}

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
                    className="mt-6 rounded-full bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
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