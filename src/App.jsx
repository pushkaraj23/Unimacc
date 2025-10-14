import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProductsListing from "./pages/ProductsListing";
import DetailedProductPage from "./pages/DetailedProductPage";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <div className="bg-mute">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsListing />} />
        <Route path="/products/:id" element={<DetailedProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
