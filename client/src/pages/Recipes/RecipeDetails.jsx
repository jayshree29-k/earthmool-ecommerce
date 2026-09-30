import { ArrowLeft, Clock, Utensils } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import recipeData from "../../components/home/RecipeSection/recipeData";

const recipeInstructions = {
  1: ["Pressure cook the washed dal with turmeric until soft.", "Prepare a tempering with ghee, cumin, garlic, and dried chilli.", "Pour the tempering over the dal, finish with coriander, and serve hot."],
  2: ["Saute onion, ginger, and garlic until golden.", "Add tomato puree and spices, then cook until the oil separates.", "Stir in paneer and cream. Simmer gently and serve with naan or rice."],
  3: ["Marinate the vegetables or meat with yoghurt and warm spices.", "Layer the marinated mixture with partly cooked basmati rice.", "Cover and cook on low heat until the rice is fluffy and aromatic."],
};

function RecipeDetails() {
  const { id } = useParams();
  const recipe = recipeData.find((item) => String(item.id) === id) || recipeData[0];
  const instructions = recipeInstructions[recipe.id] || [];

  return (
    <main className="bg-[#FCFAF6]">
      <section className="bg-[#163824] px-6 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Link to="/recipes" className="inline-flex items-center gap-2 font-semibold text-[#E2B35D] hover:text-white"><ArrowLeft size={18} /> Back to recipes</Link>
          <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
            <img src={recipe.image} alt={recipe.title} className="h-72 w-full rounded-3xl object-cover sm:h-96" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-[#E2B35D]">{recipe.category}</p>
              <h1 className="mt-4 text-4xl font-bold sm:text-6xl">{recipe.title}</h1>
              <div className="mt-6 flex items-center gap-2 text-green-50"><Clock size={18} /> Ready in {recipe.duration}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-14 sm:py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3"><Utensils className="text-green-700" /><h2 className="text-2xl font-bold text-[#163824]">What you need</h2></div>
          <ul className="mt-6 space-y-3 text-gray-600"><li>Dal or main ingredient</li><li>Fresh onion, garlic, and ginger</li><li>Earthmool spice blend</li><li>Fresh herbs and a little ghee</li></ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#163824]">How to make it</h2>
          <ol className="mt-6 space-y-5 text-lg leading-8 text-gray-600">{instructions.map((step, index) => <li key={step} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">{index + 1}</span><span>{step}</span></li>)}</ol>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetails;