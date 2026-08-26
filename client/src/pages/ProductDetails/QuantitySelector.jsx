import { useState } from "react";
import { Minus, Plus } from "lucide-react";

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      Math.max(1, previous - 1)
    );
  };

  const increaseQuantity = () => {
    setQuantity((previous) => previous + 1);
  };

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-gray-900">
        Quantity
      </p>

      <div className="flex w-fit items-center rounded-full border border-gray-200 bg-white">

        <button
          type="button"
          onClick={decreaseQuantity}
          className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>

        <span className="w-10 text-center font-semibold">
          {quantity}
        </span>

        <button
          type="button"
          onClick={increaseQuantity}
          className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>

      </div>
    </div>
  );
}

export default QuantitySelector;