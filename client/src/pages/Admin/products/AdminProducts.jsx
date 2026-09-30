import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Power,
  RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";
import { adminFetch } from "../../../services/adminApi";

const API_URL = "http://localhost:5000/api/products";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminFetch(
        `${API_URL}/admin/all`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load products."
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("Fetch products error:", error);

      setError(
        error.message || "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await adminFetch(
        `${API_URL}/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to delete product."
        );
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) =>
            product._id !== productId
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete product."
      );
    }
  };

  // ==========================================
  // TOGGLE STATUS
  // ==========================================

  const handleToggleStatus = async (
    product
  ) => {
    try {
      const response = await adminFetch(
        `${API_URL}/${product._id}/status`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update product status."
        );
      }

      setProducts((previousProducts) =>
        previousProducts.map((item) =>
          item._id === product._id
            ? {
                ...item,
                isActive: data.product.isActive,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      alert(
        error.message ||
          "Unable to update product status."
      );
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredProducts = products.filter(
    (product) => {
      const value = search
        .trim()
        .toLowerCase();

      if (!value) {
        return true;
      }

      return (
        product.name
          ?.toLowerCase()
          .includes(value) ||
        product.category
          ?.toLowerCase()
          .includes(value) ||
        product.slug
          ?.toLowerCase()
          .includes(value)
      );
    }
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F5EF] p-6">

        <div className="flex min-h-[60vh] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#DDE8D7] border-t-[#274E13]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading products...
            </p>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-medium text-[#274E13]">
              Earthmool Admin
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#163824]">
              Products
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your Earthmool products.
            </p>

          </div>

            <Link
            to="/admin/products/add"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#274E13] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163824]"
            >
            <Plus size={18} />
            Add Product
            </Link>

        </div>

        {/* ======================================
            SEARCH + REFRESH
        ====================================== */}

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#E8E1D5] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full max-w-xl">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#274E13]"
            />

          </div>

          <button
            type="button"
            onClick={fetchProducts}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-[#163824] hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ======================================
            PRODUCT TABLE
        ====================================== */}

        <div className="mt-6 overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white shadow-sm">

          {filteredProducts.length === 0 ? (

            <div className="p-12 text-center">

              <h2 className="text-lg font-semibold text-[#163824]">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try a different search.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>

                  <tr className="border-b border-gray-100 bg-[#FCFAF6] text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Rating
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredProducts.map(
                    (product) => (
                      <tr
                        key={product._id}
                        className="border-b border-gray-100 last:border-0 hover:bg-[#FCFAF6]"
                      >

                        {/* PRODUCT */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F7F3E8]">

                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />

                            </div>

                            <div>

                              <p className="font-semibold text-[#163824]">
                                {product.name}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {product.slug}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* CATEGORY */}

                        <td className="px-6 py-5">

                          <span className="rounded-full bg-[#F5F0E7] px-3 py-1 text-xs font-semibold text-[#163824]">
                            {product.category}
                          </span>

                        </td>

                        {/* PRICE */}

                        <td className="px-6 py-5">

                          <p className="font-semibold text-[#274E13]">
                            ₹
                            {Number(
                              product.price || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          {product.comparePrice && (
                            <p className="text-xs text-gray-400 line-through">
                              ₹
                              {Number(
                                product.comparePrice
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          )}
                        
                        </td>

                        {/* STOCK */}

<td className="px-6 py-5">

  {Number(product.stock || 0) === 0 ? (
    <div>
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Out of Stock
      </span>

      <p className="mt-2 text-xs text-gray-500">
        0 units
      </p>
    </div>
  ) : Number(product.stock) <= 5 ? (
    <div>
      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
        Low Stock
      </span>

      <p className="mt-2 text-xs font-medium text-gray-600">
        {product.stock} units
      </p>
    </div>
  ) : (
    <div>
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        In Stock
      </span>

      <p className="mt-2 text-xs font-medium text-gray-600">
        {product.stock} units
      </p>
    </div>
  )}

</td>

                        {/* RATING */}

                        <td className="px-6 py-5">

                          <span className="text-sm font-medium">
                            ⭐ {product.rating || 0}
                          </span>

                          <p className="mt-1 text-xs text-gray-500">
                            {product.reviews || 0}{" "}
                            reviews
                          </p>

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(
                                product
                              )
                            }
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              product.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.isActive
                              ? "Active"
                              : "Inactive"}
                          </button>

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/admin/products/edit/${product._id}`}
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100"
                              title="Edit product"
                            >
                              <Pencil size={16} />
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                handleToggleStatus(
                                  product
                                )
                              }
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100"
                              title={
                                product.isActive
                                  ? "Deactivate"
                                  : "Activate"
                              }
                            >
                              <Power size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  product._id
                                )
                              }
                              className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50"
                              title="Delete product"
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}

export default AdminProducts;