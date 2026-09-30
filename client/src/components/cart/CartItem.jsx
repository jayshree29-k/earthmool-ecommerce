import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { getProductStock } from "../../utils/productStock";

function CartItem({ item }) {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart();

  // ==========================================
  // PRODUCT ID
  // Supports MongoDB _id and old id
  // ==========================================

  const productId = item._id || item.id;
  const stock = getProductStock(item);

  return (
    <div className="flex gap-4 border-b border-gray-200 py-5">

      {/* ========================================
          PRODUCT IMAGE
      ======================================== */}

      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f8f3ea]">

        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />

      </div>

      {/* ========================================
          PRODUCT INFORMATION
      ======================================== */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Product Name + Remove */}

        <div className="flex justify-between gap-3">

          <div>

            <h3 className="text-sm font-medium text-[#163824]">
              {item.name}
            </h3>

            {item.category && (
              <p className="mt-1 text-xs text-gray-500">
                {item.category}
              </p>
            )}

            {stock === 0 && (
              <p className="mt-1 text-xs font-semibold text-red-600">
                Out of Stock
              </p>
            )}

          </div>

          {/* Remove Product */}

          <button
            type="button"
            onClick={() =>
              removeFromCart(productId)
            }
            className="text-gray-400 transition hover:text-red-500"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 size={16} />
          </button>

        </div>

        {/* ======================================
            PRICE
        ====================================== */}

        <p className="mt-2 text-sm font-semibold text-[#274e13]">
          ₹{item.price}
        </p>

        {/* ======================================
            QUANTITY + TOTAL
        ====================================== */}

        <div className="mt-auto flex items-center justify-between pt-3">

          {/* Quantity Controls */}

          {stock === 0 ? (
            <span className="text-xs font-semibold text-red-600">
              Out of Stock
            </span>
          ) : (
          <div className="flex items-center rounded-md border border-gray-300">

            {/* Decrease */}

            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  productId,
                  item.quantity - 1
                )
              }
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>

            {/* Quantity */}

            <span className="flex h-8 min-w-8 items-center justify-center border-x border-gray-300 text-sm">
              {item.quantity}
            </span>

            {/* Increase */}

            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  productId,
                  item.quantity + 1
                )
              }
              disabled={item.quantity >= stock}
              className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>

          </div>
          )}

          {/* ====================================
              ITEM TOTAL
          ==================================== */}

          <p className="text-sm font-semibold text-[#163824]">
            ₹
            {(
              Number(item.price || 0) *
              Number(item.quantity || 0)
            ).toLocaleString("en-IN")}
          </p>

        </div>

      </div>

    </div>
  );
}

export default CartItem;