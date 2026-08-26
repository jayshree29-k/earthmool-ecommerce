import HeroContent from "./HeroContent";
import desktopHero from "../../../assets/images/hero/banner-image.png";
import mobileHero from "../../../assets/images/hero/mobile-image.png";
import HeroScroll from "./HeroScroll";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1d2d1d]">
      <img
        src={desktopHero}
        alt="Earthmool Hero"
        className="hidden h-[80vh] w-full object-cover lg:block"
      />

      <img
        src={mobileHero}
        alt="Earthmool Hero Mobile"
        className="block h-[80vh] w-full object-cover lg:hidden"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

      <div className="absolute inset-0 flex flex-col justify-center">
        <HeroContent />
        <HeroScroll />
      </div>
    </section>
  );
}

export default Hero;