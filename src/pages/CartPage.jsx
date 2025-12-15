import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [savings, setSavings] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState(0);

  // ✅ Load cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // ✅ Dynamic totals
  useEffect(() => {
    const sub = cart.reduce((acc, item) => {
      const price = parseFloat(item.sellingprice || 0);
      return acc + price * (item.quantity || 1);
    }, 0);

    const totalSavings = cart.reduce((acc, item) => {
      const mrp = parseFloat(item.mrp || 0);
      const sell = parseFloat(item.sellingprice || 0);
      const qty = item.quantity || 1;
      return acc + Math.max(0, mrp - sell) * qty;
    }, 0);

    setSubtotal(sub);
    setSavings(totalSavings);
    setTotal(sub + deliveryFee);
  }, [cart]);

  // ==========================================================
  // ✅ Update quantity with stock limit
  // ==========================================================
  const updateQuantity = (productId, variantId, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.stocktable?.[0]?.id === variantId) {
        const maxStock = item.stocktable?.[0]?.quantity || 1;
        const currentQty = item.quantity || 1;

        let newQty = currentQty + delta;

        // ❌ Prevent less than 1
        if (newQty < 1) newQty = 1;

        // ❌ Prevent exceeding max stock
        if (newQty > maxStock) newQty = maxStock;

        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // ==========================================================
  // ❌ Remove item
  // ==========================================================
  const removeItem = (productId, variantId) => {
    const updatedCart = cart.filter(
      (item) =>
        !(item.id === productId && item.stocktable?.[0]?.id === variantId)
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  return (
    <div className="w-full pt-20 max-sm:pt-24 px-10 max-lg:px-6 max-sm:px-4 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex gap-1 font-medium my-3 text-sm flex-wrap">
        <button onClick={() => navigate("/")} className="text-primary">
          Home
        </button>
        <span className="text-gray-400">/</span>
        <button className="text-theme">Cart</button>
      </div>

      <h1 className="text-3xl font-semibold mb-8 max-sm:mt-1">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* 🛒 Cart Items */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          {cart.length > 0 ? (
            cart.map((item, index) => {
              const variantId = item.stocktable?.[0]?.id;
              const image =
                item.stocktable?.[0]?.color ||
                item.thumbnailimage ||
                "https://cdn-icons-png.flaticon.com/512/679/679821.png";

              const maxStock = item.stocktable?.[0]?.quantity || 1;

              return (
                <div key={`${item.id}-${variantId}`}>
                  <div className="flex justify-between items-center max-md:flex-col max-md:items-start gap-4">
                    {/* Product Info */}
                    <div className="flex items-center gap-4 w-full">
                      <img
                        onClick={() => navigate(`/products/${item.id}`)}
                        src={image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg border hover:cursor-pointer object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Category: {item.category}
                        </p>
                        <p className="font-semibold text-lg mt-1 text-primary">
                          ₹{item.sellingprice}
                          <span className="text-gray-400 line-through ml-2 text-sm">
                            ₹{item.mrp}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          In Stock: {maxStock}
                        </p>
                      </div>
                    </div>

                    {/* Quantity + Delete */}
                    <div className="flex items-center gap-5 max-md:w-full justify-end">
                      <div className="flex items-center border rounded-full px-4 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, variantId, -1)}
                          className="text-lg font-bold text-gray-600"
                        >
                          -
                        </button>
                        <span className="px-4 text-lg">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, variantId, 1)}
                          className="text-lg font-bold text-gray-600"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id, variantId)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </div>

                  {index < cart.length - 1 && (
                    <div className="border-t border-gray-200 my-4"></div>
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
        {cart.length !== 0 && (
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-5">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between opacity-50 font-semibold">
                <span>Items Total</span>
                <span className="font-semibold">
                  ₹{(subtotal + savings).toLocaleString()}
                </span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>You Saved</span>
                  <span>-₹{savings.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total Payable</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-primary text-white py-3 rounded-full font-medium hover:opacity-90"
            >
              Proceed to Buy →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
