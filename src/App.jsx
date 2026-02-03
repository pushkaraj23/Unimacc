import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/cart/CartDrawer";
import { CartDrawerProvider } from "./context/CartDrawerContext";
import ProductsListing from "./pages/ProductsListing";
import DetailedProductPage from "./pages/DetailedProductPage";
import ScrollToTop from "./utils/ScrollToTop";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CompareProducts from "./pages/CompareProducts";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OffersPage from "./pages/OffersPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ReturnRefundPolicy from "./pages/ReturnRefundPolicy";
import BlogsDetailed from "./pages/BlogsDetailed";
import OrderDetails from "./components/profile/OrderDetails";
import BlogsPage from "./pages/BlogsPage";
import LoginPopup from "./pages/LoginPopup";
import { LoginPopupProvider } from "./pages/LoginPopupContext";
import DiscountCards from "./pages/DiscountCards";
import CreatorCollectionPage from "./components/home/CreatorCollectionPage";

function App() {
  return (
    <LoginPopupProvider>
      <CartDrawerProvider>
        <div className="bg-white">
          <Header />
          <CartDrawer />
          <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/creator/:id" element={<CreatorCollectionPage />} />
          <Route path="/products" element={<ProductsListing />} />
          <Route path="/products/:id" element={<DetailedProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/compare" element={<CompareProducts />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/offers/:id" element={<OffersPage />} />
          <Route path="/offers" element={<DiscountCards />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogsDetailed />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/shipping_policy" element={<ShippingPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/return_refund_policy" element={<ReturnRefundPolicy />} />
        </Routes>
          <Footer />

          <LoginPopup />
        </div>
      </CartDrawerProvider>
    </LoginPopupProvider>
  );
}

export default App;
