import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={category.link}
      className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}

export default CategoryCard;