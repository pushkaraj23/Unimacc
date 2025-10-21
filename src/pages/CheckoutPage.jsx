import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState({ name: "", phone: "" });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [cartItems, setCartItems] = useState([]);

  const deliveryCharge = 50;

  // ✅ Fetch user + cart data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        name: storedUser.name || "",
        phone: storedUser.phone || "",
      });
      setAddresses(storedUser.addresses || []);
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // ✅ Calculate totals
  const itemTotal = cartItems.reduce(
    (sum, i) => sum + i.price * (i.quantity || 1),
    0
  );

  const discount = cartItems.reduce(
    (sum, i) =>
      sum +
      (i.isDiscountActive && i.discountPercent
        ? (i.price * i.discountPercent) / 100
        : 0),
    0
  );

  const subTotal = itemTotal - discount;
  const payableAmount = subTotal + deliveryCharge;

  // ✅ Verify handler
  const handleVerify = () => {
    if (userData.name.trim() && userData.phone.trim()) {
      setVerified(true);
      alert("✅ User verified successfully!");
    } else {
      alert("⚠️ Please enter both name and phone number.");
    }
  };

  // ✅ Handle address input
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  // ✅ Add new address
  const addAddress = () => {
    if (
      newAddress.name &&
      newAddress.phone &&
      newAddress.address &&
      newAddress.state &&
      newAddress.city &&
      newAddress.pincode
    ) {
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);

      // Update in localStorage
      const existingUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = { ...existingUser, addresses: updatedAddresses };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Reset
      setNewAddress({
        name: "",
        phone: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
      });

      alert("✅ New address added!");
    } else {
      alert("⚠️ Please fill all address fields before adding.");
    }
  };

  // ✅ Delete address
  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);

    // Update in localStorage
    const existingUser = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = { ...existingUser, addresses: updatedAddresses };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div className="w-full min-h-screen pt-28 max-sm:pt-24 max-sm:px-6 p-10">
      {/* Breadcrumb */}
      <div className="flex gap-1 font-medium my-3 max-sm:my-0 text-sm">
        <button onClick={() => navigate("/")} className="text-primary">
          Home
        </button>
        <span className="text-gray-400">/</span>
        <button onClick={() => navigate("/cart")} className="text-primary">
          Cart
        </button>
        <span className="text-gray-400">/</span>
        <button className="text-theme">Checkout</button>
      </div>

      <h1 className="text-3xl font-semibold mb-6 max-sm:text-2xl">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* ✅ Section 1: Verification */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border text-sm border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-theme"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full border text-sm border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-theme"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              </div>

              <button
                onClick={handleVerify}
                className="bg-theme text-white px-6 text-sm py-2 rounded-md hover:bg-theme/80 transition-all font-medium"
              >
                Verify
              </button>
            </div>
          </div>

          {/* ✅ Section 2: Address */}
          {verified && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Delivery Address
              </h2>

              {/* Existing addresses */}
              {addresses.length > 0 && (
                <div className="space-y-3 mb-5">
                  <h4 className="text-gray-600 text-sm mb-1 font-medium">
                    Select Address
                  </h4>
                  {addresses.map((addr, index) => (
                    <div
                      key={index}
                      className={`border p-4 rounded-lg relative cursor-pointer transition ${
                        selectedAddress === index
                          ? "border-theme bg-theme/10"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <div
                        onClick={() => setSelectedAddress(index)}
                        className="pr-6"
                      >
                        <p className="font-semibold text-primary">
                          {addr.name}
                        </p>
                        <p className="text-gray-600 text-sm">{addr.phone}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {addr.address}, {addr.city}, {addr.state} -{" "}
                          {addr.pincode}
                        </p>
                      </div>

                      {/* Delete Address */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAddress(index);
                        }}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Address */}
              <div className="space-y-4">
                <h4 className="text-gray-700 font-medium">Add New Address</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="border border-gray-300 text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-theme"
                    value={newAddress.name}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="border border-gray-300 text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-theme"
                    value={newAddress.phone}
                    onChange={handleAddressChange}
                  />
                </div>

                <textarea
                  name="address"
                  placeholder="Address (Flat, Building, Area)"
                  className="w-full border border-gray-300 text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-theme resize-none"
                  rows="3"
                  value={newAddress.address}
                  onChange={handleAddressChange}
                ></textarea>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="border border-gray-300 text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-theme"
                    value={newAddress.city}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="border border-gray-300 text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-theme"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    className="border border-gray-300 text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-theme"
                    value={newAddress.pincode}
                    onChange={handleAddressChange}
                  />
                </div>

                <button
                  onClick={addAddress}
                  className="bg-theme text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-primary transition-all"
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ✅ RIGHT SIDE — Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit sticky top-5">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Order Summary
          </h2>

          {/* Order Items */}
          {cartItems.length > 0 ? (
            <div className="space-y-3 border-b pb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      className="w-16 h-16 object-cover shadow-sm rounded-md"
                      alt={item.title}
                    />
                    <p className="text-primary/75 font-medium text-sm">
                      {item.title} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-primary">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              🛒 Your cart is empty.
            </p>
          )}

          {/* Totals */}
          {cartItems.length > 0 && (
            <>
              <div className="mt-4 space-y-2 text-sm bg-theme/10 border border-theme/60 rounded-md p-5">
                <p className="flex justify-between">
                  <span className="text-gray-600">Item Total</span>
                  <span className="font-medium text-primary">
                    ₹{itemTotal.toLocaleString()}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600 font-medium">
                    -₹{discount.toFixed(0)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-primary">
                    ₹{subTotal.toLocaleString()}
                  </span>
                </p>
                <p className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-medium text-primary">
                    ₹{deliveryCharge}
                  </span>
                </p>

                <p className="flex justify-between text-lg font-semibold pt-2">
                  <span className="text-primary">Total Payable</span>
                  <span className="text-theme">
                    ₹{payableAmount.toLocaleString()}
                  </span>
                </p>
              </div>

              <button
                className="w-full mt-6 bg-primary text-white py-3 rounded-md font-medium hover:bg-theme transition-all"
                onClick={() => alert("Proceeding to payment...")}
              >
                Proceed to Payment →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
