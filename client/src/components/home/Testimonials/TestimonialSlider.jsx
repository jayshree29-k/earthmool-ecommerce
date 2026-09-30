import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

function TestimonialSlider({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + totalSlides) % totalSlides
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative">

      {/* Desktop / Tablet Cards */}
      <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
          />
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden">
        <TestimonialCard
          testimonial={testimonials[currentIndex]}
        />
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-4 md:hidden">

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-green-700 hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-7 bg-green-700"
                  : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-green-700 hover:text-white"
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </div>
  );
}

export default TestimonialSlider;