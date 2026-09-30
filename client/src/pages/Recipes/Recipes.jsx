import { Clock, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

import recipeData from "../../components/home/RecipeSection/recipeData";

function Recipes() {
  return (
    <main className="bg-[#FCFAF6]">
      <section className="bg-[#163824] px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-[#E2B35D]">Cook with Earthmool</p>
          <h1 className="mt-5 text-4xl font-bold sm:text-6xl">Recipes worth gathering for</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-50">Simple, generous Indian recipes made more aromatic with the right spice at the right moment.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mb-12 flex items-center gap-3">
          <Utensils className="text-green-700" />
          <h2 className="text-3xl font-bold text-[#163824]">From our recipe notebook</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipeData.map((recipe) => (
            <article key={recipe.id} className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <img src={recipe.image} alt={recipe.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-7">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">{recipe.category}</span>
                <h3 className="mt-5 text-2xl font-bold text-[#163824]">{recipe.title}</h3>
                <div className="mt-5 flex items-center gap-2 text-gray-500"><Clock size={18} />{recipe.duration}</div>
                <Link to={`/recipes/${recipe.id}`} className="mt-6 inline-block rounded-full bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800">View recipe</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Recipes;
