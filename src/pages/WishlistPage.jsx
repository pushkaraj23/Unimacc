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
  };

  // Increase/decrease quantity
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

  // Move item to cart
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
    <div className="w-full pt-28 p-10 min-h-screen bg-[#fafafa]">
      {/* Breadcrumb */}
      <div className="flex gap-1 font-medium my-5 text-sm">
        <button onClick={() => navigate("/")} className="text-primary">
          Home
        </button>
        <span className="text-gray-400">/</span>
        <button className="text-orange-500">Wishlist</button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-8">Your Wishlist</h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <div key={item.id}>
              <div className="flex justify-between items-center">
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    onClick={() => navigate(`/products/${item.id}`)}
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-24 hover:cursor-pointer object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.title || "Unnamed Product"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Category: {item.category || "-"}
                      <br />
                      Subcategory: {item.subCategory || "-"}
                    </p>
                    <p className="font-semibold text-lg mt-1 text-black">
                      ₹{item.price?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-5">
                  {/* Quantity Control */}
                  <div className="flex items-center border rounded-full px-4 py-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="text-lg font-bold text-gray-600"
                    >
                      -
                    </button>
                    <span className="px-4 text-lg">{item.quantity || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="text-lg font-bold text-gray-600"
                    >
                      +
                    </button>
                  </div>

                  {/* Move to Cart */}
                  <button
                    onClick={() => moveToCart(item)}
                    className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-theme hover:text-white transition"
                  >
                    Move to Cart
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              {/* Divider */}
              {index < wishlist.length - 1 && (
                <div className="border-t border-gray-200 my-3"></div>
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
