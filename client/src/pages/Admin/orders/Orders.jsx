import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { adminFetch } from "../../../services/adminApi";

const API_URL = "http://localhost:5000/api";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

function Orders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [updatingId, setUpdatingId] =
    useState(null);

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminFetch(
        `${API_URL}/orders`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to fetch orders."
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to fetch orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error(
        "Fetch orders error:",
        error
      );

      setError(
        error.message ||
          "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // ==========================================
  // CUSTOMER NAME
  // ==========================================

  const getCustomerName = (order) => {
    const firstName =
      order.customer?.firstName || "";

    const lastName =
      order.customer?.lastName || "";

    const fullName = `${firstName} ${lastName}`.trim();

    return fullName || "Customer";
  };

  // ==========================================
  // ORDER NUMBER
  // ==========================================

  const getOrderNumber = (order) => {
    if (!order?._id) {
      return "N/A";
    }

    return order._id
      .toString()
      .slice(-8)
      .toUpperCase();
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    switch (
      String(status || "").toLowerCase()
    ) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";

      case "confirmed":
        return "bg-blue-100 text-blue-800";

      case "processing":
        return "bg-purple-100 text-purple-800";

      case "shipped":
        return "bg-indigo-100 text-indigo-800";

      case "delivered":
        return "bg-green-100 text-green-800";

      case "cancelled":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================================
  // PAYMENT STATUS CLASS
  // ==========================================

  const getPaymentStatusClass = (
    status
  ) => {
    switch (
      String(status || "").toLowerCase()
    ) {
      case "paid":
        return "bg-green-100 text-green-800";

      case "failed":
        return "bg-red-100 text-red-800";

      case "pending":
        return "bg-yellow-100 text-yellow-800";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================================
  // FILTER ORDERS
  // ==========================================

  const filteredOrders = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return orders.filter((order) => {
      const customerName =
        getCustomerName(order).toLowerCase();

      const customerEmail =
        order.customer?.email
          ?.toLowerCase() || "";

      const orderNumber =
        getOrderNumber(order).toLowerCase();

      const matchesSearch =
        !searchValue ||
        customerName.includes(
          searchValue
        ) ||
        customerEmail.includes(
          searchValue
        ) ||
        orderNumber.includes(
          searchValue
        );

      const matchesStatus =
        statusFilter === "all" ||
        String(
          order.orderStatus || ""
        ).toLowerCase() ===
          statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [orders, search, statusFilter]);

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateOrderStatus = async (
    orderId,
    status
  ) => {
    try {
      setUpdatingId(orderId);

      const response = await adminFetch(
        `${API_URL}/orders/${orderId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
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

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: status,
              }
            : order
        )
      );

      setSelectedOrder((previous) =>
        previous?._id === orderId
          ? {
              ...previous,
              orderStatus: status,
            }
          : previous
      );
    } catch (error) {
      console.error(
        "Update order status error:",
        error
      );

      alert(
        error.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // DELETE ORDER
  // ==========================================

  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await adminFetch(
        `${API_URL}/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to delete order."
        );
      }

      setOrders((previousOrders) =>
        previousOrders.filter(
          (order) =>
            order._id !== orderId
        )
      );

      if (
        selectedOrder?._id === orderId
      ) {
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error(
        "Delete order error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete order."
      );
    }
  };

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "pending"
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      order.orderStatus ===
        "processing" ||
      order.orderStatus === "confirmed"
  ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.orderStatus === "delivered"
  ).length;

  const totalRevenue = orders
    .filter(
      (order) =>
        order.orderStatus !== "cancelled"
    )
    .reduce(
      (total, order) =>
        total +
        Number(order.total || 0),
      0
    );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <RefreshCw
            className="mx-auto animate-spin text-green-700"
            size={30}
          />

          <p className="mt-3 text-gray-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f7f8f5] p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#163824]">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track customer orders.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#274e13] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163824]"
        >
          <RefreshCw size={17} />
          Refresh Orders
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalOrders}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingOrders}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Processing
          </p>

          <p className="mt-2 text-3xl font-bold text-purple-600">
            {processingOrders}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Delivered
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {deliveredOrders}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <p className="mt-2 text-3xl font-bold text-[#163824]">
            {formatPrice(totalRevenue)}
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by order number, customer or email..."
              className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-700"
          >
            <option value="all">
              All Statuses
            </option>

            {STATUS_OPTIONS.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status
                    .charAt(0)
                    .toUpperCase() +
                    status.slice(1)}
                </option>
              )
            )}
          </select>

        </div>
      </div>

      {/* Orders */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        {filteredOrders.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No orders found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {orders.length === 0
                ? "There are no orders in your database yet."
                : "Try changing your search or status filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Items
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrders.map(
                  (order) => (
                    <tr
                      key={order._id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Order */}
                      <td className="px-5 py-5">
                        <p className="font-semibold text-[#163824]">
                          #
                          {getOrderNumber(
                            order
                          )}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.paymentMethod ||
                            "online"}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-5">
                        <p className="font-medium text-gray-900">
                          {getCustomerName(
                            order
                          )}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.customer
                            ?.email || "-"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.customer
                            ?.phone || "-"}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="px-5 py-5">
                        <p className="text-sm text-gray-700">
                          {order.items
                            ?.length || 0}{" "}
                          product
                          {(order.items
                            ?.length || 0) !== 1
                            ? "s"
                            : ""}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.items
                            ?.reduce(
                              (
                                total,
                                item
                              ) =>
                                total +
                                Number(
                                  item.quantity ||
                                    0
                                ),
                              0
                            ) || 0}{" "}
                          units
                        </p>
                      </td>

                      {/* Total */}
                      <td className="px-5 py-5">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(
                            order.total
                          )}
                        </p>

                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-medium ${getPaymentStatusClass(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus ||
                            "pending"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">

                        <select
                          value={
                            order.orderStatus ||
                            "pending"
                          }
                          disabled={
                            updatingId ===
                            order._id
                          }
                          onChange={(
                            event
                          ) =>
                            updateOrderStatus(
                              order._id,
                              event.target
                                .value
                            )
                          }
                          className={`rounded-full border-0 px-3 py-2 text-xs font-semibold outline-none ${getStatusClass(
                            order.orderStatus
                          )}`}
                        >
                          {STATUS_OPTIONS.map(
                            (status) => (
                              <option
                                key={status}
                                value={
                                  status
                                }
                              >
                                {status
                                  .charAt(
                                    0
                                  )
                                  .toUpperCase() +
                                  status.slice(
                                    1
                                  )}
                              </option>
                            )
                          )}
                        </select>

                      </td>

                      {/* Date */}
                      <td className="px-5 py-5">
                        <p className="text-sm text-gray-700">
                          {formatDate(
                            order.createdAt
                          )}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-5">
                        <div className="flex items-center justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedOrder(
                                order
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-green-100 hover:text-green-700"
                            title="View order"
                          >
                            <Eye
                              size={17}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteOrder(
                                order._id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
                            title="Delete order"
                          >
                            <Trash2
                              size={17}
                            />
                          </button>

                        </div>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">

              <div>
                <h2 className="text-xl font-bold text-[#163824]">
                  Order #
                  {getOrderNumber(
                    selectedOrder
                  )}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {formatDate(
                    selectedOrder.createdAt
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X size={18} />
              </button>

            </div>

            <div className="space-y-6 p-6">

              {/* Customer */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </h3>

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="font-semibold text-gray-900">
                    {getCustomerName(
                      selectedOrder
                    )}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {selectedOrder.customer
                      ?.email || "-"}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {selectedOrder.customer
                      ?.phone || "-"}
                  </p>

                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Shipping Address
                </h3>

                <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700">

                  <p>
                    {
                      selectedOrder
                        .shippingAddress
                        ?.address
                    }
                  </p>

                  {selectedOrder
                    .shippingAddress
                    ?.apartment && (
                    <p className="mt-1">
                      {
                        selectedOrder
                          .shippingAddress
                          .apartment
                      }
                    </p>
                  )}

                  <p className="mt-1">
                    {
                      selectedOrder
                        .shippingAddress
                        ?.city
                    }
                    ,{" "}
                    {
                      selectedOrder
                        .shippingAddress
                        ?.state
                    }{" "}
                    -{" "}
                    {
                      selectedOrder
                        .shippingAddress
                        ?.pincode
                    }
                  </p>

                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Products
                </h3>

                <div className="divide-y divide-gray-200 rounded-xl border border-gray-200">

                  {selectedOrder.items?.map(
                    (item, index) => (
                      <div
                        key={`${item.productId}-${index}`}
                        className="flex gap-4 p-4"
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />

                        <div className="min-w-0 flex-1">

                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Quantity:{" "}
                            {item.quantity}
                          </p>

                        </div>

                        <p className="font-semibold text-gray-900">
                          {formatPrice(
                            item.total
                          )}
                        </p>

                      </div>
                    )
                  )}

                </div>
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-[#f8f3ea] p-5">

                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Subtotal
                  </span>

                  <span>
                    {formatPrice(
                      selectedOrder.subtotal
                    )}
                  </span>
                </div>

                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>
                    Shipping
                  </span>

                  <span>
                    {formatPrice(
                      selectedOrder.shipping
                    )}
                  </span>
                </div>

                <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-[#163824]">
                  <span>Total</span>

                  <span>
                    {formatPrice(
                      selectedOrder.total
                    )}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Orders;