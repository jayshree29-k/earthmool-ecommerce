import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// ==========================================
// PUBLIC PAGES
// ==========================================

import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import OurMasalas from "../pages/OurMasalas/OurMasalas";
import Blog from "../pages/Blog/Blog";
import Recipes from "../pages/Recipes/Recipes";
import BlogDetails from "../pages/Blog/BlogDetails";
import RecipeDetails from "../pages/Recipes/RecipeDetails";
import InfoPage from "../pages/Info/InfoPage";

// ==========================================
// ADMIN
// ==========================================

import AdminLayout from "../pages/Admin/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";

// Products
import AdminProducts from "../pages/Admin/products/AdminProducts";
import AddProduct from "../pages/Admin/products/AddProduct";
import EditProduct from "../pages/Admin/products/EditProduct";

// Orders
import Orders from "../pages/Admin/orders/Orders";
import OrderDetail from "../pages/Admin/orders/OrderDetail";
import AdminCustomers from "../pages/Admin/AdminCustomers";
import AdminLogin from "../pages/Admin/AdminLogin";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

function AppRoutes() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>

      {/* ======================================
          PUBLIC ROUTES
      ====================================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/shop"
        element={<Shop />}
      />

      <Route
        path="/product/:slug"
        element={<ProductDetails />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route path="/our-masalas" element={<OurMasalas />} />

      <Route path="/about-us" element={<About />} />

      <Route path="/blog" element={<Blog />} />

      <Route path="/blog/:slug" element={<BlogDetails />} />

      <Route path="/recipes" element={<Recipes />} />

      <Route path="/recipes/:id" element={<RecipeDetails />} />

      <Route path="/our-story" element={<InfoPage page="our-story" />} />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route path="/faqs" element={<InfoPage page="faqs" />} />
      <Route path="/shipping" element={<InfoPage page="shipping" />} />
      <Route path="/returns" element={<InfoPage page="returns" />} />
      <Route path="/privacy-policy" element={<InfoPage page="privacy-policy" />} />
      <Route path="/terms" element={<InfoPage page="terms" />} />

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      <Route
        path="/order-success"
        element={<OrderSuccess />}
      />

      <Route
        path="/order/:id"
        element={<OrderDetails />}
      />


      {/* ======================================
          ADMIN ROUTES
      ====================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        element={<ProtectedAdminRoute />}
      >
        <Route
          path="/admin"
          element={<AdminLayout />}
        >

        {/* /admin */}
        <Route
          index
          element={<AdminDashboard />}
        />

        {/* ==================================
            PRODUCTS
        ================================== */}

        {/* /admin/products */}
        <Route
          path="products"
          element={<AdminProducts />}
        />

        {/* /admin/products/add */}
        <Route
          path="products/add"
          element={<AddProduct />}
        />

        {/* /admin/products/edit/:id */}
        <Route
          path="products/edit/:id"
          element={<EditProduct />}
        />


        {/* ==================================
            ORDERS
        ================================== */}

        {/* /admin/orders */}
        <Route
          path="orders"
          element={<Orders />}
        />

        {/* /admin/orders/:id */}
        <Route
          path="orders/:id"
          element={<OrderDetail />}
        />

        <Route
        path="customers"
        element={<AdminCustomers />}
      />

        </Route>
      </Route>

    </Routes>
  );
}

export default AppRoutes;