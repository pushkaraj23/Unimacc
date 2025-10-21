import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome
} from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setMenuOpen(false);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  // ✅ Scroll hide/show header
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  // ✅ Update counts
  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const compare = JSON.parse(localStorage.getItem("compare")) || [];
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
    setCompareCount(compare.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("storage", updateCounts);
    window.addEventListener("localStorageUpdated", updateCounts);
    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("localStorageUpdated", updateCounts);
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full bg-white shadow-sm z-50 transform transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-6 py-3 max-sm:py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Hamburger for mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-xl text-gray-700"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Logo */}
            <img
              src="/logo.svg"
              alt="Unimacc Logo"
              className="h-8 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Search (hidden on mobile) */}
          <div className="flex items-center border border-gray-400 rounded-full px-4 py-2 w-1/2 max-sm:w-1/3 relative">
            <FaSearch className="text-gray-500 mr-3 max-sm:absolute " />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent flex-grow outline-none text-gray-700 placeholder-gray-400 max-sm:ml-6 w-full"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-700 text-xl relative max-sm:pr-3">
            {/* Compare */}
            <div className="relative md:block">
              <MdCompareArrows
                onClick={() => navigate("/compare")}
                className="cursor-pointer hover:text-orange-500"
                title="Compare"
              />
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </div>

            {/* Wishlist */}
            <div className="relative hidden md:block">
              <FaHeart
                onClick={() => navigate("/wishlist")}
                className="cursor-pointer hover:text-orange-500"
                title="Wishlist"
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="relative hidden md:block">
              <FaShoppingCart
                onClick={() => navigate("/cart")}
                className="cursor-pointer hover:text-orange-500"
                title="Cart"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Profile */}
            <FaUserCircle
              onClick={() => navigate("/profile")}
              className="text-orange-500 cursor-pointer text-2xl hidden md:block"
              title="Account"
            />
          </div>
        </div>

        {/* Desktop Bottom Nav */}
        <nav className="hidden md:flex bg-black text-white text-sm justify-center space-x-8 py-2">
          {[
            "Washbasin",
            "Kitchen",
            "Toilets",
            "Faucets",
            "Showers",
            "Drains",
            "Racks",
          ].map((item) => (
            <p
              key={item}
              onClick={() => handleCategoryClick(item)}
              className="hover:text-orange-400 transition-colors hover:cursor-pointer duration-200"
            >
              {item}
            </p>
          ))}
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white h-full shadow-lg z-40 transform transition-transform duration-300 pt-20 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold my-3 px-6">Categories</h2>
        <ul className="text-gray-700">
          {[
            "Washbasin",
            "Kitchen",
            "Toilets",
            "Faucets",
            "Showers",
            "Drains",
            "Racks",
          ].map((item) => (
            <li
              key={item}
              onClick={() => handleCategoryClick(item)}
              className="px-6 py-3 border-b hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 z-50 left-0 w-full bg-white shadow-t flex justify-around items-center py-3 md:hidden border-t">
        <div
          onClick={() => navigate("/")}
          className="text-center text-gray-700"
        >
          <FaHome className="mx-auto text-lg mb-1" size={22} />
          <p className="text-xs">Home</p>
        </div>
        <div
          onClick={() => navigate("/wishlist")}
          className="text-center text-gray-700 relative"
        >
          <FaHeart className="mx-auto text-lg mb-1" size={22} />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-4 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <p className="text-xs">Wishlist</p>
        </div>
        <div
          onClick={() => navigate("/cart")}
          className="text-center text-gray-700 relative"
        >
          <FaShoppingCart className="mx-auto text-lg mb-1" size={22} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-4 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <p className="text-xs">Cart</p>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="text-center text-gray-700"
        >
          <FaUserCircle
            className="mx-auto text-lg text-orange-500 mb-1"
            size={22}
          />
          <p className="text-xs">Account</p>
        </div>
      </div>
    </>
  );
};

export default Header;
