import Container from "../../common/Container";
import CategoryCard from "./CategoryCard";
import categoryData from "./categoryData";

function Categories() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-12">
      <Container>
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">
            Shop By Category
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Explore Our Spices
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
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