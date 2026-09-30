import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import posts from "./blogData";

function Blog() {
  return (
    <main className="bg-[#FCFAF6]">
      <section className="bg-[#FFF2DE] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">The Earthmool journal</p>
          <h1 className="mt-5 text-4xl font-bold text-[#163824] sm:text-6xl">Good food starts with curiosity.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">Stories, practical kitchen wisdom, and a closer look at the ingredients behind your favourite meals.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((post) => {
            const Icon = post.icon;
            return (
              <article key={post.title} className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <img src={post.image} alt="" className="h-64 w-full object-cover" />
                <div className="p-7">
                  <div className="flex items-center justify-between gap-3 text-sm text-green-700">
                    <span className="flex items-center gap-2 font-semibold"><Icon size={17} />{post.category}</span>
                    <span className="text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-[#163824]">{post.title}</h2>
                  <p className="mt-4 leading-7 text-gray-600">{post.text}</p>
                  <Link to={`/blog/${post.slug}`} className="mt-6 flex items-center gap-2 font-semibold text-green-700 hover:text-green-900">Read article <ArrowRight size={18} /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Blog;
