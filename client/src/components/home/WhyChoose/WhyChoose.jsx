import Container from "../../common/Container";
import WhyChooseCard from "./WhyChooseCard";
import whyChooseData from "./whyChooseData";

import image from "../../../assets/images/farmer/farmer.avif";

function WhyChoose() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <img
              src={image}
              alt="Why Choose Earthmool"
              className="w-full rounded-[1.5rem] object-cover shadow-lg"
            />
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-[3px] text-green-700">
              Why Choose Us
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Crafted With Passion,
              Packed With Purity
            </h2>

            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              We source premium spices directly from trusted farms and pack them
              hygienically to preserve freshness, flavour, and aroma.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whyChooseData.map((item) => (
                <WhyChooseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhyChoose;