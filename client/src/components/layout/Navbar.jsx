import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

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

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-8xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center h-25">
          <img
            src={logo}
            alt="Earthmool"
            className="cursor-pointer h-20 w-auto object-contain"
          />
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="cursor-pointer relative text-[15px] text-gray-800 font-medium hover:text-[#264B2A] transition"
              >
                {item.name}

                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#264B2A] transition-all duration-300 hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-5">

            <button className="cursor-pointer hover:text-[#264B2A] transition">
              <Search size={22} />
            </button>

            <button className="cursor-pointer hover:text-[#264B2A] transition">
              <User size={22} />
            </button>

            <button className="cursor-pointer relative hover:text-[#264B2A] transition">
              <ShoppingCart size={22} />

              <span className="absolute -top-2 -right-2 bg-[#264B2A] text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b">

          <img
            src={logo}
            alt=""
            className="h-9"
          />

          <button onClick={() => setOpen(false)}>
            <X />
          </button>

        </div>

        {/* Links */}
        <div className="flex flex-col">

          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="px-6 py-4 border-b hover:bg-[#F5F3EC] transition"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </a>
          ))}

        </div>

        {/* Bottom Icons */}

        <div className="absolute bottom-8 left-6 flex gap-6">

          <Search />

          <User />

          <ShoppingCart />

        </div>

      </aside>
    </>
  );
}