import { useEffect, useState } from "react";
import { createOrder } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const CheckoutSummary = ({
  deliveryCharge,
  verified,
  isAuthenticated,
  startLoading,
  loading,
  addresses,
  selectedAddress,
  showTempMessage,
}) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [userid, setUserid] = useState(null);
  const [userData, setUserData] = useState({ name: "", phone: "" });

  // ✅ Load cart & user from localStorage
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setCartItems(storedCart);
      if (storedUser?.userid) setUserid(storedUser.userid);
      if (storedUser?.name || storedUser?.phone) setUserData(storedUser);
    } catch (err) {
      console.error("Error reading localStorage:", err);
    }
  }, []);

  const subTotal = cartItems.reduce(
    (sum, i) => sum + parseFloat(i.sellingprice || 0) * (i.quantity || 1),
    0
  );

  const savings = cartItems.reduce((sum, i) => {
    const mrp = parseFloat(i.mrp || 0);
    const sell = parseFloat(i.sellingprice || 0);
    const qty = i.quantity || 1;
    return sum + Math.max(0, mrp - sell) * qty;
  }, 0);

  const payableAmount = subTotal + deliveryCharge;

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  async function startPayment() {
    if (!userid) return showTempMessage("⚠️ Please log in to continue!");
    if (!verified)
      return showTempMessage("⚠️ Please verify your contact first!");
    if (selectedAddress === null)
      return showTempMessage("⚠️ Please select a delivery address");

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) return showTempMessage("❌ Razorpay SDK failed to load.");

    startLoading(true);

    try {
      const orderPayload = {
        customerid: userid,
        deliveryaddressid: selectedAddress.id,
        discounts: [{}],
        items: cartItems.map((item) => ({
          productid: item.id,
          productvariantid: item.stocktable?.[0]?.id || null,
          productvariantsizeid: item.stocktable?.[0]?.sizes?.[0]?.id || null,
          quantity: item.quantity || 1,
          price: item.sellingprice?.toString() || "0.00",
        })),
        remark: "",
      };

      console.log("🧾 Sending order payload:", orderPayload);

      const orderResponse = await createOrder(orderPayload);
      console.log("✅ Order created:", orderResponse);
      const orderData = orderResponse.body || orderResponse;
      startLoading(false);

      const options = {
        key: "rzp_live_RckkLSIH4ZE3bp",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Unimacc",
        description: "Order Payment",
        order_id: orderData.gateway_order_id, // FIXED
        handler: async function (response) {
          console.log("Payment Success:", response);

          try {
            await fetch("/api/payments/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                backendOrderId: orderData.id, // FIXED
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
          } catch (err) {
            console.warn("Payment confirm failed:", err);
          }

          localStorage.removeItem("cart");
          navigate(`/orders/${orderData.id}`);
        },
        prefill: {
          name: selectedAddress.deliveredtopersonname || "Customer",
          contact: userData.phone,
        },
        notes: {
          orderId: orderData.gateway_order_id,
          backendOrderId: orderData.id,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response) => {
        console.error("❌ Payment Failed:", response);
        showTempMessage("❌ Payment Failed: " + response.error.description);
      });
    } catch (error) {
      console.error("❌ Error creating order or starting payment:", error);
      startLoading(false);
      showTempMessage("Something went wrong while creating order or payment.");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit sticky top-5">
      <h2 className="text-xl font-semibold mb-4 text-primary">Order Summary</h2>

      {cartItems.length > 0 ? (
        <>
          <div className="max-h-[300px] overflow-y-auto mb-5 border border-primary/20 rounded-lg p-3 md:px-5 px-4 bg-primary/5">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 border-b border-gray-200 pb-3 mb-3 items-center last:border-0 last:pb-0 last:mb-0"
              >
                <img
                  src={item.thumbnailimage}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-primary/30"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Category: {item.category || "-"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Qty: {item.quantity} × ₹{parseFloat(item.sellingprice || 0)}
                  </p>
                  <p className="text-sm font-medium text-primary mt-1">
                    ₹
                    {(
                      parseFloat(item.sellingprice || 0) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm bg-theme/10 border border-theme/60 rounded-md p-5">
            <p className="flex justify-between">
              <span>Item Total</span>
              <span>₹{subTotal.toLocaleString()}</span>
            </p>

            {savings > 0 && (
              <p className="flex justify-between text-green-600 font-medium">
                <span>You Saved</span>
                <span>-₹{savings.toLocaleString()}</span>
              </p>
            )}

            <p className="flex justify-between">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharge}</span>
            </p>

            <hr className="my-1 border-gray-300" />

            <p className="flex justify-between text-lg font-semibold">
              <span>Total Payable</span>
              <span>₹{payableAmount.toLocaleString()}</span>
            </p>
          </div>

          {verified && isAuthenticated && (
            <button
              onClick={() => {
                console.log(selectedAddress);
                startPayment();
              }}
              disabled={loading}
              className="w-full mt-6 bg-primary text-white py-3 rounded-md font-medium hover:bg-theme transition-all"
            >
              {loading ? "Processing..." : "Proceed to Payment →"}
            </button>
          )}
        </>
      ) : (
        <div className="text-gray-500 text-center py-6">
          Your cart is empty.{" "}
          <button
            onClick={() => navigate("/products")}
            className="text-theme font-medium hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;
