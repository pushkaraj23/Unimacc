import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateOtp,
  verifyOtp,
  addCustomerAddress,
  createOrder,
} from "../api/userApi";
import { useMutation } from "@tanstack/react-query";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState({ name: "", phone: "" });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [otp, setOtp] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tempMessage, setTempMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const deliveryCharge = 50;

  const [newAddress, setNewAddress] = useState({
    deliveredtopersonname: "",
    deliveredtopersonmobileno: "",
    addresslineone: "",
    addresslinetwo: "",
    landmark: "",
    city: "",
    state: "",
    postalcode: "",
    addresstype: "Home",
    isdefault: false,
  });

  // ✅ Load stored user & cart
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        name: storedUser.name || "",
        phone: storedUser.phone || "",
      });
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const showTempMessage = (msg) => {
    setTempMessage(msg);
    setTimeout(() => setTempMessage(""), 3000);
  };

  // ✅ Generate OTP
  const otpMutation = useMutation({
    mutationFn: generateOtp,
    onSuccess: (data) => {
      showTempMessage(`✅ OTP sent successfully to ${userData.phone}!`);
    },
    onError: () => showTempMessage("❌ Failed to send OTP. Please try again."),
  });

  // ✅ Verify OTP
  const verifyMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      if (data.verified) {
        showTempMessage("✅ OTP verified successfully!");
        if (data.usertoken) localStorage.setItem("authToken", data.usertoken);

        setUserData({
          name: data?.customerAddress?.[0]?.deliveredtopersonname || "",
          phone: data?.user?.mobile || "",
          userid: data?.user?.userid,
        });
        setAddresses(data.customerAddress || []);
        setVerified(true);
      } else showTempMessage("❌ Invalid OTP");
    },
    onError: () => showTempMessage("❌ Verification failed"),
  });

  // ✅ Add Address
  const addAddressMutation = useMutation({
    mutationFn: addCustomerAddress,
    onSuccess: (data) => {
      showTempMessage("✅ Address added successfully!");
      setAddresses((prev) => [...prev, data]);
      setNewAddress({
        deliveredtopersonname: "",
        deliveredtopersonmobileno: "",
        addresslineone: "",
        addresslinetwo: "",
        landmark: "",
        city: "",
        state: "",
        postalcode: "",
        addresstype: "Home",
        isdefault: false,
      });
    },
    onError: () => showTempMessage("❌ Failed to add address."),
  });

  const handleAddAddress = () => {
    const {
      deliveredtopersonname,
      deliveredtopersonmobileno,
      addresslineone,
      city,
      state,
      postalcode,
    } = newAddress;

    if (!isValidName(deliveredtopersonname))
      return showTempMessage("⚠️ Enter a valid full name");

    if (!isValidPhone(deliveredtopersonmobileno))
      return showTempMessage("⚠️ Enter valid 10-digit mobile number");

    if (!addresslineone.trim())
      return showTempMessage("⚠️ Address Line 1 cannot be empty");

    if (!city.trim()) return showTempMessage("⚠️ Enter city");

    if (!state.trim()) return showTempMessage("⚠️ Enter state");

    if (!isValidPincode(postalcode))
      return showTempMessage("⚠️ Enter valid 6-digit PIN code");

    // If all good — proceed
    addAddressMutation.mutate({
      ...newAddress,
      userid: userData.userid,
    });
  };

  // ✅ Totals (updated logic)
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

  // ✅ Razorpay Loader
  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // ✅ Start Payment (with proper /orders integration)
  async function startPayment() {
    if (!verified) return showTempMessage("⚠️ Please verify your contact!");

    // if (!isValidName(userData.name))
    //   return showTempMessage("⚠️ Invalid name format");

    if (!isValidPhone(userData.phone))
      return showTempMessage("⚠️ Invalid phone number");

    if (selectedAddress === null)
      return showTempMessage("⚠️ Select a delivery address");

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) return showTempMessage("❌ Razorpay SDK failed to load.");

    setLoading(true);

    try {
      // ✅ Step 1: Prepare backend order payload
      const orderPayload = {
        customerid: userData.userid,
        deliveryaddressid: addresses[selectedAddress].id,
        discounts: [{}],
        items: cartItems.map((item) => ({
          productid: item.id, // from your product object
          productvariantid: item.stocktable?.[0]?.id || null, // optional
          productvariantsizeid: item.stocktable?.[0]?.sizes?.[0]?.id || null, // optional
          quantity: item.quantity || 1,
          price: item.sellingprice?.toString() || "0.00",
        })),
        remark: "",
      };

      // ✅ Step 2: Call backend API to create the order
      console.log(
        "🧾 ORDER PAYLOAD BEING SENT:",
        JSON.stringify(orderPayload, null, 2)
      );
      const orderResponse = await createOrder(orderPayload);
      console.log("✅ Order created successfully:", orderResponse);

      // Extract necessary Razorpay details from backend response
      const {
        razorpay_order_id,
        amount,
        currency,
        id: backendOrderId,
      } = orderResponse.body || orderResponse;

      setLoading(false);

      // ✅ Step 3: Initialize Razorpay
      const options = {
        key: "rzp_live_RckkLSIH4ZE3bp", // 🔑 Use your live/test key
        amount: amount, // e.g. 149900 = ₹1499.00
        currency: currency || "INR",
        name: "Unimacc",
        description: "Order Payment",
        order_id: razorpay_order_id, // from backend order
        handler: async function (response) {
          console.log("✅ Razorpay Payment Success:", response);
          showTempMessage("✅ Payment Successful!");

          // ✅ (Optional) confirm payment to backend here
          await confirmPayment({
            backendOrderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          // ✅ Cleanup after success
          localStorage.removeItem("cart");
          navigate("/products");
        },
        prefill: {
          name: userData.name,
          contact: userData.phone,
        },
        notes: {
          address: `${addresses[selectedAddress].addresslineone}, ${addresses[selectedAddress].city}`,
          backendOrderId: backendOrderId,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response) => {
        console.error("❌ Payment Failed:", response);
        showTempMessage("❌ Payment Failed: " + response.error.description);
      });
    } catch (error) {
      console.error("❌ Error creating order or starting payment:", error);
      setLoading(false);
      showTempMessage("Something went wrong while creating order or payment.");
    }
  }

  // -------------------- VALIDATION HELPERS --------------------
  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone); // 10 digits, starts 6-9
  const isValidPincode = (pin) => /^[1-9]\d{5}$/.test(pin); // 6 digits, no leading zero
  const isValidName = (name) => /^[A-Za-z ]{3,}$/.test(name.trim());
  const isValidOTP = (code) => /^\d{4,6}$/.test(code); // 4–6 digits
  // ------------------------------------------------------------

  return (
    <div className="w-full min-h-screen pt-28 max-sm:pt-24 max-sm:px-6 p-10">
      {/* Breadcrumb */}
      <div className="flex gap-1 font-medium my-3 text-sm">
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
          {/* Contact Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Contact Information
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                disabled={verified}
                className="w-full border text-sm border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                disabled={verified}
                className="w-full border text-sm border-gray-300 rounded-md px-4 py-2"
              />

              {!verified && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={`w-full border text-sm border-gray-300 rounded-md px-4 py-2`}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (!otp) {
                          // Before sending OTP
                          if (!isValidName(userData.name))
                            return showTempMessage(
                              "⚠️ Enter a valid name (min 3 letters)"
                            );

                          if (!isValidPhone(userData.phone))
                            return showTempMessage(
                              "⚠️ Enter valid 10-digit phone number"
                            );

                          otpMutation.mutate({
                            channel: "whatsapp",
                            identifier: userData.phone,
                            purpose: "login",
                          });
                        } else {
                          // Before verifying OTP
                          if (!isValidOTP(otp))
                            return showTempMessage(
                              "⚠️ Enter a valid 4–6 digit OTP"
                            );

                          verifyMutation.mutate({
                            channel: "whatsapp",
                            identifier: userData.phone,
                            purpose: "login",
                            code: otp,
                          });
                        }
                      }}
                      className="bg-theme text-white px-6 py-2 rounded-md text-sm font-medium"
                    >
                      {otp ? "Verify OTP" : "Get OTP"}
                    </button>

                    <button
                      onClick={() =>
                        otpMutation.mutate({
                          channel: "whatsapp",
                          identifier: userData.phone,
                          purpose: "login",
                        })
                      }
                      className="bg-primary text-white px-6 py-2 rounded-md text-sm font-medium"
                    >
                      Resend OTP
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Address Section */}
          {verified && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Delivery Address
              </h2>

              {/* Existing Addresses */}
              {addresses.map((addr, i) => (
                <div
                  key={addr.id || i}
                  onClick={() => {
                    setSelectedAddress(i);
                    setIsAuthenticated(true);
                  }}
                  className={`border p-4 rounded-lg mb-3 cursor-pointer ${
                    selectedAddress === i
                      ? "border-theme bg-theme/10"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <p className="font-semibold text-primary">
                    {addr.deliveredtopersonname}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {addr.deliveredtopersonmobileno}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {addr.addresslineone}, {addr.addresslinetwo}, {addr.city},{" "}
                    {addr.state} - {addr.postalcode}
                  </p>
                </div>
              ))}

              {/* New Address Form */}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Add New Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newAddress.deliveredtopersonname}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        deliveredtopersonname: e.target.value,
                      })
                    }
                    className="border border-gray-300 text-sm rounded-md px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={newAddress.deliveredtopersonmobileno}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        deliveredtopersonmobileno: e.target.value,
                      })
                    }
                    className="border border-gray-300 text-sm rounded-md px-4 py-2"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={newAddress.addresslineone}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      addresslineone: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded-md px-4 py-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={newAddress.addresslinetwo}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      addresslinetwo: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded-md px-4 py-2 mb-2 w-full"
                />

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        city: e.target.value,
                      })
                    }
                    className="border border-gray-300 text-sm rounded-md px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        state: e.target.value,
                      })
                    }
                    className="border border-gray-300 text-sm rounded-md px-4 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={newAddress.postalcode}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        postalcode: e.target.value,
                      })
                    }
                    className="border border-gray-300 text-sm rounded-md px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Landmark"
                    value={newAddress.landmark}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        landmark: e.target.value,
                      })
                    }
                    className="border border-gray-300 text-sm rounded-md px-4 py-2"
                  />
                </div>

                <button
                  onClick={handleAddAddress}
                  disabled={addAddressMutation.isPending}
                  className="bg-theme text-white px-6 py-2 rounded-md text-sm font-medium mt-2 hover:bg-theme/80"
                >
                  {addAddressMutation.isPending ? "Adding..." : "Add Address"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit sticky top-5">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Order Summary
          </h2>
          {cartItems.length > 0 && (
            <>
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
                  onClick={startPayment}
                  disabled={loading}
                  className="w-full mt-6 bg-primary text-white py-3 rounded-md font-medium hover:bg-theme transition-all"
                >
                  {loading ? "Processing..." : "Proceed to Payment →"}
                </button>
              )}
            </>
          )}
        </div>
        {tempMessage && (
          <div className="fixed top-32 right-5 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fade z-50">
            {tempMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
