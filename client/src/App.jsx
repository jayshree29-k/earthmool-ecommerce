import Footer from "./components/layout/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <Header />}
      <AppRoutes />
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;