import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderById } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const OrdersSection = ({ userid }) => {
  const navigate = useNavigate();

  // Fetch Orders
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

      {orders.length === 0 && <p className="text-gray-500">No orders found.</p>}

      <div className="space-y-4">
        {orders.map((order) => {
          const firstItem = order.items?.[0];
          const remainingCount = order.items.length - 1;

          return (
            <div
              key={order.id}
              onClick={() => navigate(`/order/${order.id}`)}
              className={`p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg hover:border-theme transition-all duration-200 ${
                order.status === "Delivered" || order.status === "Confirmed"
                  ? "bg-green-50"
                  : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {firstItem?.color && (
                    <img
                      src={firstItem.color}
                      alt={firstItem.productname}
                      className="w-14 h-14 rounded-lg border object-cover"
                    />
                  )}

                  <div>
                    <p className="font-semibold text-primary">
                      {firstItem?.productname}
                    </p>

                    {remainingCount > 0 && (
                      <p className="text-sm text-gray-500">
                        and {remainingCount} other item
                        {remainingCount > 1 ? "s" : ""}
                      </p>
                    )}

                    <p className="text-gray-500 text-xs mt-1">
                      Ordered on{" "}
                      {new Date(order.orderdate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-semibold ${
                      order.status === "Delivered" ||
                      order.status === "Confirmed"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    ₹{Number(order.payableamount).toLocaleString()}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      order.status === "Delivered" ||
                      order.status === "Confirmed"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersSection;
