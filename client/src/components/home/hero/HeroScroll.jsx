import { ChevronDown } from "lucide-react";

function HeroScroll() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-white animate-bounce">
      <span className="mb-2 text-xs uppercase tracking-[4px]">
        Scroll
      </span>

      <ChevronDown size={24} />
    </div>
  );
}

export default HeroScroll;