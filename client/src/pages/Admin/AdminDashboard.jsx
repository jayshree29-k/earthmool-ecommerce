import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import { adminFetch } from "../../services/adminApi";

const API_URL = "http://localhost:5000";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsResponse, ordersResponse] =
        await Promise.all([
          adminFetch(
            `${API_URL}/api/products/admin/all`
          ),
          adminFetch(`${API_URL}/api/orders`),
        ]);

      const productsData =
        await productsResponse.json();

      const ordersData =
        await ordersResponse.json();

      if (
        !productsResponse.ok ||
        !productsData.success
      ) {
        throw new Error(
          productsData.message ||
            "Unable to fetch products."
        );
      }

      if (
        !ordersResponse.ok ||
        !ordersData.success
      ) {
        throw new Error(
          ordersData.message ||
            "Unable to fetch orders."
        );
      }

      setProducts(productsData.products || []);
      setOrders(ordersData.orders || []);
    } catch (error) {
      console.error(
        "Dashboard fetch error:",
        error
      );

      setError(
        error.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statistics = useMemo(() => {
    const totalProducts = products.length;

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) =>
        order.orderStatus === "pending"
    ).length;

    const deliveredOrders = orders.filter(
      (order) =>
        order.orderStatus === "delivered"
    ).length;

    const totalSales = orders
      .filter(
        (order) =>
          order.orderStatus !== "cancelled"
      )
      .reduce(
        (total, order) =>
          total + Number(order.total || 0),
        0
      );

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalSales,
    };
  }, [products, orders]);

  const recentOrders = orders.slice(0, 5);

  const getOrderNumber = (order) => {
    if (!order?._id) {
      return "N/A";
    }

    return order._id
      .slice(-8)
      .toUpperCase();
  };

  const getCustomerName = (order) => {
    const firstName =
      order.customer?.firstName || "";

    const lastName =
      order.customer?.lastName || "";

    return (
      `${firstName} ${lastName}`.trim() ||
      "Unknown Customer"
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

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFAF6] p-6 lg:p-10">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-12 text-center shadow-sm">
          <p className="text-gray-500">
            Loading dashboard...
          </p>
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
            <h1 className="text-3xl font-bold text-[#163824]">
              Dashboard
            </h1>

            <p className="mt-1 text-gray-500">
              Welcome to your Earthmool admin
              dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchDashboardData}
            className="rounded-lg bg-[#274e13] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163824]"
          >
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {/* Products */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                <Package
                  size={22}
                  className="text-green-700"
                />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Total Products
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {statistics.totalProducts}
            </h2>
          </div>

          {/* Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                <ShoppingBag
                  size={22}
                  className="text-blue-700"
                />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Total Orders
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {statistics.totalOrders}
            </h2>
          </div>

          {/* Pending */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">
                <Clock
                  size={22}
                  className="text-yellow-700"
                />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Pending Orders
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {statistics.pendingOrders}
            </h2>
          </div>

          {/* Delivered */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                <CheckCircle
                  size={22}
                  className="text-green-700"
                />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Delivered
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {statistics.deliveredOrders}
            </h2>
          </div>

          {/* Sales */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                <IndianRupee
                  size={22}
                  className="text-orange-700"
                />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Total Sales
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              ₹{statistics.totalSales}
            </h2>
          </div>

        </div>

        {/* Quick Links */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <Link
            to="/admin/products"
            className="group rounded-2xl bg-[#274e13] p-6 text-white transition hover:bg-[#163824]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Manage Products
                </h2>

                <p className="mt-2 text-sm text-white/70">
                  Add, edit, delete and manage
                  product status.
                </p>
              </div>

              <ArrowRight
                size={22}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="group rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#163824]">
                  Manage Orders
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  View customer orders and update
                  order status.
                </p>
              </div>

              <ArrowRight
                size={22}
                className="text-[#274e13] transition group-hover:translate-x-1"
              />
            </div>
          </Link>

        </div>

        {/* Recent Orders */}
        <section className="mt-8 rounded-2xl bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-[#163824]">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest customer orders
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="flex items-center gap-2 text-sm font-semibold text-[#274e13] hover:underline"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">

                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="font-semibold text-[#274e13] hover:underline"
                        >
                          #{getOrderNumber(order)}
                        </Link>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-medium text-gray-900">
                          {getCustomerName(order)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.customer?.email}
                        </p>
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-900">
                        ₹{order.total}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus ||
                            "pending"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-500">
                        {formatDate(
                          order.createdAt
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default AdminDashboard;