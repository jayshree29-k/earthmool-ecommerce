import { Heart, Sprout, Users } from "lucide-react";
import farmerImage from "../../assets/images/farmer/farmer.avif";

function About() {
  return (
    <main className="bg-[#FCFAF6]">
      <section className="bg-[#FFF2DE] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">The story behind the flavour</p>
          <h1 className="mt-5 text-4xl font-bold text-[#163824] sm:text-6xl">About Earthmool</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">We make honest Indian spices for the meals that bring people back to the table.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">Rooted in everyday cooking</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#163824] sm:text-5xl">A little more care in every pinch.</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">Earthmool began with a simple belief: good spices should be full of aroma, easy to trust, and made for real kitchens. We select ingredients with care, blend them in small batches, and pack them while their character is still bright.</p>
          <p className="mt-5 text-lg leading-8 text-gray-600">Whether it is a weekday dal or a Sunday biryani, our purpose is the same: help your food feel more like your own.</p>
        </div>
        <div className="overflow-hidden rounded-[2rem] bg-[#DCE8D5]">
          <img src={farmerImage} alt="A farmer working among spice crops" className="h-[28rem] w-full object-cover" />
        </div>
      </section>

      <section className="bg-[#173D28] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 text-center md:grid-cols-3">
          <div><Sprout className="mx-auto text-[#E2B35D]" size={30} /><h2 className="mt-4 text-xl font-bold">Thoughtful sourcing</h2><p className="mt-3 text-green-50">Ingredients chosen for flavour, not filler.</p></div>
          <div><Heart className="mx-auto text-[#E2B35D]" size={30} /><h2 className="mt-4 text-xl font-bold">Made with care</h2><p className="mt-3 text-green-50">Small details that keep aroma where it belongs.</p></div>
          <div><Users className="mx-auto text-[#E2B35D]" size={30} /><h2 className="mt-4 text-xl font-bold">For your table</h2><p className="mt-3 text-green-50">Flavour made to be shared generously.</p></div>
        </div>
      </section>
    </main>
  );
}

export default About;