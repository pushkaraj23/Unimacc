import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaExchangeAlt, FaTruck } from "react-icons/fa";
import { useCartDrawer } from "../../context/CartDrawerContext";

const ItemCard = ({ product }) => {
  const { openCartDrawer } = useCartDrawer();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [tempMessage, setTempMessage] = useState("");
  const [hoveredButton, setHoveredButton] = useState(null); // 👈 NEW

  const showTempMessage = (msg) => {
    setTempMessage(msg);
    setTimeout(() => setTempMessage(""), 3000);
  };

  const {
    id,
    name,
    category,
    imagepath = [],
    mrp,
    sellingprice,
    discountpercent,
  } = product || {};

  const originalPrice = mrp ? parseFloat(mrp) : 0;
  const price = sellingprice ? parseFloat(sellingprice) : 0;
  const images =
    product?.stocktable?.[0]?.images?.length > 0
      ? product.stocktable[0].images
      : imagepath;

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some((item) => item.id === id));

    const compareList = JSON.parse(localStorage.getItem("compare")) || [];
    setIsCompared(compareList.some((item) => item.id === id));

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setIsInCart(cart.some((item) => item.id === id));
  }, [id]);

  // 🛒 CART
  const handleAddToCart = (e) => {
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex((item) => item.id === id);

    let updatedCart;
    if (existingIndex !== -1) {
      updatedCart = existingCart.filter((item) => item.id !== id);
      setIsInCart(false);
      showTempMessage("🗑️ Removed from Cart");
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
      setIsInCart(true);
      showTempMessage("🛒 Added to Cart");
      openCartDrawer();
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // 💖 WISHLIST
  const handleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingIndex = wishlist.findIndex((item) => item.id === id);

    let updatedWishlist;
    if (existingIndex !== -1) {
      updatedWishlist = wishlist.filter((item) => item.id !== id);
      setIsWishlisted(false);
      showTempMessage("💔 Removed from Wishlist");
    } else {
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
      showTempMessage("💖 Added to Wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // 🔁 COMPARE
  const handleCompare = (e) => {
    e.stopPropagation();
    const compareList = JSON.parse(localStorage.getItem("compare")) || [];
    const existingIndex = compareList.findIndex((item) => item.id === id);

    let updatedCompare;
    if (existingIndex !== -1) {
      updatedCompare = compareList.filter((item) => item.id !== id);
      setIsCompared(false);
      showTempMessage("❌ Removed from Compare");
    } else {
      updatedCompare = [...compareList, product];
      setIsCompared(true);
      showTempMessage("🔁 Added to Compare");
    }

    localStorage.setItem("compare", JSON.stringify(updatedCompare));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  return (
    <div
      onClick={() => navigate(`/products/${id}`)}
      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:cursor-pointer transition-all duration-300 relative group"
    >
      {/* Product Image */}
      <div className="relative w-full h-[220px] sm:h-[250px] md:h-[280px] overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover rounded-t-xl transition-opacity duration-500 group-hover:opacity-0"
        />
        {images[1] && (
          <img
            src={images[1]}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {discountpercent !== 0 && (
          <div className="absolute top-2 left-8 -translate-x-1/2 flex justify-between items-center bg-theme text-white text-xs md:text-[.9vw] font-semibold px-3 py-1.5 rounded-full">
            <span className="text-end">
              {discountpercent}%<br /> OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-3 py-2 text-left">
        <p className="text-gray-400 text-xs sm:text-sm">{category || "—"}</p>
        <h3
          className="font-semibold text-primary text-sm sm:text-base leading-snug truncate"
          title={name}
        >
          {name?.length > 50 ? `${name.slice(0, 50)}…` : name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-base sm:text-lg">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice > 0 && discountpercent !== 0 && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {discountpercent !== 0 && (
            <span className="text-theme text-xs sm:text-sm font-semibold">
              {discountpercent}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center my-2 gap-2 relative">
          {/* 🛒 Add to Cart */}
          <div
            onMouseEnter={() => setHoveredButton("cart")}
            onMouseLeave={() => setHoveredButton(null)}
            className="transition-opacity duration-300 relative"
          >
            {hoveredButton === "cart" && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#263243] text-white text-xs px-2 py-1 rounded-md shadow-md opacity-90 whitespace-nowrap">
                Add to Cart
              </div>
            )}
            <div
              onClick={handleAddToCart}
              className={`p-1.5 sm:p-2.5 rounded-full border cursor-pointer flex items-center gap-2 transition-colors ${
                isInCart
                  ? "bg-theme text-white border-theme shadow-md"
                  : "bg-white text-primary hover:bg-theme hover:text-white border-gray-300 hover:border-white"
              }`}
            >
              <p className="text-xs max-sm:text-[2.3vw]">
                {isInCart ? "Added" : "Add"} to Cart
              </p>
              {!isInCart && (
                <FaShoppingCart className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
              )}
            </div>
          </div>

          {/* 💖 Wishlist */}
          <div
            onMouseEnter={() => setHoveredButton("wishlist")}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative transition-opacity duration-300"
          >
            {hoveredButton === "wishlist" && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#263243] text-white text-xs px-2 py-1 rounded-md shadow-md opacity-90 whitespace-nowrap">
                Wishlist
              </div>
            )}
            <div
              onClick={handleWishlist}
              className={`p-1.5 sm:p-2.5 rounded-full cursor-pointer border transition-colors ${
                isWishlisted
                  ? "bg-theme text-white border-theme shadow-md"
                  : "bg-white hover:bg-theme hover:text-white border-gray-300 hover:border-white"
              }`}
            >
              <FaHeart className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* 🔁 Compare */}
          <div
            onMouseEnter={() => setHoveredButton("compare")}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative transition-opacity duration-300"
          >
            {hoveredButton === "compare" && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#263243] text-white text-xs px-2 py-1 rounded-md shadow-md opacity-90 whitespace-nowrap">
                Compare
              </div>
            )}
            <button
              onClick={handleCompare}
              className={`border rounded-md p-1.5 sm:p-2.5 transition-colors ${
                isCompared
                  ? "bg-theme text-white border-theme"
                  : "border-gray-300 hover:bg-theme hover:text-white"
              }`}
            >
              <FaExchangeAlt className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
         <div className="inline-flex items-center gap-2 px-2 mt-1 py-1  rounded-full text-gray-600 text-md italic font-semibold ">
            <FaTruck className="text-lg " />
            Free Shipping
          </div>
      </div>

      {/* ✅ Temporary Message */}
      {tempMessage && (
        <div className="absolute bottom-16 left-2">
          <div className="bg-black text-white shadow-2xl text-xs px-3 py-1 rounded-md opacity-90 animate-fade">
            {tempMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
