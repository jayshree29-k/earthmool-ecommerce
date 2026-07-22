import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import Container from "../common/Container";

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-4xl font-bold text-green-900"
          >
            Earthmool
          </Link>

          {/* Menu */}
          <nav className="hidden lg:block">
            <ul className="flex gap-10">

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/shop">Shop</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/recipes">Recipes</Link>
              </li>

              <li>
                <Link to="/blog">Blog</Link>
              </li>

            </ul>
          </nav>

          {/* Icons */}

          <div className="flex gap-5">

            <Search size={22} />

            <User size={22} />

            <ShoppingCart size={22} />

          </div>

        </div>
      </Container>
    </header>
  );
}

export default Navbar;