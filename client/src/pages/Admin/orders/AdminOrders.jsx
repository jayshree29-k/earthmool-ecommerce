import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminFetch } from "../../../services/adminApi";

const API_URL = "http://localhost:5000";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminFetch(
        `${API_URL}/api/orders`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message || "Unable to fetch orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
      setError(
        error.message || "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getOrderNumber = (order) => {
    return order._id
      ? order._id.slice(-8).toUpperCase()
      : "N/A";
  };

  const getCustomerName = (order) => {
    return `${order.customer?.firstName || ""} ${
      order.customer?.lastName || ""
    }`.trim() || "Unknown Customer";
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-purple-100 text-purple-700";

      case "shipped":
        return "bg-indigo-100 text-indigo-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen bg-[#FCFAF6] p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#163824]">
              Orders
            </h1>

            <p className="mt-1 text-gray-500">
              Manage and view all customer orders.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            className="rounded-lg bg-[#274e13] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163824]"
          >
            Refresh Orders
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-gray-500">
              Loading orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          /* Empty */
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No orders found
            </h2>

            <p className="mt-2 text-gray-500">
              Customer orders will appear here after
              they place an order.
            </p>
          </div>
        ) : (
          /* Orders Table */
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="overflow-x-auto">
              <table className="min-w-full">

                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Items
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Order */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <p className="font-semibold text-[#163824]">
                          #{getOrderNumber(order)}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-5">
                        <p className="font-medium text-gray-900">
                          {getCustomerName(order)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.customer?.email}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                        {order.items?.length || 0}
                      </td>

                      {/* Total */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <p className="font-semibold text-[#274e13]">
                          ₹{order.total}
                        </p>
                      </td>

                      {/* Payment */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : order.paymentStatus === "failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus || "pending"}
                        </span>
                      </td>

                      {/* Order Status */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus || "pending"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Action */}
                      <td className="whitespace-nowrap px-6 py-5 text-right">
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#274e13] transition hover:bg-[#274e13] hover:text-white"
                        >
                          View
                        </Link>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

export default AdminOrders;