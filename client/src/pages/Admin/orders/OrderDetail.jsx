import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminFetch } from "../../../services/adminApi";

const API_URL = "http://localhost:5000";

const statusOptions = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminFetch(
        `${API_URL}/api/orders/${id}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch order."
        );
      }

      setOrder(data.order);
      setStatus(data.order.orderStatus || "pending");
    } catch (error) {
      console.error("Fetch order error:", error);
      setError(
        error.message || "Unable to load order."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateOrderStatus = async () => {
    try {
      setUpdating(true);
      setError("");

      const response = await adminFetch(
        `${API_URL}/api/orders/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update order status."
        );
      }

      setOrder(data.order);

      alert("Order status updated successfully.");
    } catch (error) {
      console.error(
        "Update order status error:",
        error
      );

      setError(
        error.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdating(false);
    }
  };

  const getOrderNumber = () => {
    if (!order?._id) return "N/A";

    return order._id
      .slice(-8)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFAF6] p-6 lg:p-10">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-12 text-center shadow-sm">
          <p className="text-gray-500">
            Loading order...
          </p>
        </div>
      </main>
    );
  }

  if (error && !order) {
    return (
      <main className="min-h-screen bg-[#FCFAF6] p-6 lg:p-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-red-600">
            Unable to Load Order
          </h1>

          <p className="mt-3 text-gray-500">
            {error}
          </p>

          <Link
            to="/admin/orders"
            className="mt-6 inline-flex rounded-lg bg-[#274e13] px-6 py-3 font-semibold text-white"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6] p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/admin/orders"
              className="text-sm font-medium text-[#274e13] hover:underline"
            >
              ← Back to Orders
            </Link>

            <h1 className="mt-3 text-3xl font-bold text-[#163824]">
              Order #{getOrderNumber()}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Products */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#163824]">
                Order Items
              </h2>

              <div className="mt-5 divide-y divide-gray-100">
                {order.items?.map((item, index) => (
                  <div
                    key={`${item.productId}-${index}`}
                    className="flex gap-4 py-5"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f8f3ea]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-2 text-sm font-medium text-[#274e13]">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                    <div className="font-semibold text-gray-900">
                      ₹{item.total}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Customer */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#163824]">
                Customer Information
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Name
                  </p>

                  <p className="mt-1 text-sm text-gray-800">
                    {order.customer?.firstName}{" "}
                    {order.customer?.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-gray-800">
                    {order.customer?.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-gray-800">
                    {order.customer?.phone}
                  </p>
                </div>

              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#163824]">
                Shipping Address
              </h2>

              <div className="mt-5 text-sm leading-6 text-gray-700">
                <p>
                  {order.shippingAddress?.address}
                </p>

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
                  PIN:{" "}
                  {order.shippingAddress?.pincode}
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Status */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#163824]">
                Order Status
              </h2>

              <label className="mt-5 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#274e13] focus:ring-1 focus:ring-[#274e13]"
              >
                {statusOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option.charAt(0).toUpperCase() +
                      option.slice(1)}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={updateOrderStatus}
                disabled={updating}
                className="mt-4 w-full rounded-lg bg-[#274e13] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163824] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updating
                  ? "Updating..."
                  : "Update Status"}
              </button>
            </section>

            {/* Payment */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#163824]">
                Payment
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Method
                  </span>

                  <span className="font-medium text-gray-900">
                    {order.paymentMethod || "Online"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Status
                  </span>

                  <span className="font-medium text-gray-900">
                    {order.paymentStatus || "Pending"}
                  </span>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#163824]">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    ₹{order.subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span>
                    ₹{order.shipping}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#274e13]">
                      ₹{order.total}
                    </span>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;