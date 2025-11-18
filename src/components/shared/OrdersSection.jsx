import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderById } from "../../api/userApi";

const OrdersSection = ({ userid }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🔄 React Query: Fetch orders by user ID
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", userid],
    queryFn: () => fetchOrderById(userid),
    enabled: !!userid,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4 text-theme">My Orders</h2>
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-4 text-theme">My Orders</h2>

      {/* No Orders */}
      {orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg hover:border-theme transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-primary">Order #{order.id}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(order.orderdate).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-lg text-theme">
                  ₹{Number(order.payableamount).toLocaleString()}
                </p>
                <p
                  className={`text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Confirmed"
                      ? "text-theme"
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

      {/* ====================== ORDER DETAILS POPUP ====================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center transition-all">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] lg:w-[70%] max-h-[90vh] overflow-y-auto p-8 relative animate-[fadeIn_0.25s_ease]">

            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-2xl text-theme font-bold hover:scale-110 transition"
            >
              ×
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold mb-4 text-theme">
              Order Details • #{selectedOrder.id}
            </h2>

            {/* Order Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm">Order Date</p>
                <p className="font-medium">
                  {new Date(selectedOrder.orderdate).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Payment Status</p>
                <p className="font-medium text-theme">{selectedOrder.paymentstatus}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Delivery Address</p>
                <p className="font-medium">{selectedOrder.deliveryaddress}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Amount Paid</p>
                <p className="font-medium text-primary">
                  ₹{selectedOrder.payableamount}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <h3 className="text-lg font-semibold mb-2 text-theme">Items</h3>
            <div className="space-y-4 border-t pt-4">
              {selectedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{item.productname}</p>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity} • Size: {item.size}
                    </p>
                  </div>
                  <p className="font-semibold text-primary">
                    ₹{Number(item.totalprice).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Payments */}
            <h3 className="text-lg font-semibold mt-6 mb-2 text-theme">
              Payment Details
            </h3>
            <div className="space-y-2">
              {selectedOrder.payments.map((pay) => (
                <div
                  key={pay.id}
                  className="border p-3 rounded-lg shadow-xs bg-theme/5"
                >
                  <p className="text-sm text-gray-700">
                    Method: <span className="font-medium">{pay.paymentmethod}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Amount: <span className="font-medium">₹{pay.amount}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Status: <span className="font-medium">{pay.status}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
