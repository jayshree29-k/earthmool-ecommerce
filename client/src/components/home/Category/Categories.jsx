import Container from "../../common/Container";
import CategoryCard from "./CategoryCard";
import categoryData from "./categoryData";

function Categories() {
  return (
    <section className="py-20">
      <Container>

        <div className="mb-12 text-center">
          <p className="text-green-700 font-semibold uppercase tracking-[3px]">
            Shop By Category
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Explore Our Spices
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryData.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}

export default Categories;