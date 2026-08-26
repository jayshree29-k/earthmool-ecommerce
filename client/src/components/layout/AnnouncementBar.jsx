const announcements = [
  "🚚 Free Shipping on Orders Above ₹499",
  "🌿 100% Natural Ingredients",
  "🔬 Lab Tested for Purity",
  "⭐ Trusted by Thousands",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-[#1d3a22] text-white overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...announcements, ...announcements].map((item, index) => (
          <span
            key={index}
            className="px-10 py-2 text-sm font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

