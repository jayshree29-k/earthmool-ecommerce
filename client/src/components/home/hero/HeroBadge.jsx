import { Leaf } from "lucide-react";

function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
      <Leaf size={16} className="text-green-400" />
      <span className="text-xs font-semibold uppercase tracking-[3px] text-white">
        100% Natural Spices
      </span>
    </div>
  );
}

export default HeroBadge;