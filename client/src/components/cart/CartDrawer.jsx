import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    cartCount,
  } = useCart();

  return (
    <>
      {/* ==========================================
          OVERLAY
      ========================================== */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* ==========================================
          CART DRAWER
      ========================================== */}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

          <div className="flex items-center gap-3">

            <ShoppingBag
              size={21}
              className="text-[#274e13]"
            />

            <div>

              <h2 className="text-lg font-semibold text-[#163824]">
                Your Cart
              </h2>

              <p className="text-xs text-gray-500">
                {cartCount}{" "}
                {cartCount === 1
                  ? "item"
                  : "items"}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[#163824]"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>

        </div>

        {/* ========================================
            CART CONTENT
        ======================================== */}

        <div className="flex-1 overflow-y-auto px-5">

          {cartItems.length === 0 ? (

            /* ====================================
               EMPTY CART
            ==================================== */

            <div className="flex h-full flex-col items-center justify-center px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f3ea]">

                <ShoppingBag
                  size={28}
                  className="text-[#274e13]"
                />

              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#163824]">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm text-gray-500">
                Looks like you haven't added
                any spices yet.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-lg bg-[#274e13] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163824]"
              >
                Continue Shopping
              </button>

            </div>

          ) : (

            /* ====================================
               CART ITEMS
            ==================================== */

            <div className="divide-y divide-gray-100">

              {cartItems.map((item) => (

                <CartItem
                  key={item._id || item.id}
                  item={item}
                />

              ))}

            </div>

          )}

        </div>

        {/* ========================================
            CART SUMMARY
        ======================================== */}

        {cartItems.length > 0 && (
          <CartSummary
            onClose={onClose}
          />
        )}

      </aside>
    </>
  );
}

export default CartDrawer;