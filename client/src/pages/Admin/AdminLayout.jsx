import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
  Menu,
  X,
  LogOut,
  Users,
} from "lucide-react";
import { useState } from "react";
import useAdminAuth from "../../hooks/useAdminAuth";

function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
   {
        name: "Customers",
        path: "/admin/customers",
        icon: Users,
    },
  ];

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-[#274e13] text-white"
        : "text-gray-600 hover:bg-[#f3f0e8] hover:text-[#163824]"
    }`;

  return (
    <div className="min-h-screen bg-[#FCFAF6]">

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setSidebarOpen(true)
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="font-bold text-[#163824]">
              Earthmool
            </h1>

            <p className="text-xs text-gray-500">
              Admin Panel
            </p>
          </div>
        </div>

        <Store
          size={21}
          className="text-[#274e13]"
        />
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">

          <div>
            <h1 className="text-xl font-bold text-[#163824]">
              Earthmool
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Admin Panel
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">

          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Management
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={linkClasses}
                onClick={() =>
                  setSidebarOpen(false)
                }
              >
                <Icon size={19} />

                <span>
                  {item.name}
                </span>
              </NavLink>
            );
          })}

          <div className="my-5 border-t border-gray-100" />

          <a
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#f3f0e8] hover:text-[#163824]"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <Store size={19} />

            <span>
              View Store
            </span>
          </a>

        </nav>

        {/* Bottom */}
        <div className="border-t border-gray-100 p-4">

          <div className="mb-3 px-4">
            <p className="truncate text-sm font-semibold text-[#163824]">
              {admin?.name}
            </p>
            <p className="truncate text-xs text-gray-500">
              {admin?.email}
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">

        <main>
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;