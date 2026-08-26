import { Clock, ArrowRight } from "lucide-react";

function RecipeCard({ recipe }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">

        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {recipe.category}
        </span>

        <h3 className="mt-4 text-2xl font-semibold">
          {recipe.title}
        </h3>

        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={18} />
            <span>{recipe.duration}</span>
          </div>

          <button className="flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900">
            Read Recipe
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </article>
  );
}

export default RecipeCard;