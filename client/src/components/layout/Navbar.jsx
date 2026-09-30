import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import CartDrawer from "../cart/CartDrawer";
import logo from "../../assets/images/logo/logo.png";

const navLinks = [
  { name: "Home", url: "/" },
  { name: "Shop", url: "/shop" },
  { name: "Our Masalas", url: "/our-masalas" },
  { name: "About Us", url: "/about-us" },
  { name: "Blog", url: "/blog" },
  { name: "Recipes", url: "/recipes" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, isCartOpen, openCart, closeCart } = useCart();

  /* =========================
     OPEN CART
  ========================= */
  const handleOpenCart = () => {
    setOpen(false);
    openCart();
  };

  /* =========================
     CLOSE CART
  ========================= */
  /* =========================
     CLOSE MOBILE MENU
  ========================= */
  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-8xl items-center justify-between px-6">

          {/* =================================================
              LOGO
          ================================================= */}
          <div className="flex h-20 items-center">
            <a
              href="/"
              aria-label="Earthmool Home"
            >
              <img
                src={logo}
                alt="Earthmool"
                className="h-20 w-auto cursor-pointer object-contain"
              />
            </a>
          </div>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="group relative cursor-pointer text-[15px] font-medium text-gray-800 transition hover:text-[#264B2A]"
              >
                {item.name}

                {/* Hover Underline */}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#264B2A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* =================================================
              DESKTOP ICONS
          ================================================= */}
          <div className="hidden items-center gap-5 lg:flex">

            {/* Search */}
            <button
              type="button"
              className="cursor-pointer text-gray-800 transition hover:text-[#264B2A]"
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            {/* User */}
            <button
              type="button"
              className="cursor-pointer text-gray-800 transition hover:text-[#264B2A]"
              aria-label="Account"
            >
              <User size={22} />
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={handleOpenCart}
              className="relative flex cursor-pointer items-center justify-center text-[#163824] transition hover:text-[#274E13]"
              aria-label={`Open cart, ${cartCount} items`}
            >
              <ShoppingCart size={22} />

              {/* Cart Count */}
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C28A32] px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center justify-center text-[#163824] lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* =====================================================
          CART DRAWER
      ===================================================== */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />

      {/* =====================================================
          MOBILE MENU OVERLAY
      ===================================================== */}
      <div
        onClick={handleCloseMenu}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* =====================================================
          MOBILE MENU DRAWER
      ===================================================== */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* =================================================
            MOBILE DRAWER HEADER
        ================================================= */}
        <div className="flex items-center justify-between border-b p-5">

          {/* Logo */}
          <a
            href="/"
            onClick={handleCloseMenu}
            aria-label="Earthmool Home"
          >
            <img
              src={logo}
              alt="Earthmool"
              className="h-9 w-auto object-contain"
            />
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleCloseMenu}
            className="cursor-pointer text-gray-700 transition hover:text-[#264B2A]"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

        </div>

        {/* =================================================
            MOBILE NAVIGATION LINKS
        ================================================= */}
        <nav className="flex flex-col">

          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="border-b px-6 py-4 text-gray-800 transition hover:bg-[#F5F3EC] hover:text-[#264B2A]"
              onClick={handleCloseMenu}
            >
              {item.name}
            </a>
          ))}

        </nav>

        {/* =================================================
            MOBILE BOTTOM ICONS
        ================================================= */}
        <div className="absolute bottom-8 left-6 flex items-center gap-6">

          {/* Search */}
          <button
            type="button"
            className="cursor-pointer text-gray-700 transition hover:text-[#264B2A]"
            aria-label="Search"
          >
            <Search size={22} />
          </button>

          {/* User */}
          <button
            type="button"
            className="cursor-pointer text-gray-700 transition hover:text-[#264B2A]"
            aria-label="Account"
          >
            <User size={22} />
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={handleOpenCart}
            className="relative cursor-pointer text-gray-700 transition hover:text-[#264B2A]"
            aria-label={`Open cart, ${cartCount} items`}
          >
            <ShoppingCart size={22} />

            {/* Mobile Cart Count */}
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C28A32] px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

        </div>

      </aside>
    </>
  );
}