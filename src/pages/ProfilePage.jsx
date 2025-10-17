import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🧾 Mock Orders
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
      deliveryAddress: "",
      paymentMethod: "UPI",
    },
    {
      id: "ORD12346",
      date: "2025-10-12",
      total: 2400,
      status: "Shipped",
      items: [{ name: "Luxury Rain Shower Head", qty: 2, price: 1200 }],
      deliveryAddress: "",
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

    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);

    alert("✅ Profile saved successfully!");
  };

  // 🧩 Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧾 Mock order list linked to address
  const orders = mockOrders.map((order) => ({
    ...order,
    deliveryAddress: user?.address || "",
  }));

  return (
    <div className="pt-32 p-10 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">My Profile</h1>

      {/* If user not logged in → Show form */}
      {!user ? (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Complete Your Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows="3"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-theme transition-all duration-200"
            >
              Save Profile
            </button>
          </form>
        </div>
      ) : (
        // ✅ Logged-in Profile + Orders Section
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT — Profile Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="font-medium text-lg">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone Number</p>
                  <p className="font-medium text-lg">{user.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Selected Address</p>
                  <p className="font-medium text-base leading-relaxed">
                    {user.address}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-4">My Orders</h2>
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

          {/* Full-Screen Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white rounded-2xl shadow-lg w-[90%] lg:w-[70%] xl:w-[60%] max-h-[90vh] overflow-y-auto p-8 relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold"
                >
                  ×
                </button>

                {/* Order Info */}
                <h2 className="text-2xl font-semibold mb-4">
                  Order Details - #{selectedOrder.id}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Placed on {selectedOrder.date} | Status:{" "}
                  <span className="font-medium text-theme">
                    {selectedOrder.status}
                  </span>
                </p>

                {/* Order Items */}
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
                      <p className="font-semibold text-black">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">
                      {selectedOrder.paymentMethod}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold text-lg text-black">
                      ₹{selectedOrder.total.toLocaleString()}
                    </span>
                  </p>
                </div>

                {/* Delivery Address */}
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
