import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH ORDER
  // ==========================================

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/orders/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load order."
          );
        }

        setOrder(data.order);
      } catch (error) {
        console.error(
          "Fetch order error:",
          error
        );

        setError(
          error.message ||
            "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6]">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#DDE8D7] border-t-[#274E13]" />

          <p className="mt-4 text-sm text-gray-500">
            Loading order details...
          </p>

        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6] px-4 py-16">

        <div className="max-w-md text-center">

          <Package
            size={50}
            className="mx-auto text-[#274E13]"
          />

          <h1 className="mt-6 text-3xl font-bold text-[#163824]">
            Order Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            {error ||
              "We couldn't find this order."}
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#274E13] px-7 py-3 font-semibold text-white transition hover:bg-[#163824]"
          >
            <ArrowLeft size={17} />
            Back to Shop
          </Link>

        </div>

      </main>
    );
  }

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "N/A";

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
            Continue Shopping
          </Link>

          <div className="mt-6">

            <p className="text-sm text-gray-500">
              Order placed on {orderDate}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#163824] sm:text-4xl">
              Order #{order._id}
            </h1>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* LEFT */}

          <div className="space-y-6">

            {/* ORDER STATUS */}

            <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 sm:p-8">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF4E4]">

                  <CheckCircle
                    size={22}
                    className="text-[#274E13]"
                  />

                </div>

                <div>

                  <h2 className="font-semibold text-[#163824]">
                    Order Status
                  </h2>

                  <p className="text-sm text-gray-500">
                    Your order has been received.
                  </p>

                </div>

              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <StatusCard
                  icon={<Package size={19} />}
                  label="Order Status"
                  value={
                    order.orderStatus ||
                    order.status ||
                    "Pending"
                  }
                />

                <StatusCard
                  icon={<Truck size={19} />}
                  label="Payment Status"
                  value={
                    order.paymentStatus ||
                    "Pending"
                  }
                />

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 sm:p-8">

              <h2 className="text-xl font-semibold text-[#163824]">
                Ordered Products
              </h2>

              <div className="mt-6 divide-y divide-gray-200">

                {order.items?.map((item, index) => (

                  <div
                    key={
                      item._id ||
                      item.productId ||
                      index
                    }
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >

                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F8F3EA]">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-[#163824]">
                        {item.name}
                      </h3>

                      {item.slug && (
                        <p className="mt-1 text-xs text-gray-500">
                          {item.slug}
                        </p>
                      )}

                      <p className="mt-2 text-sm text-gray-500">
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold text-[#274E13]">
                      ₹
                      {Number(item.total) ||
                        Number(item.price) *
                          Number(item.quantity)}
                    </p>

                  </div>

                ))}

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

                  <h2 className="font-semibold text-[#163824]">
                    Shipping Address
                  </h2>

                  <p className="text-xs text-gray-500">
                    Delivery address
                  </p>

                </div>

              </div>

              <div className="mt-5 rounded-xl bg-[#FCFAF6] p-5 text-sm leading-6 text-gray-600">

                {order.customer && (
                  <p className="font-semibold text-[#163824]">
                    {order.customer.firstName}{" "}
                    {order.customer.lastName}
                  </p>
                )}

                {order.shippingAddress?.address && (
                  <p>
                    {order.shippingAddress.address}
                  </p>
                )}

                {order.shippingAddress?.apartment && (
                  <p>
                    {order.shippingAddress.apartment}
                  </p>
                )}

                <p>
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state}
                </p>

                <p>
                  {order.shippingAddress?.pincode}
                </p>

                {order.customer?.phone && (
                  <p className="mt-2">
                    Phone: {order.customer.phone}
                  </p>
                )}

                {order.customer?.email && (
                  <p>
                    Email: {order.customer.email}
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT - SUMMARY */}

          <aside className="h-fit lg:sticky lg:top-28">

            <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6">

              <h2 className="text-xl font-semibold text-[#163824]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium text-[#163824]">
                    ₹{order.subtotal}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium text-[#163824]">
                    {Number(order.shipping) === 0
                      ? "FREE"
                      : `₹${order.shipping}`}
                  </span>

                </div>

                <div className="border-t border-[#E8E1D5] pt-5">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold text-[#163824]">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-[#274E13]">
                      ₹{order.total}
                    </span>

                  </div>

                </div>

              </div>

              <div className="mt-6 rounded-xl bg-[#F5F9F2] p-4">

                <p className="text-xs text-gray-500">
                  Payment Method
                </p>

                <p className="mt-1 font-semibold capitalize text-[#163824]">
                  {order.paymentMethod ||
                    "Online"}
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

// ==========================================
// STATUS CARD
// ==========================================

function StatusCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-[#F8F4EC] p-4">

      <div className="flex items-center gap-3">

        <div className="text-[#274E13]">
          {icon}
        </div>

        <div>

          <p className="text-xs text-gray-500">
            {label}
          </p>

          <p className="mt-1 font-semibold capitalize text-[#163824]">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;