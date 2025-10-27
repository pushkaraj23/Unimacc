import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Update localStorage whenever wishlist changes
  const updateLocalStorage = (updatedList) => {
    setWishlist(updatedList);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // Quantity increase/decrease
  const handleQuantityChange = (id, delta) => {
    const updatedList = wishlist.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateLocalStorage(updatedList);
  };

  // Remove item
  const handleRemove = (id) => {
    const updatedList = wishlist.filter((item) => item.id !== id);
    updateLocalStorage(updatedList);
  };

  // Move to cart
  const moveToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((c) => c.id === item.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += item.quantity || 1;
    } else {
      cart.push({ ...item, quantity: item.quantity || 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    handleRemove(item.id);
    alert("✅ Moved to cart!");
  };

  return (
    <div className="w-full py-28 px-10 max-lg:px-6 max-sm:px-4 max-sm:py-24">
      {/* Breadcrumb */}
      <div className="flex gap-1 font-medium my-3 max-sm:my-0 text-sm flex-wrap">
        <button onClick={() => navigate("/")} className="text-primary">
          Home
        </button>
        <span className="text-gray-400">/</span>
        <button className="text-theme">Wishlist</button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-8 max-sm:mt-1 max-sm:mb-6">Your Wishlist</h1>

      {/* Wishlist Container */}
      <div className="bg-white p-6 max-sm:p-4 rounded-2xl shadow-lg border border-gray-100">
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <div key={item.id}>
              {/* Product Row */}
              <div className="flex max-lg:flex-col justify-between items-center max-lg:items-start gap-4">
                {/* Product Info */}
                <div className="flex items-center max-lg:items-start gap-4 w-full">
                  <img
                    onClick={() => navigate(`/products/${item.id}`)}
                    src={item.thumbnailimage}
                    alt={item.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 max-sm:w-20 max-sm:h-20 object-cover rounded-lg border hover:cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-lg max-sm:text-base line-clamp-2">
                      {item.name || "Unnamed Product"}
                    </h3>
                    <p className="text-sm max-sm:text-xs text-gray-500 mt-1">
                      Category: {item.category || "-"} <br />
                      Subcategory: {item.subCategory || "-"}
                    </p>
                    <p className="font-semibold text-lg max-sm:text-base mt-1 text-primary">
                      ₹{item.sellingprice?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center flex-wrap justify-end max-lg:justify-start gap-4 w-full">
                  {/* Quantity Control */}
                  <div className="flex items-center border rounded-full px-4 py-1 max-sm:px-3 max-sm:py-0.5">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="text-lg font-bold text-gray-600 max-sm:text-base"
                    >
                      -
                    </button>
                    <span className="px-4 text-lg max-sm:px-2 max-sm:text-base">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="text-lg font-bold text-gray-600 max-sm:text-base"
                    >
                      +
                    </button>
                  </div>

                  {/* Move to Cart */}
                  <button
                    onClick={() => moveToCart(item)}
                    className="px-5 py-2 max-sm:px-4 max-sm:py-1.5 border border-gray-300 rounded-full text-sm max-sm:text-xs font-medium hover:bg-theme hover:text-white transition"
                  >
                    Move to Cart
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt size={16} className="max-sm:w-4 max-sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Divider */}
              {index < wishlist.length - 1 && (
                <div className="border-t border-gray-200 my-4 max-sm:my-3"></div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
