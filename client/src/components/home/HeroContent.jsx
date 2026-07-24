import Container from "../common/Container";
import HeroButtons from "../common/HeroButtons";
import HeroStats from "./HeroStats";

function HeroContent() {
  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl text-white">
        <span className="uppercase tracking-[4px] text-sm font-medium">
          Premium Indian Spices
        </span>

        <h1 className="mt-4 text-4xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Bring Home the Authentic Taste of India
        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-200">
          Crafted from carefully selected spices to deliver rich aroma,
          authentic flavor, and premium quality in every meal.
        </p>

        <HeroStats />

        <HeroButtons />
      </div>
    </div>
  );
}

export default HeroContent;