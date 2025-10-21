import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🧾 Mock Orders (replace later with real data)
  const mockOrders = [
    {
      id: "ORD12345",
      date: "2025-10-10",
      total: 1450,
      status: "Delivered",
      items: [
        { name: "Elegant Soap Dispenser", qty: 1, price: 899 },
        { name: "Modern Kitchen Faucet", qty: 1, price: 551 },
      ],
      paymentMethod: "UPI",
    },
    {
      id: "ORD12346",
      date: "2025-10-12",
      total: 2400,
      status: "Shipped",
      items: [{ name: "Luxury Rain Shower Head", qty: 2, price: 1200 }],
      paymentMethod: "Credit Card",
    },
  ];

  // 🧠 Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // 📝 Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: formData.name,
      phone: formData.phone,
      addresses: [
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      ],
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    alert("✅ Profile saved successfully!");
  };

  // 🧩 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧾 Attach address 0th as delivery address
  const orders = mockOrders.map((order) => ({
    ...order,
    deliveryAddress: user?.addresses?.[0]
      ? `${user.addresses[0].address}, ${user.addresses[0].city}, ${user.addresses[0].state} - ${user.addresses[0].pincode}`
      : "No address found",
  }));

  return (
    <div className="pt-28 p-10 max-sm:pt-24 max-sm:px-6">
      <div className="flex gap-1 font-medium my-3 max-sm:my-0 text-sm">
        <button onClick={() => navigate("/")} className="text-primary">
          Home
        </button>
        <span className="text-gray-400">/</span>
        <button className="text-theme">Profile</button>
      </div>
      <h1 className="text-3xl font-semibold mb-6 max-sm:mt-1">Profile</h1>

      {/* If user not logged in → Show form */}
      {!user ? (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <h2 className="text-2xl font-medium mb-8 text-primary">
            Complete Your Profile
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {/* LEFT SIDE — Personal Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-theme focus:border-theme transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-theme focus:border-theme transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-theme focus:border-theme transition-all"
                  required
                />
              </div>
            </div>

            {/* RIGHT SIDE — Address Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Flat, Building, Area"
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm resize-none focus:ring-2 focus:ring-theme focus:border-theme transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-theme focus:border-theme transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-theme focus:border-theme transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON — Full Width Below Both Columns */}
            <div className="md:col-span-2 mt-6">
              <button
                type="submit"
                className="w-full md:w-fit px-7 bg-theme hover:bg-theme/80 text-white py-3 rounded-lg text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      ) : (
        // ✅ Logged-in Profile + Orders Section
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT — Profile Info */}
            <div className="bg-theme/10 rounded-2xl shadow-sm border border-theme p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-primary/80 text-sm">Full Name</p>
                  <p className="font-medium text-lg">{user.name}</p>
                </div>
                <div>
                  <p className="text-primary/80 text-sm">Phone Number</p>
                  <p className="font-medium text-lg">{user.phone}</p>
                </div>

                <div>
                  <p className="text-primary/80 text-sm mb-2">
                    Saved Addresses
                  </p>
                  {user.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg mb-2 border ${
                          index === 0
                            ? "border-theme bg-theme/10"
                            : "border-gray-200"
                        }`}
                      >
                        <p className="font-semibold text-primary">
                          {addr.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.address}, {addr.city}, {addr.state} -{" "}
                          {addr.pincode}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-primary/80 text-sm">
                      No addresses found.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT — Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl text-theme font-semibold mb-4">
                My Orders
              </h2>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-primary">
                            Order #{order.id}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Date: {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ₹{order.total.toLocaleString()}
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              order.status === "Delivered"
                                ? "text-green-600"
                                : order.status === "Shipped"
                                ? "text-blue-500"
                                : "text-gray-600"
                            }`}
                          >
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No orders yet.</p>
              )}
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-primary/50 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white rounded-2xl shadow-lg w-[90%] lg:w-[70%] xl:w-[60%] max-h-[90vh] overflow-y-auto p-8 relative">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-primary text-2xl font-bold"
                >
                  ×
                </button>

                <h2 className="text-2xl font-semibold mb-4">
                  Order Details - #{selectedOrder.id}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Placed on {selectedOrder.date} | Status:{" "}
                  <span className="font-medium text-theme">
                    {selectedOrder.status}
                  </span>
                </p>

                <div className="border-t border-gray-200 pt-4 space-y-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b border-gray-100 pb-2"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-semibold text-primary">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">
                      {selectedOrder.paymentMethod}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold text-lg text-primary">
                      ₹{selectedOrder.total.toLocaleString()}
                    </span>
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Delivery Address
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedOrder.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
