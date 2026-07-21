import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <header className="shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-green-700">
          Earthmool
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Icons */}
        <div className="flex gap-5 text-2xl">
          <FiSearch className="cursor-pointer" />
          <FiUser className="cursor-pointer" />
          <FiShoppingCart className="cursor-pointer" />
        </div>

      </nav>
    </header>
  );
}

export default Navbar;