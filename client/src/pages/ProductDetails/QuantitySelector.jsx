import { Minus, Plus } from "lucide-react";
import { clampQuantity } from "../../utils/productStock";

function QuantitySelector({
  quantity,
  setQuantity,
  stock,
}) {
  const disabled = stock === 0;

  const decreaseQuantity = () => {
    setQuantity((previous) => clampQuantity(previous - 1, stock));
  };

  const increaseQuantity = () => {
    setQuantity((previous) => clampQuantity(previous + 1, stock));
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
          disabled={disabled || quantity <= 1}
          className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>

        <input
          type="number"
          min={stock === 0 ? 0 : 1}
          max={stock}
          step="1"
          value={disabled ? 0 : clampQuantity(quantity, stock)}
          onChange={(event) =>
            setQuantity(clampQuantity(event.target.value, stock))
          }
          disabled={disabled}
          className="w-12 appearance-none bg-transparent text-center font-semibold outline-none disabled:text-gray-400"
          aria-label="Quantity"
        />

        <button
          type="button"
          onClick={increaseQuantity}
          disabled={disabled || quantity >= stock}
          className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>

      </div>
    </div>
  );
}

export default QuantitySelector;