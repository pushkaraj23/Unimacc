import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateOtp, verifyOtp } from "../api/userApi";
import OrdersSection from "../components/shared/OrdersSection";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [profileData, setProfileData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // 🧠 Load user data from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  // 🧩 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Mutation: Generate OTP
  const generateOtpMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        channel: "phone",
        identifier: formData.phone,
        purpose: "login",
      };
      return await generateOtp(payload);
    },
    onSuccess: (res) => {
      setOtp(res.code);
      setIsOtpSent(true);
      alert(`✅ OTP sent successfully! (Dev Mode: ${res.code})`);
    },
    onError: (err) => {
      alert("❌ Error sending OTP: " + err.message);
    },
  });

  // ✅ Mutation: Verify OTP
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        channel: "phone",
        identifier: formData.phone,
        purpose: "login",
        code: otp,
      };
      return await verifyOtp(payload);
    },
    onSuccess: (res) => {
      console.log("OTP Verify Response:", res);

      if (res?.verified) {
        setIsVerified(true);
        setIsOtpSent(false);
        setProfileData(res);
        alert("✅ OTP verified successfully!");
      } else {
        alert("❌ Wrong OTP!");
      }
    },
    onError: (err) => {
      console.error(err);
      alert("Something went wrong, try again.");
    },
  });

  // 📝 Save Profile (after OTP verified)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified) return alert("Please verify OTP first.");

    const newUser = {
      name: formData.name,
      phone: formData.phone,
      userid: profileData?.user?.userid,
      usertoken: profileData?.usertoken,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    alert("✅ Profile saved successfully!");
  };

  // ✅ Logged-in Profile UI
  if (user) {
    return (
      <div className="pt-28 p-10 max-sm:pt-24 max-sm:px-6">
        <div className="font-normal py-1 text-sm mb-2">
          <button className="text-primary" onClick={() => navigate("/")}>
            Home
          </button>{" "}
          /{" "}
          <button
            className="text-theme"
          >
            Profile
          </button>
        </div>
        <h1 className="text-3xl font-semibold mb-6 max-sm:mt-1">Profile Page</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT — Profile Info */}
          <div className="bg-theme/10 rounded-2xl shadow-sm border backdrop-blur-md sticky h-fit top-7 border-theme p-6">
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
            </div>
          </div>

          {/* RIGHT — Orders */}
          <OrdersSection userid={user.userid} />
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

              <div className="border-t border-gray-200 pt-4 space-y-4">
                {selectedOrder.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-semibold text-primary">
                      ₹{item.price?.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 🧾 If user not logged in
  return (
    <div className="pt-28 p-10 max-sm:pt-24 max-sm:px-6">
      <h1 className="text-3xl font-semibold mb-6 max-sm:mt-1">Profile</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <h2 className="text-2xl font-medium mb-8 text-primary">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
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

          {/* Phone */}
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

          {/* OTP Input */}
          {isOtpSent && !isVerified && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-theme focus:border-theme transition-all"
              />
            </div>
          )}

          {/* Get OTP */}
          {!isOtpSent && !isVerified && (
            <button
              type="button"
              onClick={() => generateOtpMutation.mutate()}
              disabled={generateOtpMutation.isPending}
              className={`w-full md:w-fit px-7 py-3 rounded-lg text-sm font-medium shadow-md transition-transform duration-200 ${
                generateOtpMutation.isPending
                  ? "bg-theme/30 cursor-not-allowed"
                  : "bg-theme hover:bg-theme/80 text-white hover:scale-[1.02]"
              }`}
            >
              {generateOtpMutation.isPending ? "Sending OTP..." : "Get OTP"}
            </button>
          )}

          {/* Verify OTP */}
          {isOtpSent && !isVerified && (
            <button
              type="button"
              onClick={() => verifyOtpMutation.mutate()}
              disabled={verifyOtpMutation.isPending}
              className={`w-full md:w-fit px-7 py-3 rounded-lg text-sm font-medium shadow-md transition-transform duration-200 ${
                verifyOtpMutation.isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-theme text-white hover:scale-[1.02]"
              }`}
            >
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
            </button>
          )}

          {/* Save Profile (only after verified) */}
          {isVerified && (
            <button
              type="submit"
              className="w-full md:w-fit px-7 bg-theme hover:bg-theme/80 text-white py-3 rounded-lg text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              Save Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
