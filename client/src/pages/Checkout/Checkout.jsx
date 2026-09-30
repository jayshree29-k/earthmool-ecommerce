import { useState } from "react";
import {
  ArrowLeft,
  Lock,
  MapPin,
  Package,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  getProductStock,
  hasOutOfStockItems,
} from "../../utils/productStock";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartSubtotal,
    cartCount,
    clearCart,
    isRefreshingStock,
  } = useCart();

  const hasUnavailableItems = hasOutOfStockItems(cartItems);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // ==========================================
  // SHIPPING
  // ==========================================

  const shipping =
    cartSubtotal === 0
      ? 0
      : cartSubtotal >= 499
      ? 0
      : 49;

  const total = cartSubtotal + shipping;

  // ==========================================
  // FORM INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (
      !/^[6-9]\d{9}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (
      !/^\d{6}$/.test(formData.pincode)
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (isRefreshingStock || hasUnavailableItems) {
      alert("Resolve product availability in your cart before checkout.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      // ==========================================
      // PREPARE ORDER ITEMS
      // ==========================================

      const orderItems = cartItems.map((item) => ({
        id: String(item._id || item.id),
        name: item.name,
        slug: item.slug,
        image: item.image,
        price: Number(item.price),
        quantity: Number(item.quantity),
      }));

      // ==========================================
      // ORDER DATA
      // ==========================================

      const orderData = {
        customer: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },

        shippingAddress: {
          address: formData.address.trim(),
          apartment: formData.apartment.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
        },

        items: orderItems,

        subtotal: Number(cartSubtotal),
        shipping: Number(shipping),
        total: Number(total),

        paymentMethod: "online",
      };

      console.log(
        "Sending order:",
        orderData
      );

      // ==========================================
      // SEND ORDER TO BACKEND
      // ==========================================

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      // ==========================================
      // HANDLE RESPONSE
      // ==========================================

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Invalid response from server."
        );
      }

      console.log(
        "Order API response:",
        data
      );

      // ==========================================
      // HANDLE API ERROR
      // ==========================================

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to place order."
        );
      }

      // ==========================================
      // ORDER CREATED SUCCESSFULLY
      // ==========================================

      console.log(
        "Order created successfully:",
        data.order
      );

      // Clear cart ONLY after successful order
      clearCart();

      // ==========================================
      // GO TO ORDER SUCCESS PAGE
      // ==========================================

      navigate("/order-success", {
        state: {
          order: data.order,
        },
      });
    } catch (error) {
      console.error(
        "Order placement error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while placing your order."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6] px-4 py-16">
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F0E7]">
            <Package
              size={36}
              className="text-[#274E13]"
            />
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-[#163824]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Add some delicious Earthmool spices
            before checkout.
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

  // ==========================================
  // CHECKOUT PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#FCFAF6]">

      {/* HEADER */}

      <section className="border-b border-[#E8E1D5] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#274E13]"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

          <h1 className="mt-5 text-3xl font-semibold text-[#163824] sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Complete your details to place your order.
          </p>

        </div>
      </section>

      {/* CHECKOUT CONTENT */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <form onSubmit={handlePlaceOrder}>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* LEFT SIDE */}

            <div className="space-y-6">

              {/* CONTACT INFORMATION */}

              <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F0E7]">
                    <User
                      size={19}
                      className="text-[#274E13]"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-[#163824]">
                      Contact Information
                    </h2>

                    <p className="text-xs text-gray-500">
                      We'll use this information for your order.
                    </p>
                  </div>

                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    className="sm:col-span-2"
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="10-digit mobile number"
                    required
                    className="sm:col-span-2"
                  />

                </div>
              </div>

              {/* SHIPPING ADDRESS */}

              <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F0E7]">
                    <MapPin
                      size={19}
                      className="text-[#274E13]"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-[#163824]">
                      Shipping Address
                    </h2>

                    <p className="text-xs text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>

                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    placeholder="House no., street, area"
                    required
                    className="sm:col-span-2"
                  />

                  <InputField
                    label="Apartment / Landmark"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="sm:col-span-2"
                  />

                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    required
                  />

                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={errors.state}
                    required
                  />

                  <InputField
                    label="Pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    error={errors.pincode}
                    placeholder="6-digit pincode"
                    required
                    className="sm:col-span-2"
                  />

                </div>
              </div>

              {/* PAYMENT */}

              <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F0E7]">
                    <Lock
                      size={19}
                      className="text-[#274E13]"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-[#163824]">
                      Payment
                    </h2>

                    <p className="text-xs text-gray-500">
                      Secure payment options will be available here.
                    </p>
                  </div>

                </div>

                <div className="mt-6 rounded-xl border border-[#DCE8D5] bg-[#F5F9F2] p-5">

                  <div className="flex items-start gap-3">

                    <input
                      type="radio"
                      checked
                      readOnly
                      className="mt-1 accent-[#274E13]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#163824]">
                        Secure Online Payment
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Payment gateway integration will be added
                        in the next step.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ORDER SUMMARY */}

            <aside className="h-fit lg:sticky lg:top-28">

              <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6">

                <h2 className="text-xl font-semibold text-[#163824]">
                  Your Order
                </h2>

                {/* PRODUCTS */}

                <div className="mt-6 space-y-5">

                  {cartItems.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="flex gap-3"
                    >

                      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F8F3EA]">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#274E13] px-1 text-[9px] font-bold text-white">
                          {item.quantity}
                        </span>

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-medium text-[#163824]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </p>

                        {getProductStock(item) === 0 && (
                          <p className="mt-1 text-xs font-semibold text-red-600">
                            Out of Stock
                          </p>
                        )}

                      </div>

                      <p className="text-sm font-semibold text-[#163824]">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>
                  ))}

                </div>

                <div className="my-6 border-t border-[#E8E1D5]" />

                {/* SUBTOTAL */}

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Subtotal ({cartCount} items)
                  </span>

                  <span className="font-medium text-[#163824]">
                    ₹{cartSubtotal}
                  </span>

                </div>

                {/* SHIPPING */}

                <div className="mt-4 flex justify-between text-sm">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium text-[#163824]">
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`}
                  </span>

                </div>

                {/* TOTAL */}

                <div className="my-6 border-t border-[#E8E1D5] pt-5">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold text-[#163824]">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-[#274E13]">
                      ₹{total}
                    </span>

                  </div>

                </div>

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  disabled={isPlacingOrder || isRefreshingStock || hasUnavailableItems}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#274E13] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#163824] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {isPlacingOrder ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Place Order
                    </>
                  )}

                </button>

                {hasUnavailableItems && (
                  <p className="mt-3 text-center text-xs text-red-600">
                    Return to your cart to remove out-of-stock items.
                  </p>
                )}

                <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">
                  Your information is securely handled.
                </p>

              </div>

              {/* BENEFITS */}

              <div className="mt-4 rounded-2xl border border-[#E8E1D5] bg-white p-5">

                <div className="flex items-center gap-3">

                  <Package
                    size={18}
                    className="text-[#274E13]"
                  />

                  <p className="text-xs font-medium text-[#163824]">
                    Carefully packed & delivered
                  </p>

                </div>

                <div className="mt-3 flex items-center gap-3">

                  <Lock
                    size={18}
                    className="text-[#274E13]"
                  />

                  <p className="text-xs font-medium text-[#163824]">
                    Safe & secure checkout
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </form>

      </section>

    </main>
  );
}

// ==========================================
// INPUT FIELD
// ==========================================

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = "",
}) {
  return (
    <div className={className}>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#163824]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#274E13] focus:ring-1 focus:ring-[#274E13] ${
          error
            ? "border-red-400"
            : "border-gray-300"
        }`}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default Checkout;