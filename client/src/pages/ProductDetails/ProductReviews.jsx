import { Star } from "lucide-react";

function ProductReviews({ product }) {
  const reviewData = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2 days ago",
      comment:
        "Amazing quality and aroma. The masala adds a very authentic flavour to my food.",
    },
    {
      id: 2,
      name: "Rahul Verma",
      rating: 5,
      date: "1 week ago",
      comment:
        "Very fresh and nicely packed. Definitely going to order again.",
    },
    {
      id: 3,
      name: "Anjali Patel",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Good quality product with great flavour. Packaging is also premium.",
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-green-700">
            Customer Reviews
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  fill="#C28A32"
                  color="#C28A32"
                />
              ))}
            </div>

            <span className="font-semibold text-gray-900">
              {product.rating}
            </span>

            <span className="text-gray-500">
              ({product.reviews} Reviews)
            </span>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12 space-y-5">
          {reviewData.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-gray-100 bg-[#FCFAF6] p-6 sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill={
                          index < review.rating
                            ? "#C28A32"
                            : "transparent"
                        }
                        color="#C28A32"
                      />
                    ))}
                  </div>
                </div>

                <span className="text-sm text-gray-400">
                  {review.date}
                </span>
              </div>

              <p className="mt-5 leading-7 text-gray-600">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;