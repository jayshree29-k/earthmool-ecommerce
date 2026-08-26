import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Backend API will be connected here later.
      await new Promise((resolve) => setTimeout(resolve, 800));

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#214E34] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center text-white">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            <CheckCircle size={16} />
            Join the Earthmool Family
          </span>

          {/* Heading */}
          <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            Get a Little More Spice in Your Inbox
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Subscribe for delicious recipes, cooking inspiration,
            exclusive offers, and the latest from Earthmool.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-full border border-white/20 bg-white px-5 py-3.5 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/50"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C28A32] px-7 py-3.5 font-semibold text-white transition hover:bg-[#A97427] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Response Message */}
          {message && (
            <p
              className="mt-4 text-sm text-white/90"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <p className="mt-5 text-xs text-white/60">
            No spam. Just delicious recipes, offers, and Earthmool updates.
          </p>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;