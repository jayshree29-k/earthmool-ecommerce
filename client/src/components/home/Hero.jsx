import HeroContent from "./HeroContent";
import desktopHero from "../../assets/images/hero/banner-image.png";
import mobileHero from "../../assets/images/hero/mobile-image.png";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Desktop Background */}
      <img
        src={desktopHero}
        alt="Earthmool Hero"
        className="hidden lg:block w-full h-auto object-cover"
      />

      {/* Mobile Background */}
      <img
        src={mobileHero}
        alt="Earthmool Hero Mobile"
        className="block lg:hidden w-full h-auto object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <HeroContent />
      </div>
    </section>
  );
}

export default Hero;