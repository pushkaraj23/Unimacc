import React, { useState } from "react";

const CheckoutPage = () => {
  // ✅ Verification state
  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState({ name: "", phone: "" });

  // ✅ Address state
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  // ✅ Mock Order Data
  const orderItems = [
    { id: 1, title: "Luxury Rain Shower Head", qty: 1, price: 999 },
    { id: 2, title: "Modern Kitchen Faucet", qty: 1, price: 899 },
  ];
  const deliveryCharge = 50;
  const discount = 100;
  const itemTotal = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const subTotal = itemTotal - discount;
  const payableAmount = subTotal + deliveryCharge;

  // ✅ Handlers
  const handleVerify = () => {
    if (userData.name.trim() && userData.phone.trim()) {
      setVerified(true);
      alert("✅ User verified successfully!");
    } else {
      alert("⚠️ Please enter both name and phone number.");
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const addAddress = () => {
    if (
      newAddress.name &&
      newAddress.address &&
      newAddress.state &&
      newAddress.city &&
      newAddress.pincode
    ) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({
        name: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
      });
    } else {
      alert("⚠️ Please fill all address fields before adding.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pt-32 p-10">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* ✅ Section 1: User Verification */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-black">
              1️⃣ Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              </div>

              <button
                onClick={handleVerify}
                className="bg-black text-white w-full py-2 rounded-md hover:bg-orange-500 transition-all font-medium"
              >
                Verify
              </button>
            </div>
          </div>

          {/* ✅ Section 2: Address Form (only after verification) */}
          {verified && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-black">
                2️⃣ Delivery Address
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
                      onClick={() => setSelectedAddress(index)}
                      className={`border p-4 rounded-lg cursor-pointer transition ${
                        selectedAddress === index
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <p className="font-semibold text-black">{addr.name}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {addr.address}, {addr.city}, {addr.state} -{" "}
                        {addr.pincode}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Address */}
              <div className="space-y-3">
                <h4 className="text-gray-700 font-medium">Add New Address</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={newAddress.name}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={newAddress.city}
                    onChange={handleAddressChange}
                  />
                </div>

                <textarea
                  name="address"
                  placeholder="Address (Flat, Building, Area)"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  rows="3"
                  value={newAddress.address}
                  onChange={handleAddressChange}
                ></textarea>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={newAddress.pincode}
                    onChange={handleAddressChange}
                  />
                </div>

                <button
                  onClick={addAddress}
                  className="bg-orange-500 text-white px-5 py-2 rounded-md font-medium hover:bg-black transition-all"
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-5">
          <h2 className="text-xl font-semibold mb-4 text-black">
            🧾 Order Summary
          </h2>

          <div className="space-y-3 border-b pb-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <p className="text-gray-700 text-sm">
                  {item.title} × {item.qty}
                </p>
                <p className="font-medium text-black">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Item Total</span>
              <span className="font-medium text-black">
                ₹{itemTotal.toLocaleString()}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Item Discount</span>
              <span className="text-green-600 font-medium">-₹{discount}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-black">
                ₹{subTotal.toLocaleString()}
              </span>
            </p>
            <p className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="font-medium text-black">
                ₹{deliveryCharge}
              </span>
            </p>

            <p className="flex justify-between text-lg font-semibold pt-2">
              <span>Total Payable</span>
              <span className="text-orange-500">
                ₹{payableAmount.toLocaleString()}
              </span>
            </p>
          </div>

          {/* Proceed Button */}
          <button
            className="w-full mt-6 bg-black text-white py-3 rounded-md font-medium hover:bg-orange-500 transition-all"
            onClick={() => alert("Proceeding to payment...")}
          >
            Proceed to Payment →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
