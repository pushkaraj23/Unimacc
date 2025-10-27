import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaTag } from "react-icons/fa";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(15);
  const [total, setTotal] = useState(0);
  const discountPercent = 20;

  // ✅ Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // ✅ Recalculate totals whenever cart changes
  useEffect(() => {
    const sub = cart.reduce((acc, item) => {
      const price = parseFloat(item.sellingprice || 0);
      return acc + price * (item.quantity || 1);
    }, 0);

    const disc = (sub * discountPercent) / 100;
    setSubtotal(sub);
    setDiscount(disc);
    setTotal(sub - disc + deliveryFee);
  }, [cart]);

  // ✅ Quantity updates
  const updateQuantity = (id, delta) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, (item.quantity || 1) + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // remove zero quantity items

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // ✅ Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  return (
    <div className="w-full pt-28 max-sm:pt-24 px-10 max-lg:px-6 max-sm:px-4 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex gap-1 font-medium my-3 max-sm:my-0 text-sm flex-wrap">
        <button onClick={() => navigate("/")} className="text-primary">
          Home
        </button>
        <span className="text-gray-400">/</span>
        <button className="text-theme">Cart</button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 max-sm:mt-1 max-sm:mb-6">
        Your Cart
      </h1>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🛒 Cart Items */}
        <div className="flex-1 bg-white p-6 max-sm:p-4 h-fit rounded-2xl shadow-sm border border-gray-100">
          {cart.length > 0 ? (
            cart.map((item, index) => {
              const image =
                item.imagepath?.[0] ||
                item.thumbnailimage ||
                item.stocktable?.[0]?.images?.[0] ||
                "https://cdn-icons-png.flaticon.com/512/679/679821.png";

              const name = item.name || "Unnamed Product";
              const category = item.category || "Misc";
              const price = parseFloat(item.sellingprice || 0);

              return (
                <div key={item.id}>
                  <div className="flex justify-between items-center max-md:flex-col max-md:items-start gap-4">
                    {/* Product Info */}
                    <div className="flex items-center max-sm:items-start gap-4 w-full">
                      <img
                        onClick={() => navigate(`/products/${item.id}`)}
                        src={image}
                        alt={name}
                        className="w-24 h-24 sm:w-28 sm:h-28 max-sm:w-20 max-sm:h-20 hover:cursor-pointer rounded-lg object-cover border"
                      />
                      <div>
                        <h3 className="font-semibold text-lg max-sm:text-base line-clamp-2">
                          {name}
                        </h3>
                        <p className="text-sm max-sm:text-xs text-gray-500 mt-1">
                          Category: {category}
                        </p>
                        <p className="font-semibold text-lg max-sm:text-base mt-1 text-primary">
                          ₹{price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Quantity + Delete */}
                    <div className="flex items-center max-md:w-full justify-end max-md:justify-between gap-5">
                      {/* Quantity Control */}
                      <div className="flex items-center border rounded-full px-4 py-1 max-sm:px-3 max-sm:py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-lg font-bold text-gray-600 max-sm:text-base"
                        >
                          -
                        </button>
                        <span className="px-4 text-lg max-sm:px-2 max-sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-lg font-bold text-gray-600 max-sm:text-base"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrashAlt
                          size={16}
                          className="max-sm:w-4 max-sm:h-4"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < cart.length - 1 && (
                    <div className="border-t border-gray-200 my-4 max-sm:my-3"></div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-10">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* 💰 Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 max-sm:p-4 rounded-2xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-5">
          <h2 className="font-semibold text-lg mb-4 max-sm:text-base">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm max-sm:text-xs">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">
                ₹{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount (-{discountPercent}%)</span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between text-base font-semibold max-sm:text-sm">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6 flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 border max-sm:px-3 max-sm:py-1.5">
            <FaTag className="text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Add promo code"
              className="bg-transparent outline-none flex-1 text-sm max-sm:text-xs"
            />
            <button className="bg-theme hover:opacity-80 text-sm max-sm:text-xs text-white font-medium px-5 py-2 max-sm:px-3 max-sm:py-1 rounded-full">
              Apply
            </button>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-primary text-white py-3 max-sm:py-2.5 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-80 text-sm sm:text-base"
          >
            Go to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
