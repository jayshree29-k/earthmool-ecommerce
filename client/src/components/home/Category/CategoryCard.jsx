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
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-72"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-md font-semibold">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}

export default CategoryCard;