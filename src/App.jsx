import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProductsListing from "./pages/ProductsListing";
import DetailedProductPage from "./pages/DetailedProductPage";
import ScrollToTop from "./utils/ScrollToTop";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CompareProducts from "./pages/CompareProducts";

function App() {
  return (
    <div className="bg-mute">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsListing />} />
        <Route path="/products/:id" element={<DetailedProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/compare" element={<CompareProducts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
