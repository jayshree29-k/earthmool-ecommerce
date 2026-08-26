import testimonialData from "./testimonialData";
import TestimonialSlider from "./TestimonialSlider";

function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-[3px] text-green-700">
            Customer Reviews
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900 lg:text-5xl">
            Loved by Thousands of Families
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover why thousands of home chefs trust Earthmool
            for authentic Indian flavours.
          </p>

        </div>

        <div className="mt-16">
          <TestimonialSlider testimonials={testimonialData} />
        </div>

      </div>
    </section>
  );
}

export default Testimonials;