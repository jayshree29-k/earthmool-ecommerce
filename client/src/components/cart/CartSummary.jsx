import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { hasOutOfStockItems } from "../../utils/productStock";

function CartSummary({ onClose }) {
  const navigate = useNavigate();

  const {
    cartItems,
    cartSubtotal,
    isRefreshingStock,
  } = useCart();

  const hasUnavailableItems = hasOutOfStockItems(cartItems);

  const shipping = cartSubtotal >= 499 || cartSubtotal === 0
    ? 0
    : 49;

  const total = cartSubtotal + shipping;

  const handleViewCart = () => {
    onClose?.();
    navigate("/cart");
  };

  const handleCheckout = () => {
    onClose?.();
    navigate("/checkout");
  };

  return (
    <div className="border-t border-gray-200 bg-white p-5">
      
      {/* Free Shipping Message */}
      {cartSubtotal > 0 && cartSubtotal < 499 && (
        <p className="mb-4 text-center text-xs text-gray-500">
          Add ₹{499 - cartSubtotal} more to get free shipping.
        </p>
      )}

      {cartSubtotal >= 499 && (
        <p className="mb-4 text-center text-xs font-medium text-[#274e13]">
          🎉 You unlocked free shipping!
        </p>
      )}

      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Subtotal
        </span>

        <span className="font-semibold text-[#163824]">
          ₹{cartSubtotal}
        </span>
      </div>

      {/* Shipping */}
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Shipping
        </span>

        <span className="font-medium text-[#163824]">
          {shipping === 0 ? "FREE" : `₹${shipping}`}
        </span>
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="font-semibold text-[#163824]">
          Total
        </span>

        <span className="text-lg font-bold text-[#274e13]">
          ₹{total}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-5 space-y-3">
        <button
          onClick={handleViewCart}
          disabled={cartItems.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#274e13] px-5 py-3 text-sm font-semibold text-[#274e13] transition hover:bg-[#f8f3ea] disabled:cursor-not-allowed disabled:opacity-50"
        >
          View Cart
        </button>

        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0 || hasUnavailableItems || isRefreshingStock}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#274e13] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163824] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Checkout
          <ArrowRight size={17} />
        </button>

        {hasUnavailableItems && (
          <p className="text-center text-xs text-red-600">
            Remove out-of-stock items before checkout.
          </p>
        )}
      </div>

      <p className="mt-3 text-center text-[11px] text-gray-400">
        Taxes calculated at checkout.
      </p>
    </div>
  );
}

export default CartSummary;