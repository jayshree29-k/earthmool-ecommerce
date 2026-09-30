import productData from "./productData";
import ProductGrid from "./ProductGrid";

function RelatedProducts({ currentProduct }) {
  const relatedProducts = productData
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category === currentProduct.category
    )
    .slice(0, 4);

  // If there are not enough products in the same category
  const displayProducts =
    relatedProducts.length > 0
      ? relatedProducts
      : productData
          .filter(
            (product) =>
              product.id !== currentProduct.id
          )
          .slice(0, 4);

  return (
    <section className="bg-[#FCFAF6] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">
            You May Also Like
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Related Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore more premium spices from Earthmool.
          </p>
        </div>

        {/* Products */}
        <div className="mt-12">
          <ProductGrid products={displayProducts} />
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;