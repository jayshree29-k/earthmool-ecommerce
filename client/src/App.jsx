import Footer from "./components/layout/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;