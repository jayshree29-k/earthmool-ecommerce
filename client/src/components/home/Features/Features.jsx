import Container from "../../common/Container";
import FeatureCard from "./FeatureCard";
import featureData from "./featureData";

function Features() {
  return (
    <section className="bg-[#faf8f3] py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">

          {featureData.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}

export default Features;