import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import posts from "./blogData";

const articleBody = {
  "balanced-indian-spice-box": [
    "A useful spice box is less about having every jar and more about having the flavours you reach for most. Start with cumin, coriander, turmeric, chilli, and garam masala, then add whole spices as your cooking grows.",
    "Store ground spices away from heat and light in airtight containers. Buy smaller quantities more often so every spoonful keeps its aroma, colour, and warmth.",
  ],
  "freshly-packed-spices": [
    "Spices begin losing their character as soon as they are ground. That is why careful sourcing, gentle processing, and small-batch packing matter at every stage.",
    "Our approach keeps the journey short and traceable, so the fragrance you notice when a packet opens is still present when it reaches your pan.",
  ],
  "weeknight-dal-special": [
    "Dal is a weeknight staple because it is simple, nourishing, and endlessly adaptable. A tempering of cumin, garlic, dried chilli, and ghee can make the whole pot feel newly special.",
    "Finish with fresh coriander and a squeeze of lemon. Serve it with rice or roti while the tempering is still fragrant.",
  ],
};

function BlogDetails() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug) || posts[0];
  const paragraphs = articleBody[post.slug] || [];

  return (
    <main className="bg-[#FCFAF6]">
      <section className="bg-[#FFF2DE] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 font-semibold text-green-700 hover:text-green-900">
            <ArrowLeft size={18} /> Back to journal
          </Link>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[3px] text-green-700">{post.category}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#163824] sm:text-6xl">{post.title}</h1>
          <div className="mt-6 flex items-center gap-2 text-gray-600"><CalendarDays size={18} />{post.date}</div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
        <img src={post.image} alt={post.title} className="h-72 w-full rounded-3xl object-cover sm:h-[28rem]" />
        <p className="mt-10 text-xl leading-9 text-[#163824]">{post.text}</p>
        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </main>
  );
}

export default BlogDetails;