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

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const sub = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const disc = (sub * discountPercent) / 100;
    setSubtotal(sub);
    setDiscount(disc);
    setTotal(sub - disc + deliveryFee);
  }, [cart]);

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="w-full pt-28 p-10 min-h-screen bg-[#fafafa]">
      {/* Breadcrumb */}
      <div className="flex gap-1 font-medium my-5 text-sm">
        <button onClick={() => navigate("/")} className="text-primary">
          Home
        </button>
        <span className="text-gray-400">/</span>
        <button className="text-orange-500">Cart</button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8">Your cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 bg-white p-6 h-fit rounded-2xl shadow-sm border border-gray-100">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={item.id}>
                <div className="flex justify-between items-center">
                  {/* Image */}
                  <div className="flex items-center gap-4">
                    <img
                      onClick={() => navigate(`/products/${item.id}`)}
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-24 h-24 hover:cursor-pointer rounded-lg object-cover border"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Size: Large
                        <br />
                        Color: White
                      </p>
                      <p className="font-semibold text-lg mt-1">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Control + Delete */}
                  <div className="flex items-center gap-5">
                    <div className="flex items-center border rounded-full px-4 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-lg font-bold text-gray-600"
                      >
                        -
                      </button>
                      <span className="px-4 text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-lg font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>

                {/* Divider */}
                {index < cart.length - 1 && (
                  <div className="border-t border-gray-200 my-3"></div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border sticky top-5 border-gray-100 h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
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
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6 flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 border">
            <FaTag className="text-gray-400" />
            <input
              type="text"
              placeholder="Add promo code"
              className="bg-transparent outline-none flex-1 text-sm"
            />
            <button className="bg-theme hover:opacity-80 text-sm text-white font-medium px-5 py-2 rounded-full">
              Apply
            </button>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-primary text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-80"
          >
            Go to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
