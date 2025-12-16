import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateOtp, verifyOtp, fetchUserById } from "../api/userApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import CheckoutAddresses from "../components/checkout/CheckoutAddresses";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [tempMessage, setTempMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({ phone: "" });
  const deliveryCharge = 0;

  const showTempMessage = (msg) => {
    setTempMessage(msg);
    setTimeout(() => setTempMessage(""), 3000);
  };

  // ===========================
  // Load stored user
  // ===========================
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userid) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // ===========================
  // Fetch user details
  // ===========================
  const { data: fetchedUser } = useQuery({
    queryKey: ["checkoutUser", user?.userid],
    queryFn: () => fetchUserById(user.userid),
    enabled: !!user?.userid,
    onSuccess: (data) => {
      const updatedUser = {
        userid: data.id,
        name: `${data.firstname} ${data.lastname}`,
        phone: data.mobile,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsAuthenticated(true);
    },
  });

  // ===========================
  // Input Handler
  // ===========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ===========================
  // Generate OTP
  // ===========================
  const generateOtpMutation = useMutation({
    mutationFn: async () => {
      return await generateOtp({
        channel: "whatsapp",
        identifier: formData.phone,
        purpose: "login",
      });
    },
    onSuccess: () => {
      setIsOtpSent(true);
      setOtp("");
      showTempMessage("✅ OTP sent successfully on WhatsApp!");
    },
    onError: () => {
      showTempMessage("❌ Failed to send OTP");
    },
  });

  // ===========================
  // Verify OTP
  // ===========================
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      return await verifyOtp({
        channel: "whatsapp",
        identifier: formData.phone,
        purpose: "login",
        code: otp,
      });
    },
    onSuccess: (res) => {
      if (res?.verified) {
        const newUser = { userid: res.user.userid };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        setIsAuthenticated(true);
        showTempMessage("✅ Login successful!");
      } else {
        showTempMessage("❌ Incorrect OTP!");
      }
    },
    onError: () => {
      showTempMessage("❌ OTP verification failed");
    },
  });

  // ===========================
  // Logged-in Checkout UI
  // ===========================
  if (user && fetchedUser && isAuthenticated) {
    return (
      <div className="w-full min-h-screen pt-20 max-sm:pt-24 max-sm:px-6 p-10">
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

        <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CheckoutAddresses
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setIsAuthenticated={setIsAuthenticated}
            showTempMessage={showTempMessage}
          />

          <CheckoutSummary
            deliveryCharge={deliveryCharge}
            verified
            isAuthenticated
            startLoading={setLoading}
            loading={loading}
            selectedAddress={selectedAddress}
            showTempMessage={showTempMessage}
          />
        </div>

        {tempMessage && (
          <div className="fixed top-32 right-5 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg z-50">
            {tempMessage}
          </div>
        )}
      </div>
    );
  }

  // ===========================
  // OTP Login Screen
  // ===========================
  return (
    <div className="pt-28 p-10 max-sm:pt-24 max-sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border p-8">
        <h1 className="text-3xl font-semibold mb-6">Sign In</h1>

        <form className="space-y-6">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border rounded-md px-4 py-3"
            required
          />

          {isOtpSent && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border rounded-md px-4 py-3"
            />
          )}

          {!isOtpSent ? (
            <button
              type="button"
              onClick={() => generateOtpMutation.mutate()}
              className="bg-theme text-white px-7 py-3 rounded-lg"
            >
              Get OTP
            </button>
          ) : (
            <button
              type="button"
              onClick={() => verifyOtpMutation.mutate()}
              className="bg-primary text-white px-7 py-3 rounded-lg"
            >
              Verify OTP
            </button>
          )}
        </form>
      </div>

      {tempMessage && (
        <div className="fixed top-32 right-5 bg-black text-white px-4 py-2 rounded-lg">
          {tempMessage}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
