import { useEffect, useState } from "react";
import Container from "../../common/Container";
import ProductCard from "./ProductCard";
import productData from "./productData";
import productImages from "./productImages";
import { getProducts } from "../../../services/productService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isActive = true;

    getProducts()
      .then((apiProducts) => {
        const productsBySlug = new Map(
          apiProducts.map((product) => [product.slug, product])
        );

        const featuredProducts = productData.flatMap((featuredProduct) => {
          const product = productsBySlug.get(featuredProduct.slug);

          if (!product) {
            return [];
          }

          const imageName = product.image?.split("/").pop();

          return [{
            ...featuredProduct,
            ...product,
            badge: product.badge || featuredProduct.badge,
            image:
              productImages[imageName] ||
              product.image ||
              featuredProduct.image,
          }];
        });

        if (isActive) {
          setProducts(featuredProducts);
        }
      })
      .catch((error) => {
        console.error("Unable to load featured products:", error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="bg-[#faf8f3] px-4 py-16 sm:px-6 lg:px-8 lg:py-12">
      <Container>
        <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">
            Best Selling
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Best Selling Products
          </h2>

          <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Discover premium spice blends and pantry staples chosen for flavor,
            freshness, and everyday cooking.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          className="pb-12!"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id || product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-3 flex justify-center">
          <button className="w-full rounded-full bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800 sm:w-auto">
            View All Products
          </button>
        </div>
      </Container>
    </section>
  );
}

export default Products;