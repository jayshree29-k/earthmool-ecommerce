import { Star, ShieldCheck, Leaf } from "lucide-react";

function HeroStats() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:gap-6">
      <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
        <Star className="fill-yellow-400 text-yellow-400" size={20} />
        <div>
          <h4 className="font-semibold text-white">4.9/5 Rating</h4>
          <p className="text-sm text-gray-200">2,000+ Reviews</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
        <Leaf className="text-green-400" size={20} />
        <div>
          <h4 className="font-semibold text-white">100% Natural</h4>
          <p className="text-sm text-gray-200">No Preservatives</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
        <ShieldCheck className="text-green-400" size={20} />
        <div>
          <h4 className="font-semibold text-white">Premium Quality</h4>
          <p className="text-sm text-gray-200">Lab Tested</p>
        </div>
      </div>
    </div>
  );
}

export default HeroStats;