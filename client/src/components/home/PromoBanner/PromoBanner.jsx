import PromoBannerContent from "./PromoBannerContent";
import PromoBannerImage from "./PromoBannerImage";
import productImage from "../../../assets/images/promoimage/promo-image.png";

function PromoBanner() {
  return (
    <section
      className="px-4 py-16 sm:px-6 lg:px-8 lg:py-14 bg-cover bg-center"
      style={{ backgroundImage: `url(${productImage})` }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] bg-[#F8F4ED] shadow-sm">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <PromoBannerContent />
            <PromoBannerImage />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;