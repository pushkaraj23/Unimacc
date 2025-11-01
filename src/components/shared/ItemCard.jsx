import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";

const ItemCard = ({ product }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [isInCart, setIsInCart] = useState(false); // ✅ new state for cart icon

  // ✅ Safely extract product fields
  const {
    id,
    name,
    description,
    category,
    subcategory,
    imagepath = [],
    mrp,
    sellingprice,
    discount,
    discountpercent,
  } = product || {};

  // ✅ Compute prices & discounts
  const originalPrice = mrp ? parseFloat(mrp) : 0;
  const price = sellingprice ? parseFloat(sellingprice) : 0;

  // ✅ Image fallback
  const images =
    product?.stocktable?.[0]?.images?.length > 0
      ? product.stocktable[0].images
      : imagepath;

  // ✅ Load wishlist, compare, and cart states
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some((item) => item.id === id));

    const compareList = JSON.parse(localStorage.getItem("compare")) || [];
    setIsCompared(compareList.some((item) => item.id === id));

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setIsInCart(cart.some((item) => item.id === id));
  }, [id]);

  // ✅ Add / Remove from Cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex((item) => item.id === id);

    let updatedCart;
    if (existingIndex !== -1) {
      // ❌ Remove if exists
      updatedCart = existingCart.filter((item) => item.id !== id);
      setIsInCart(false);
      alert("🗑️ Product removed from cart!");
    } else {
      // ✅ Add if not exists
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
      setIsInCart(true);
      alert("🛒 Product added to cart!");
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // 💖 Wishlist Add / Remove
  const handleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingIndex = wishlist.findIndex((item) => item.id === id);

    let updatedWishlist;
    if (existingIndex !== -1) {
      updatedWishlist = wishlist.filter((item) => item.id !== id);
      setIsWishlisted(false);
      alert("💔 Removed from wishlist!");
    } else {
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
      alert("💖 Added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // 🔁 Compare Add / Remove
  const handleCompare = (e) => {
    e.stopPropagation();
    const compareList = JSON.parse(localStorage.getItem("compare")) || [];
    const existingIndex = compareList.findIndex((item) => item.id === id);

    let updatedCompare;
    if (existingIndex !== -1) {
      updatedCompare = compareList.filter((item) => item.id !== id);
      setIsCompared(false);
      alert("❌ Removed from compare list!");
    } else {
      updatedCompare = [...compareList, product];
      setIsCompared(true);
      alert("🔁 Added to compare list!");
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

        {/* Offer Badge */}
        {discountpercent !== 0 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[85%] flex justify-between items-center bg-theme text-white text-[2.2vw] md:text-[.9vw] font-semibold px-2 sm:px-3 py-1 rounded-md">
            <span>Limited Time Deal</span>
            <span>{discountpercent}% OFF</span>
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

        {/* Price Section */}
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
        <div className="flex my-2 gap-2">
          {/* Cart Icon */}
          <div className="transition-opacity duration-300">
            <div
              onClick={handleAddToCart}
              className={`p-2 sm:p-2.5 rounded-full border cursor-pointer transition-colors ${
                isInCart
                  ? "bg-theme text-white border-theme shadow-md"
                  : "bg-white text-primary hover:bg-theme hover:text-white border-gray-300 hover:border-white"
              }`}
            >
              <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Wishlist Icon */}
          <div className="transition-opacity duration-300">
            <div
              onClick={handleWishlist}
              className={`p-2 sm:p-2.5 rounded-full cursor-pointer border transition-colors ${
                isWishlisted
                  ? "bg-theme text-white border-theme shadow-md"
                  : "bg-white hover:bg-theme hover:text-white border-gray-300 hover:border-white"
              }`}
            >
              <FaHeart className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Compare Button */}
          <button
            onClick={handleCompare}
            className={`border rounded-md p-2 sm:p-2.5 transition-colors ${
              isCompared
                ? "bg-theme text-white border-theme"
                : "border-gray-300 hover:bg-theme hover:text-white"
            }`}
          >
            <FaExchangeAlt className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
