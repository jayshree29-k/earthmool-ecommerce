function WhyChooseCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:shadow-lg sm:flex-row sm:items-start">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <Icon className="text-green-700" size={28} />
      </div>

      <div>
        <h3 className="text-lg font-semibold">
          {item.title}
        </h3>

        <p className="mt-2 text-xs text-gray-600">
          {item.description}
        </p>
      </div>

    </div>
  );
}

export default WhyChooseCard;