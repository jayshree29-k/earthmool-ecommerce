import recipeData from "./recipeData";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

function RecipeSection() {
  return (
    <section className="bg-[#FFF8F1] py-14">

      <div className="mx-auto max-w-7xl px-4">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-[3px] text-green-700">
            Delicious Recipes
          </span>

          <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
            Cook Authentic Indian Dishes
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Discover delicious recipes crafted with Earthmool spices and
            bring authentic Indian flavours to your kitchen.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {recipeData.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}

        </div>

        <div className="mt-16 text-center">

          <Link to="/recipes" className="inline-block rounded-full bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800">
            View All Recipes
          </Link>

        </div>

      </div>

    </section>
  );
}

export default RecipeSection;