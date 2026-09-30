import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { adminFetch } from "../../../services/adminApi";

const API_URL = "http://localhost:5000/api/products";

const initialForm = {
  name: "",
  slug: "",
  category: "",
  image: "",
  price: "",
  comparePrice: "",
  rating: "0",
  reviews: "0",
  badge: "",
  description: "",
  ingredients: "",
  benefits: "",
  howToUse: "",
  storage: "",
  stock: "0",
  isActive: true,
};

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        /*
          We are using the product ID from the URL.

          Your existing GET API uses slug:
          GET /api/products/:slug

          Therefore we first need to get all products
          and find the product by _id.
        */

        const response = await adminFetch(API_URL);

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to load product."
          );
        }

        const product = data.products.find(
          (item) => item._id === id
        );

        if (!product) {
          throw new Error(
            "Product not found."
          );
        }

        setForm({
          name: product.name || "",

          slug: product.slug || "",

          category: product.category || "",

          image: product.image || "",

          price:
            product.price !== undefined
              ? String(product.price)
              : "",

          comparePrice:
            product.comparePrice !== undefined
              ? String(product.comparePrice)
              : "",

          rating:
            product.rating !== undefined
              ? String(product.rating)
              : "0",

          reviews:
            product.reviews !== undefined
              ? String(product.reviews)
              : "0",

          badge: product.badge || "",

          description:
            product.description || "",

          ingredients:
            Array.isArray(product.ingredients)
              ? product.ingredients.join("\n")
              : "",

          benefits:
            Array.isArray(product.benefits)
              ? product.benefits.join("\n")
              : "",

          howToUse:
            product.howToUse || "",

          storage:
            product.storage || "",

          // STOCK
          stock:
            product.stock !== undefined
              ? String(product.stock)
              : "0",

          isActive:
            product.isActive !== false,
        });
      } catch (error) {
        console.error(
          "Fetch product error:",
          error
        );

        setError(
          error.message ||
            "Unable to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // NAME CHANGE
  // ==========================================

  const handleNameChange = (event) => {
    const name = event.target.value;

    setForm((previous) => ({
      ...previous,
      name,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      // Convert ingredients textarea
      // into an array

      const ingredients = form.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      // Convert benefits textarea
      // into an array

      const benefits = form.benefits
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      // Validate stock

      const stock = Number(form.stock);

      if (!Number.isFinite(stock) || stock < 0) {
        throw new Error(
          "Stock quantity must be 0 or greater."
        );
      }

      const updatedProduct = {
        name: form.name.trim(),

        slug: form.slug.trim(),

        category:
          form.category.trim(),

        image:
          form.image.trim(),

        price:
          Number(form.price),

        comparePrice:
          form.comparePrice !== ""
            ? Number(form.comparePrice)
            : Number(form.price),

        rating:
          Number(form.rating) || 0,

        reviews:
          Number(form.reviews) || 0,

        badge:
          form.badge.trim(),

        description:
          form.description.trim(),

        ingredients,

        benefits,

        howToUse:
          form.howToUse.trim(),

        storage:
          form.storage.trim(),

        // STOCK
        stock,

        isActive:
          form.isActive,
      };

      // ======================================
      // UPDATE PRODUCT
      // ======================================

      const response = await adminFetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            updatedProduct
          ),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update product."
        );
      }

      alert(
        "Product updated successfully."
      );

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      setError(
        error.message ||
          "Unable to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F5EF] p-6">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Loader2
              size={40}
              className="mx-auto animate-spin text-[#274E13]"
            />

            <p className="mt-4 text-sm text-gray-500">
              Loading product...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F7F5EF] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="mb-8">

          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#274E13]"
          >
            <ArrowLeft size={16} />

            Back to Products
          </Link>

          <div className="mt-5">

            <p className="text-sm font-medium text-[#274E13]">
              Earthmool Admin
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#163824]">
              Edit Product
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Update your product information.
            </p>

          </div>

        </div>

        {/* ====================================
            ERROR
        ==================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ====================================
            FORM
        ==================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ==================================
              BASIC INFORMATION
          ================================== */}

          <section className="rounded-2xl border border-[#E8E1D5] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#163824]">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={
                    handleNameChange
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />
              </div>

              {/* SLUG */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Slug *
                </label>

                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Example: garam-masala
                </p>
              </div>

              {/* CATEGORY */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category *
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Single Spices">
                    Single Spices
                  </option>

                  <option value="Whole Spices">
                    Whole Spices
                  </option>

                  <option value="Blended Spices">
                    Blended Spices
                  </option>
                </select>
              </div>

              {/* BADGE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Badge
                </label>

                <input
                  type="text"
                  name="badge"
                  value={form.badge}
                  onChange={handleChange}
                  placeholder="Best Seller"
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />
              </div>

            </div>

          </section>

          {/* ==================================
              PRICING
          ================================== */}

          <section className="rounded-2xl border border-[#E8E1D5] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#163824]">
              Pricing & Inventory
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {/* PRICE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price *
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />
              </div>

              {/* COMPARE PRICE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Compare Price
                </label>

                <input
                  type="number"
                  name="comparePrice"
                  value={form.comparePrice}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />
              </div>

              {/* RATING */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Rating
                </label>

                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />
              </div>

              {/* STOCK */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Stock Quantity *
                </label>

                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  required
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Number of units currently available.
                </p>
              </div>

            </div>

          </section>

          {/* ==================================
              IMAGE
          ================================== */}

          <section className="rounded-2xl border border-[#E8E1D5] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#163824]">
              Product Image
            </h2>

            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Image Path / URL
              </label>

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/products/garam-masala.png"
                className="w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
              />

              {/* IMAGE PREVIEW */}

              {form.image && (
                <div className="mt-5">

                  <p className="mb-2 text-xs font-medium text-gray-500">
                    Image Preview
                  </p>

                  <div className="h-40 w-40 overflow-hidden rounded-xl bg-[#F7F3E8]">

                    <img
                      src={form.image}
                      alt={form.name}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />

                  </div>

                </div>
              )}

            </div>

          </section>

          {/* ==================================
              DESCRIPTION
          ================================== */}

          <section className="rounded-2xl border border-[#E8E1D5] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#163824]">
              Product Details
            </h2>

            <div className="mt-6 space-y-5">

              {/* DESCRIPTION */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />
              </div>

              {/* INGREDIENTS */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Ingredients
                </label>

                <textarea
                  name="ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  rows="5"
                  placeholder={`Coriander
Cumin
Black Pepper
Cardamom`}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Enter one ingredient per line.
                </p>
              </div>

              {/* BENEFITS */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Benefits
                </label>

                <textarea
                  name="benefits"
                  value={form.benefits}
                  onChange={handleChange}
                  rows="5"
                  placeholder={`Rich aromatic flavor
Made from premium spices
Perfect for everyday cooking`}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Enter one benefit per line.
                </p>
              </div>

              {/* HOW TO USE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  How To Use
                </label>

                <textarea
                  name="howToUse"
                  value={form.howToUse}
                  onChange={handleChange}
                  rows="4"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />
              </div>

              {/* STORAGE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Storage
                </label>

                <textarea
                  name="storage"
                  value={form.storage}
                  onChange={handleChange}
                  rows="3"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 text-sm outline-none transition focus:border-[#274E13]"
                />
              </div>

            </div>

          </section>

          {/* ==================================
              STATUS
          ================================== */}

          <section className="rounded-2xl border border-[#E8E1D5] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#163824]">
              Product Status
            </h2>

            <label className="mt-5 flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-5 w-5 accent-[#274E13]"
              />

              <div>

                <p className="text-sm font-semibold text-gray-800">
                  Active Product
                </p>

                <p className="text-xs text-gray-500">
                  Active products will appear in
                  the shop.
                </p>

              </div>

            </label>

          </section>

          {/* ==================================
              BUTTONS
          ================================== */}

          <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">

            <Link
              to="/admin/products"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#274E13] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163824] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Updating...
                </>
              ) : (
                <>
                  <Save size={17} />

                  Update Product
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}

export default EditProduct;