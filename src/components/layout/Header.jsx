import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white shadow-sm z-50 transform transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo + Categories */}
        <div className="flex items-center space-x-8">
          <img src="/logo.svg" alt="Unimacc Logo" className="h-8" />

          {/* Categories Dropdown */}
          <div className="relative group">
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
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40 -translate-y-2">
              <ul className="text-sm text-primary/60 py-2 font-medium">
                {["Washbasin", "Kitchen", "Toilets", "Faucets"].map((item) => (
                  <li
                    key={item}
                    onClick={() => handleCategoryClick(item)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-[#1a1a1a]/75 rounded-full px-4 py-2 w-1/2">
          <FaSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent flex-grow outline-none text-gray-700 placeholder-gray-400"
          />
          <div className="relative group">
            <button className="flex items-center text-gray-700 text-sm font-medium py-1">
              All Products
              <svg
                className="w-3 h-3 ml-1 text-gray-500"
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
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40 -translate-y-2">
              <ul className="text-sm text-gray-600">
                {["Washbasin", "Kitchen", "Toilets", "Faucets"].map((item) => (
                  <li
                    key={item}
                    onClick={() => handleCategoryClick(item)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700 text-xl">
          <MdCompareArrows
            className="cursor-pointer hover:text-orange-500"
            title="Compare"
          />
          <FaHeart
            className="cursor-pointer hover:text-orange-500"
            title="Wishlist"
          />
          <FaShoppingCart
            className="cursor-pointer hover:text-orange-500"
            title="Cart"
          />
          <FaUserCircle
            className="text-orange-500 cursor-pointer text-2xl"
            title="Account"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-black text-white text-sm flex justify-center space-x-8 py-2">
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
  );
};

export default Header;
