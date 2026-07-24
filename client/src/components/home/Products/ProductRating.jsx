import { Star } from "lucide-react";

function ProductRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <Star
        size={16}
        className="fill-yellow-400 text-yellow-400"
      />

      <span className="text-sm font-medium">
        {rating}
      </span>

      <span className="text-sm text-gray-500">
        ({reviews})
      </span>
    </div>
  );
}

export default ProductRating;