import { FaInstagram } from "react-icons/fa";
import instagramData from "./instagramData";
import InstagramCard from "./InstagramCard";

function InstagramGallery() {
  return (
    <section className="bg-[#FFF8F1] py-24">

      <div className="mx-auto max-w-7xl px-4">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
            <FaInstagram size={24} />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[3px] text-green-700">
            Follow Our Journey
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 lg:text-5xl">
            Cook. Share. Inspire.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Follow Earthmool for delicious recipes, cooking inspiration,
            and a little more spice in your everyday life.
          </p>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900"
          >
            @earthmool
            <FaInstagram size={18} />
          </a>

        </div>

        {/* Gallery */}
        <div className="mt-8 grid grid-cols-2 overflow-hidden md:grid-cols-3 lg:grid-cols-6">

          {instagramData.map((item) => (
            <InstagramCard
              key={item.id}
              image={item.image}
              alt={item.alt}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default InstagramGallery;