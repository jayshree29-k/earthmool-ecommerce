import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  ShoppingBag,
  IndianRupee,
  RefreshCw,
} from "lucide-react";
import { adminFetch } from "../../services/adminApi";

const API_URL = "http://localhost:5000";

function AdminCustomers() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminFetch(
        `${API_URL}/api/orders`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to fetch customers."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error(
        "Fetch customers error:",
        error
      );

      setError(
        error.message ||
          "Unable to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ==========================================
  // CREATE CUSTOMER LIST FROM ORDERS
  // ==========================================

  const customers = useMemo(() => {
    const customerMap = new Map();

    orders.forEach((order) => {
      const customer = order.customer;

      if (!customer) {
        return;
      }

      const email = (
        customer.email || ""
      )
        .trim()
        .toLowerCase();

      if (!email) {
        return;
      }

      const existingCustomer =
        customerMap.get(email);

      const orderTotal = Number(
        order.total || 0
      );

      if (existingCustomer) {
        existingCustomer.totalOrders += 1;

        existingCustomer.totalSpent +=
          orderTotal;

        // Keep latest order
        if (
          new Date(order.createdAt) >
          new Date(existingCustomer.lastOrderDate)
        ) {
          existingCustomer.lastOrderDate =
            order.createdAt;
        }
      } else {
        customerMap.set(email, {
          id: email,

          firstName:
            customer.firstName || "",

          lastName:
            customer.lastName || "",

          email,

          phone:
            customer.phone || "N/A",

          totalOrders: 1,

          totalSpent: orderTotal,

          lastOrderDate:
            order.createdAt,
        });
      }
    });

    return Array.from(
      customerMap.values()
    );
  }, [orders]);

  // ==========================================
  // FILTER CUSTOMERS
  // ==========================================

  const filteredCustomers = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    if (!searchValue) {
      return customers;
    }

    return customers.filter(
      (customer) => {
        const fullName =
          `${customer.firstName} ${customer.lastName}`
            .trim()
            .toLowerCase();

        return (
          fullName.includes(searchValue) ||
          customer.email.includes(
            searchValue
          ) ||
          customer.phone
            .toLowerCase()
            .includes(searchValue)
        );
      }
    );
  }, [customers, search]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalCustomers =
    customers.length;

  const totalOrders = orders.length;

  const totalRevenue = customers.reduce(
    (total, customer) =>
      total + customer.totalSpent,
    0
  );

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // CUSTOMER NAME
  // ==========================================

  const getCustomerName = (customer) => {
    const name =
      `${customer.firstName} ${customer.lastName}`
        .trim();

    return name || "Unknown Customer";
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFAF6] p-6 lg:p-10">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-12 text-center shadow-sm">
          <p className="text-gray-500">
            Loading customers...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#FCFAF6] p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-[#163824]">
              Customers
            </h1>

            <p className="mt-1 text-gray-500">
              Manage customers from your
              store orders.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchCustomers}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#274e13] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163824]"
          >
            <RefreshCw size={17} />

            Refresh
          </button>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ======================================
            STATISTICS
        ====================================== */}

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Customers */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
              <Users
                size={22}
                className="text-green-700"
              />
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Total Customers
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {totalCustomers}
            </h2>

          </div>

          {/* Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <ShoppingBag
                size={22}
                className="text-blue-700"
              />
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Total Orders
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {totalOrders}
            </h2>

          </div>

          {/* Revenue */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
              <IndianRupee
                size={22}
                className="text-orange-700"
              />
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Customer Revenue
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              ₹{totalRevenue}
            </h2>

          </div>

        </div>

        {/* ======================================
            SEARCH
        ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <div className="relative max-w-xl">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, email or phone..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#274e13] focus:bg-white"
            />

          </div>

        </div>

        {/* ======================================
            CUSTOMER TABLE
        ====================================== */}

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

            <div>
              <h2 className="text-lg font-semibold text-[#163824]">
                Customer List
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredCustomers.length}{" "}
                customer
                {filteredCustomers.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

          </div>

          {filteredCustomers.length === 0 ? (
            <div className="p-12 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f0e8]">
                <Users
                  size={25}
                  className="text-[#274e13]"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No customers found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {search
                  ? "Try changing your search."
                  : "Customers will appear here after orders are placed."}
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="border-b border-gray-100 bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Orders
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Total Spent
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Last Order
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredCustomers.map(
                    (customer) => (
                      <tr
                        key={customer.id}
                        className="transition hover:bg-gray-50"
                      >

                        {/* Customer */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f0e3] font-semibold text-[#274e13]">
                              {customer.firstName
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "C"}
                            </div>

                            <div>
                              <p className="font-semibold text-gray-900">
                                {getCustomerName(
                                  customer
                                )}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                Customer
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* Contact */}
                        <td className="px-6 py-5">

                          <p className="text-sm font-medium text-gray-900">
                            {customer.email}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {customer.phone}
                          </p>

                        </td>

                        {/* Orders */}
                        <td className="px-6 py-5">

                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {customer.totalOrders}{" "}
                            {customer.totalOrders ===
                            1
                              ? "Order"
                              : "Orders"}
                          </span>

                        </td>

                        {/* Total */}
                        <td className="px-6 py-5">

                          <p className="font-semibold text-[#274e13]">
                            ₹
                            {
                              customer.totalSpent
                            }
                          </p>

                        </td>

                        {/* Date */}
                        <td className="px-6 py-5 text-sm text-gray-500">
                          {formatDate(
                            customer.lastOrderDate
                          )}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default AdminCustomers;