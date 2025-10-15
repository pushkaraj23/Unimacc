import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";

const ItemCard = ({
  id,
  images = [],
  title,
  subtitle,
  price,
  originalPrice,
  category,
  subCategory,
  description,
  discountPercent,
  offerTime,
  isDiscountActive,
}) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  // ✅ Load wishlist & compare states on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some((item) => item.id === id));

    const compareList = JSON.parse(localStorage.getItem("compare")) || [];
    setIsCompared(compareList.some((item) => item.id === id));
  }, [id]);

  const product = {
    id,
    images,
    title,
    subtitle,
    price,
    originalPrice,
    category,
    subCategory,
    description,
    discountPercent,
    offerTime,
    isDiscountActive,
  };

  // ✅ Add to Cart
  const handleAddToCart = (e) => {
    e.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex((item) => item.id === id);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("✅ Product added to cart!");
  };

  // 💖 Wishlist Add/Remove
  const handleWishlist = (e) => {
    e.stopPropagation();

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingIndex = existingWishlist.findIndex((item) => item.id === id);

    if (existingIndex !== -1) {
      const updatedWishlist = existingWishlist.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
      alert("💔 Removed from wishlist!");
    } else {
      existingWishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      setIsWishlisted(true);
      alert("💖 Added to wishlist!");
    }
  };

  // 🔁 Compare Add/Remove
  const handleCompare = (e) => {
    e.stopPropagation();

    const existingCompare = JSON.parse(localStorage.getItem("compare")) || [];
    const existingIndex = existingCompare.findIndex((item) => item.id === id);

    if (existingIndex !== -1) {
      // Remove from compare list
      const updatedCompare = existingCompare.filter((item) => item.id !== id);
      localStorage.setItem("compare", JSON.stringify(updatedCompare));
      setIsCompared(false);
      alert("❌ Removed from compare list!");
    } else {
      // Add to compare list
      existingCompare.push(product);
      localStorage.setItem("compare", JSON.stringify(existingCompare));
      setIsCompared(true);
      alert("🔁 Added to compare list!");
    }
  };

  return (
    <div
      onClick={() => navigate(`/products/${id}`)}
      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:cursor-pointer transition-all duration-300 relative group"
    >
      {/* Product Image */}
      <div className="relative w-full h-[250px] overflow-hidden">
        {/* Default Image */}
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover rounded-t-xl transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Hover Image */}
        {images[1] && (
          <img
            src={images[1]}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Cart Icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            onClick={handleAddToCart}
            className="bg-primary/80 hover:bg-theme p-2 rounded-full cursor-pointer"
          >
            <FaShoppingCart className="text-white w-5 h-5" />
          </div>
        </div>

        {/* Wishlist Icon */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            onClick={handleWishlist}
            className={`p-2 rounded-full cursor-pointer transition-colors ${
              isWishlisted
                ? "bg-theme text-white shadow-md"
                : "bg-white hover:bg-theme hover:text-white"
            }`}
          >
            <FaHeart className="w-5 h-5" />
          </div>
        </div>

        {/* Offer Time Badge */}
        {isDiscountActive && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[85%] flex justify-between items-center bg-theme text-white text-[13px] font-semibold px-3 py-1 rounded-md">
            <span>Limited Time Deal</span>
            <span>{offerTime}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 text-left">
        <p className="text-gray-400 text-sm">{subtitle}</p>
        <h3 className="font-semibold text-primary text-base leading-snug">
          {title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-lg">₹{price}</span>
              {originalPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            {discountPercent && (
              <span className="text-theme text-sm font-semibold">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Compare Button */}
          <button
            onClick={handleCompare}
            className={`border rounded-md p-2 transition-colors ${
              isCompared
                ? "bg-theme text-white border-theme"
                : "border-gray-300 hover:bg-theme hover:text-white"
            }`}
          >
            <FaExchangeAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
