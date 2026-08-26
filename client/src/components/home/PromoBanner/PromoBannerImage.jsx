import productImage from "../../../assets/images/products/garam-masala.png";

function PromoBannerImage() {
  return (
    <div className="relative flex justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <div className="absolute h-48 w-48 rounded-full bg-green-100/80 blur-3xl sm:h-64 sm:w-64"></div>

      <img
        src={productImage}
        alt="Earthmool Spices"
        className="relative z-10 w-full max-w-[280px] transition duration-500 hover:scale-105 sm:max-w-[320px] lg:max-w-[420px] h-[500px] object-contain"
      />
    </div>
  );
}

export default PromoBannerImage;