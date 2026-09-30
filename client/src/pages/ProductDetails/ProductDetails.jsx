import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductBenefits from "./ProductBenefits";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";

import RelatedProducts from "../../components/home/Products/RelatedProducts";

import productImages from "../../components/home/Products/productImages";

function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PRODUCT FROM MONGODB API
  // ==========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching product:", slug);

        const response = await fetch(
          `http://localhost:5000/api/products/${slug}`
        );

        console.log(
          "Product API status:",
          response.status
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found.");
          }

          throw new Error(
            `Unable to fetch product. Status: ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "Product API response:",
          data
        );

        if (!data.success || !data.product) {
          throw new Error("Product not found.");
        }

        // ==========================================
        // CONVERT DATABASE IMAGE PATH
        // TO REACT IMAGE
        // ==========================================

        const imageName = data.product.image
          ?.split("/")
          .pop();

        const productWithImage = {
          ...data.product,

          image:
            productImages[imageName] ||
            data.product.image,
        };

        setProduct(productWithImage);
      } catch (error) {
        console.error(
          "Product fetch error:",
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

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-[#FCFAF6] flex items-center justify-center px-4">

        <div className="text-center">

          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-700" />

          <p className="text-gray-600">
            Loading product...
          </p>

        </div>

      </main>
    );
  }

  // ==========================================
  // ERROR / PRODUCT NOT FOUND
  // ==========================================

  if (error || !product) {
    return (
      <main className="min-h-[60vh] bg-[#FCFAF6] px-4 py-24">

        <div className="mx-auto max-w-2xl text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            {error ||
              "The product you're looking for doesn't exist."}
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Back to Shop
          </Link>

        </div>

      </main>
    );
  }

  // ==========================================
  // PRODUCT DETAILS PAGE
  // ==========================================

  return (
    <main className="bg-[#FCFAF6]">

      {/* ======================================
          BREADCRUMB
      ====================================== */}

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">

        <div className="text-sm text-gray-500">

          <Link
            to="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <span className="mx-2">
            /
          </span>

          <Link
            to="/shop"
            className="transition hover:text-green-700"
          >
            Shop
          </Link>

          <span className="mx-2">
            /
          </span>

          <span className="text-gray-900">
            {product.name}
          </span>

        </div>

      </div>

      {/* ======================================
          PRODUCT GALLERY + PRODUCT INFO
      ====================================== */}

      <section className="border-b border-gray-200 py-12 lg:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2">

            <ProductGallery
              product={product}
            />

            <ProductInfo
              product={product}
            />

          </div>

        </div>

      </section>

      {/* ======================================
          PRODUCT BENEFITS
      ====================================== */}

      <section className="border-b border-gray-200 py-12 lg:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <ProductBenefits
            product={product}
          />

        </div>

      </section>

      {/* ======================================
          PRODUCT DESCRIPTION
      ====================================== */}

      <section className="border-b border-gray-200 py-12 lg:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <ProductDescription
            product={product}
          />

        </div>

      </section>

      {/* ======================================
          PRODUCT REVIEWS
      ====================================== */}

      <section className="border-b border-gray-200 py-12 lg:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <ProductReviews
            product={product}
          />

        </div>

      </section>

      {/* ======================================
          RELATED PRODUCTS
      ====================================== */}

      <section className="py-12 lg:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <RelatedProducts
            currentProduct={product}
          />

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;