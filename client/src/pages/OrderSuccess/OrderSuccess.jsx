import {
  CheckCircle,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6] px-4 py-16">
        <div className="text-center">

          <Package
            size={50}
            className="mx-auto text-[#274E13]"
          />

          <h1 className="mt-6 text-3xl font-bold text-[#163824]">
            Order Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            We couldn't find your order details.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-xl bg-[#274E13] px-7 py-3 font-semibold text-white transition hover:bg-[#163824]"
          >
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6] px-4 py-12 sm:py-16">

      <div className="mx-auto max-w-3xl">

        {/* SUCCESS */}

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF4E4]">
            <CheckCircle
              size={46}
              className="text-[#274E13]"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#163824] sm:text-4xl">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for shopping with Earthmool.
          </p>

        </div>

        {/* ORDER CARD */}

        <div className="mt-10 rounded-2xl border border-[#E5DED2] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Order Number
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#274E13]">
                #{order.orderNumber}
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Total
              </p>

              <p className="mt-1 text-2xl font-bold text-[#163824]">
                ₹{order.total}
              </p>
            </div>

          </div>

          {/* STATUS */}

          <div className="grid gap-4 py-6 sm:grid-cols-2">

            <div className="rounded-xl bg-[#F8F4EC] p-4">

              <div className="flex items-center gap-3">

                <Package
                  size={20}
                  className="text-[#274E13]"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Order Status
                  </p>

                  <p className="mt-1 font-semibold capitalize text-[#163824]">
                    {order.status || "Pending"}
                  </p>
                </div>

              </div>

            </div>

            <div className="rounded-xl bg-[#F8F4EC] p-4">

              <div className="flex items-center gap-3">

                <Truck
                  size={20}
                  className="text-[#274E13]"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Payment Status
                  </p>

                  <p className="mt-1 font-semibold capitalize text-[#163824]">
                    {order.paymentStatus || "Pending"}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* MESSAGE */}

          <div className="rounded-xl border border-[#DDE9D7] bg-[#F4F9F1] p-5">

            <p className="text-sm leading-6 text-[#35512E]">
              Your order has been received successfully.
              We'll process your order and keep you updated
              about its status.
            </p>

              <Link
                to={`/order/${order.id}`}
                className="inline-flex items-center justify-center rounded-xl border border-[#274E13] px-7 py-3.5 text-sm font-semibold text-[#274E13] transition hover:bg-[#274E13] hover:text-white"
              >
                View Order Details
              </Link>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#274E13] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#163824]"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}

export default OrderSuccess;