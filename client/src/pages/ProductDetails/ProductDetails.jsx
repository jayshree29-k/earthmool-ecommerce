import { Link, useParams } from "react-router-dom";
import productData from "../../constants/productData";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

function ProductDetails() {
  const { slug } = useParams();

  const product = productData.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <main className="min-h-[60vh] bg-[#FCFAF6] px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            The product you're looking for doesn't exist.
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

  return (
    <main className="bg-[#FCFAF6]">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-500">

          <Link
            to="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/shop"
            className="transition hover:text-green-700"
          >
            Shop
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-900">
            {product.name}
          </span>

        </div>
      </div>

      {/* Product */}
      <section className="py-12 lg:py-20">

        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          <ProductGallery product={product} />

          <ProductInfo product={product} />

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;