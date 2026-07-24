import Container from "../../common/Container";
import HeroButtons from "../../common/HeroButtons";
import HeroStats from "./HeroStats";
import HeroBadge from "./HeroBadge";

function HeroContent() {
  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl text-white">
        <HeroBadge />

        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.1] text-white md:text-6xl lg:text-5xl">
            Authentic Indian
            <br />
             Spices For
            <br />
            Every Kitchen
        </h1>

        <p className="mt-6 max-w-xl text-md leading-7 text-gray-200">
        Discover handcrafted Indian spices made from carefully selected ingredients.
        Rich aroma, authentic flavour, and premium quality packed for every home.
        </p>

        <HeroStats />

        <HeroButtons />
      </div>
    </div>
  );
}

export default HeroContent;