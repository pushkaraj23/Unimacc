import React from "react";
import { FaHeart, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";

const ItemCard = ({
  id,
  images = [],
  title,
  subtitle,
  price,
  originalPrice,
  discountPercent,
  offerTime,
  isDiscountActive,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:cursor-pointer transition-all duration-300 relative group">
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

        {/* Cart Icon on Hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/80 hover:bg-theme p-2 rounded-full cursor-pointer">
            <FaShoppingCart className="text-white w-5 h-5" />
          </div>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white p-2 rounded-full cursor-pointer hover:bg-theme hover:text-white">
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
          <button className="border border-gray-300 rounded-md p-2 hover:bg-theme hover:text-white transition-colors">
            <FaExchangeAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
