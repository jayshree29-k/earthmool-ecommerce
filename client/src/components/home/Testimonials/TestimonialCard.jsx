import { Star } from "lucide-react";

function TestimonialCard({ testimonial }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="flex mb-6">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            fill="#FACC15"
            color="#FACC15"
          />
        ))}
      </div>

      <p className="text-gray-600 leading-8">
        "{testimonial.review}"
      </p>

      <div className="mt-8 flex items-center gap-4">

        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">
            {testimonial.name}
          </h4>

          <p className="text-sm text-gray-500">
            {testimonial.location}
          </p>
        </div>

      </div>

    </div>
  );
}

export default TestimonialCard;