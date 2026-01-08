import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateOtp, verifyOtp, addUser } from "../api/userApi";
import jwt_decode from "jwt-decode";
import { useLoginPopup } from "./LoginPopupContext";
import GoogleLoginButton from "../components/googleLogin/GoogleLoginButton";

const LoginPopup = () => {
  const { showLoginPopup, closeLoginPopup, handleLoginSuccess } = useLoginPopup();

  const [formData, setFormData] = useState({ phone: "" });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setFormData({ phone: "" });
    setOtp("");
    setIsOtpSent(false);
    closeLoginPopup();
  };

  // Generate OTP
  const generateOtpMutation = useMutation({
    mutationFn: async () =>
      generateOtp({
        channel: "whatsapp",
        identifier: formData.phone,
        purpose: "login",
      }),
    onSuccess: () => {
      setIsOtpSent(true);
      setOtp("");
      showToast("OTP sent on WhatsApp 📲", "success");
    },
    onError: () => {
      showToast("Failed to send OTP", "error");
    },
  });

  // Verify OTP
  const verifyOtpMutation = useMutation({
    mutationFn: async () =>
      verifyOtp({
        channel: "whatsapp",
        identifier: formData.phone,
        purpose: "login",
        code: otp,
      }),
    onSuccess: (res) => {
      if (res?.verified) {
        handleLoginSuccess({ userid: res.user.userid });
        showToast("Login Successful! 🎉", "success");
        handleClose();
      } else {
        showToast("Incorrect OTP", "error");
      }
    },
    onError: () => {
      showToast("OTP verification failed", "error");
    },
  });

  // Google Login
  const handleGoogleLogin = async (response) => {
    try {
      const decoded = jwt_decode(response.credential);

      const payload = {
        firstname: decoded.given_name,
        lastname: decoded.family_name,
        dob: "2002-11-23",
        email: decoded.email,
        mobile: "9999999999",
        roleId: [6],
        usertypeid: 3,
      };

      const res = await addUser(payload);
      handleLoginSuccess({ userid: res.id });
      showToast("Google Login Successful 🎉", "success");
      handleClose();
    } catch (err) {
      console.error("Google login failed", err);
      showToast("Google login failed", "error");
    }
  };

  if (!showLoginPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-[#f9f9f9] via-[#f8ebdd] to-[#f7c099] rounded-3xl shadow-2xl p-8 w-[90%] max-w-md animate-slideUp relative">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-theme/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-theme" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Welcome! 👋
        </h2>

        <p className="text-gray-500 text-center text-sm mb-3">
          Please login to continue
        </p>

        <h2 className="text-orange-500 text-center text-lg font-bold mb-6">🎉 Login reward unlocked: 5% OFF</h2>

        {/* Phone Input */}
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-theme/50"
        />

        {/* OTP Input */}
        {isOtpSent && (
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-theme/50"
          />
        )}

        {/* Action Button */}
        {!isOtpSent ? (
          <button
            onClick={() => generateOtpMutation.mutate()}
            disabled={generateOtpMutation.isLoading || !formData.phone}
            className="w-full bg-theme text-white py-3 rounded-lg font-medium hover:bg-theme/90 disabled:opacity-50"
          >
            {generateOtpMutation.isLoading ? "Sending..." : "Get OTP"}
          </button>
        ) : (
          <button
            onClick={() => verifyOtpMutation.mutate()}
            disabled={verifyOtpMutation.isLoading || !otp}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {verifyOtpMutation.isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        )}

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLoginButton onSuccess={handleGoogleLogin} />
        </div>

        {/* Skip Button */}
        <button
          onClick={handleClose}
          className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700"
        >
          Maybe later
        </button>

        {/* Toast */}
        {toast.message && (
          <div
            className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm shadow-lg
            ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;