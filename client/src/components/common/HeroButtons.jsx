import Button from "../ui/Button";

function HeroButtons() {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Button>
        Shop Now
      </Button>

      <Button variant="outline">
        Explore Products
      </Button>
    </div>
  );
}

export default HeroButtons;