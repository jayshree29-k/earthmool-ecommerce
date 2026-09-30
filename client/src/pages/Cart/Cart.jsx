import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  getProductStock,
  hasOutOfStockItems,
} from "../../utils/productStock";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    isRefreshingStock,
  } = useCart();

  const hasUnavailableItems = hasOutOfStockItems(cartItems);

  // Shipping calculation
  const shipping =
    cartSubtotal === 0
      ? 0
      : cartSubtotal >= 499
        ? 0
        : 49;

  const total = cartSubtotal + shipping;

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#FCFAF6] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">

          {/* Icon */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F0E7]">
            <ShoppingBag
              size={42}
              className="text-[#274E13]"
            />
          </div>

          <h1 className="mt-7 text-3xl font-semibold text-[#163824] sm:text-4xl">
            Your Cart is Empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
            You haven't added any spices to your cart yet.
            Explore our collection and find your favourite
            Earthmool spices.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#274E13] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#163824]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <section className="border-b border-[#E8E1D5] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <Link
            to="/shop"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#274E13]"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-[#163824] sm:text-4xl">
                Shopping Cart
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {cartCount}{" "}
                {cartCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            {/* Clear Cart */}
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-700"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          CART CONTENT
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* =================================================
              PRODUCTS
          ================================================= */}
          <div>

            <div className="overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white">

              {/* Product Header */}
              <div className="hidden border-b border-[#E8E1D5] px-6 py-4 sm:grid sm:grid-cols-[1fr_120px_140px_100px] sm:items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Product
                </span>

                <span className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </span>

                <span className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Quantity
                </span>

                <span className="text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Total
                </span>
              </div>

              {/* Product Items */}
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="border-b border-[#E8E1D5] p-4 last:border-b-0 sm:p-6"
                >

                  <div className="grid gap-5 sm:grid-cols-[1fr_120px_140px_100px] sm:items-center">

                    {/* Product */}
                    <div className="flex min-w-0 gap-4">

                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F8F3EA] sm:h-28 sm:w-24">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-base font-semibold text-[#163824]">
                          {item.name}
                        </h2>

                        {item.category && (
                          <p className="mt-1 text-xs text-gray-500">
                            {item.category}
                          </p>
                        )}

                        {getProductStock(item) === 0 && (
                          <p className="mt-2 text-xs font-semibold text-red-600">
                            Out of Stock
                          </p>
                        )}

                        {item.badge && (
                          <span className="mt-2 inline-block rounded-full bg-[#F5F0E7] px-2.5 py-1 text-[10px] font-semibold text-[#274E13]">
                            {item.badge}
                          </span>
                        )}

                        {/* Mobile Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id || item.id)}
                          className="mt-3 flex items-center gap-1 text-xs text-red-500 hover:text-red-700 sm:hidden"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between sm:block sm:text-center">
                      <span className="text-xs text-gray-500 sm:hidden">
                        Price
                      </span>

                      <span className="text-sm font-medium text-[#163824]">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between sm:justify-center">
                      <span className="text-xs text-gray-500 sm:hidden">
                        Quantity
                      </span>

                      {getProductStock(item) === 0 ? (
                        <span className="text-xs font-semibold text-red-600">
                          Out of Stock
                        </span>
                      ) : (
                      <div className="flex items-center rounded-lg border border-gray-300">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item._id || item.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="flex h-9 w-9 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-300 text-sm font-medium text-[#163824]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item._id || item.id,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= getProductStock(item)}
                          className="flex h-9 w-9 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between sm:block sm:text-right">
                      <span className="text-xs text-gray-500 sm:hidden">
                        Total
                      </span>

                      <span className="text-sm font-bold text-[#274E13]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Free Shipping Notice */}
            {cartSubtotal < 499 && (
              <div className="mt-5 rounded-xl border border-[#E8E1D5] bg-white px-5 py-4">
                <p className="text-sm text-gray-600">
                  Add{" "}
                  <span className="font-semibold text-[#274E13]">
                    ₹{499 - cartSubtotal}
                  </span>{" "}
                  more to your cart and get{" "}
                  <span className="font-semibold text-[#274E13]">
                    FREE shipping!
                  </span>
                </p>
              </div>
            )}

            {cartSubtotal >= 499 && (
              <div className="mt-5 rounded-xl border border-[#DCE8D5] bg-[#F4F8F1] px-5 py-4">
                <p className="text-sm font-medium text-[#274E13]">
                  🎉 You have unlocked FREE shipping!
                </p>
              </div>
            )}
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}
          <aside className="h-fit rounded-2xl border border-[#E8E1D5] bg-white p-6 lg:sticky lg:top-28">

            <h2 className="text-xl font-semibold text-[#163824]">
              Order Summary
            </h2>

            {/* Subtotal */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Subtotal
              </span>

              <span className="text-sm font-semibold text-[#163824]">
                ₹{cartSubtotal}
              </span>
            </div>

            {/* Shipping */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Shipping
              </span>

              <span className="text-sm font-semibold text-[#163824]">
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-[#E8E1D5]" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#163824]">
                Total
              </span>

              <span className="text-2xl font-bold text-[#274E13]">
                ₹{total}
              </span>
            </div>

            {/* Checkout */}
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              disabled={hasUnavailableItems || isRefreshingStock}
              className="mt-6 w-full rounded-xl bg-[#274E13] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#163824] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300"
            >
              Proceed to Checkout
            </button>

            {hasUnavailableItems && (
              <p className="mt-3 text-center text-xs text-red-600">
                Remove out-of-stock items before checkout.
              </p>
            )}

            {/* Continue Shopping */}
            <Link
              to="/shop"
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#274E13] px-5 py-3.5 text-sm font-semibold text-[#274E13] transition hover:bg-[#F5F0E7]"
            >
              Continue Shopping
            </Link>

            {/* Secure Checkout */}
            <div className="mt-6 border-t border-[#E8E1D5] pt-5 text-center">
              <p className="text-xs leading-5 text-gray-400">
                Secure checkout • Safe & secure payment
              </p>
            </div>

          </aside>
        </div>
      </section>
    </main>
  );
}

export default Cart;