import Container from "../../common/Container";
import FeatureCard from "./FeatureCard";
import featureData from "./featureData";

function Features() {
  return (
    <section className="py-6 bg-[#faf8f3]">
      <Container>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

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