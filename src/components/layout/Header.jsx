import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../api/userApi";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // ✅ Updated navigation to handle category & subcategory
  const handleCategoryClick = (parent, child) => {
    setMenuOpen(false);
    if (child) {
      navigate(
        `/products?category=${encodeURIComponent(
          parent
        )}&subcategory=${encodeURIComponent(child)}`
      );
    } else {
      navigate(`/products?category=${encodeURIComponent(parent)}`);
    }
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

  // ✅ Update counts from localStorage
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      }
    }
  };

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

          {/* Categories Dropdown */}
          <div className="hidden md:block relative group">
            <button className="flex items-center text-primary/80 font-medium">
              Categories
              <svg
                className="w-4 h-4 ml-1 text-primary/80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-56 -translate-y-2 z-50">
              <ul className="text-sm text-primary/60 py-2 font-medium">
                {isCategoriesLoading ? (
                  <li className="px-4 py-2 text-gray-400">Loading...</li>
                ) : isCategoriesError ? (
                  <li className="px-4 py-2 text-red-500">Error loading</li>
                ) : !categories || Object.keys(categories).length === 0 ? (
                  <li className="px-4 py-2 text-gray-400">No Categories</li>
                ) : (
                  Object.entries(categories).map(([parent, children]) => (
                    <li key={parent} className="px-4 py-2 hover:bg-gray-50">
                      <span className="font-semibold text-primary cursor-pointer hover:text-theme">
                        {parent}
                      </span>
                      <ul className="pl-3 mt-1">
                        {children.map((child, index) => (
                          <li
                            key={index}
                            onClick={() => handleCategoryClick(child)}
                            className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer text-primary/70"
                          >
                            {child}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center border border-gray-400 rounded-full px-4 py-2 w-1/2 max-sm:w-1/3 relative">
            <FaSearch className="text-gray-500 mr-3 max-sm:absolute " />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
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
        <nav className="hidden md:flex bg-primary text-white text-sm justify-center space-x-8">
          <p
            onClick={() => navigate("/products")}
            className="py-2 hover:text-orange-400 transition-colors duration-200 cursor-pointer"
          >
            All
          </p>
          {isCategoriesLoading ? (
            <p>Loading...</p>
          ) : isCategoriesError ? (
            <p>Error loading categories</p>
          ) : !categories || Object.keys(categories).length === 0 ? (
            <p>No categories</p>
          ) : (
            Object.entries(categories).map(([parent, children]) => (
              <div key={parent} className="group relative py-2">
                {/* --- Parent Category --- */}
                <p className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">
                  {parent}
                </p>

                {/* --- Dropdown (Subcategories) --- */}
                <div className="absolute hidden group-hover:block -translate-y- bg-white text-primary shadow-md mt-2 rounded w-48 z-50">
                  <ul className="text-sm py-2 font-medium">
                    {children.map((child, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategoryClick(child)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {child}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
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
          {isCategoriesLoading ? (
            <li className="px-6 py-3 text-gray-400">Loading...</li>
          ) : isCategoriesError ? (
            <li className="px-6 py-3 text-red-500">Error loading</li>
          ) : !categories || Object.keys(categories).length === 0 ? (
            <li className="px-6 py-3 text-gray-400">No Categories</li>
          ) : (
            Object.entries(categories).map(([parent, children]) => (
              <li key={parent} className="border-b last:border-b-0">
                {/* --- Parent Name --- */}
                <div className="px-6 py-3 font-semibold text-primary bg-gray-50 cursor-pointer">
                  {parent}
                </div>

                {/* --- Child Categories --- */}
                <ul>
                  {children.map((child, index) => (
                    <li
                      key={index}
                      onClick={() => handleCategoryClick(child)}
                      className="px-8 py-2 hover:bg-gray-100 cursor-pointer text-gray-600"
                    >
                      {child}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
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
