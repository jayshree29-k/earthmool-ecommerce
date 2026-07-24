function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <Icon className="text-green-700" size={28} />
      </div>

      <div>
        <h3 className="font-semibold text-lg">
          {feature.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {feature.description}
        </p>
      </div>

    </div>
  );
}

export default FeatureCard;