import { useState } from "react";

function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(product.image);

  const images = [
    product.image,
  ];

  return (
    <div>

      {/* Main Image */}
      <div className="flex min-h-[500px] items-center justify-center overflow-hidden rounded-3xl bg-[#F3EDE3] p-8">

        <img
          src={activeImage}
          alt={product.name}
          className="max-h-[460px] w-full object-contain transition duration-500"
        />

      </div>

      {/* Thumbnails */}
      <div className="mt-5 flex gap-4">

        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`h-24 w-24 overflow-hidden rounded-xl border-2 bg-[#F3EDE3] p-2 ${
              activeImage === image
                ? "border-green-700"
                : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}

      </div>

    </div>
  );
}

export default ProductGallery;