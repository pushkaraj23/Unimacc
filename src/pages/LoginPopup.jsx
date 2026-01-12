// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { generateOtp, verifyOtp, addUser } from "../api/userApi";
// import jwt_decode from "jwt-decode";
// import { useLoginPopup } from "./LoginPopupContext";
// import GoogleLoginButton from "../components/googleLogin/GoogleLoginButton";

// const LoginPopup = () => {
//   const { showLoginPopup, closeLoginPopup, handleLoginSuccess } = useLoginPopup();

//   const [formData, setFormData] = useState({ phone: "" });
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [toast, setToast] = useState({ message: "", type: "" });

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast({ message: "", type: "" }), 3000);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleClose = () => {
//     setFormData({ phone: "" });
//     setOtp("");
//     setIsOtpSent(false);
//     closeLoginPopup();
//   };

//   // Generate OTP
//   const generateOtpMutation = useMutation({
//     mutationFn: async () =>
//       generateOtp({
//         channel: "whatsapp",
//         identifier: formData.phone,
//         purpose: "login",
//       }),
//     onSuccess: () => {
//       setIsOtpSent(true);
//       setOtp("");
//       showToast("OTP sent on WhatsApp 📲", "success");
//     },
//     onError: () => {
//       showToast("Failed to send OTP", "error");
//     },
//   });

//   // Verify OTP
//   const verifyOtpMutation = useMutation({
//     mutationFn: async () =>
//       verifyOtp({
//         channel: "whatsapp",
//         identifier: formData.phone,
//         purpose: "login",
//         code: otp,
//       }),
//     onSuccess: (res) => {
//       if (res?.verified) {
//         handleLoginSuccess({ userid: res.user.userid });
//         showToast("Login Successful! 🎉", "success");
//         handleClose();
//       } else {
//         showToast("Incorrect OTP", "error");
//       }
//     },
//     onError: () => {
//       showToast("OTP verification failed", "error");
//     },
//   });

//   // Google Login
//   const handleGoogleLogin = async (response) => {
//     try {
//       const decoded = jwt_decode(response.credential);

//       const payload = {
//         firstname: decoded.given_name,
//         lastname: decoded.family_name,
//         dob: "2002-11-23",
//         email: decoded.email,
//         mobile: "9999999999",
//         roleId: [6],
//         usertypeid: 3,
//       };

//       const res = await addUser(payload);
//       handleLoginSuccess({ userid: res.id });
//       showToast("Google Login Successful 🎉", "success");
//       handleClose();
//     } catch (err) {
//       console.error("Google login failed", err);
//       showToast("Google login failed", "error");
//     }
//   };

//   if (!showLoginPopup) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
//       <div className="bg-gradient-to-br from-[#f9f9f9] via-[#f8ebdd] to-[#f7c099] rounded-3xl shadow-2xl p-8 w-[90%] max-w-md animate-slideUp relative">

//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Icon */}
//         <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-theme/10 flex items-center justify-center">
//           <svg className="w-8 h-8 text-theme" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//           </svg>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
//           Welcome! 👋
//         </h2>

//         <p className="text-gray-500 text-center text-sm mb-3">
//           Please login to continue
//         </p>

//         <h2 className="text-orange-500 text-center text-lg font-bold mb-6">🎉 Login reward unlocked: 5% OFF</h2>

//         {/* Phone Input */}
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Enter your phone number"
//           className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-theme/50"
//         />

//         {/* OTP Input */}
//         {isOtpSent && (
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-theme/50"
//           />
//         )}

//         {/* Action Button */}
//         {!isOtpSent ? (
//           <button
//             onClick={() => generateOtpMutation.mutate()}
//             disabled={generateOtpMutation.isLoading || !formData.phone}
//             className="w-full bg-theme text-white py-3 rounded-lg font-medium hover:bg-theme/90 disabled:opacity-50"
//           >
//             {generateOtpMutation.isLoading ? "Sending..." : "Get OTP"}
//           </button>
//         ) : (
//           <button
//             onClick={() => verifyOtpMutation.mutate()}
//             disabled={verifyOtpMutation.isLoading || !otp}
//             className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
//           >
//             {verifyOtpMutation.isLoading ? "Verifying..." : "Verify OTP"}
//           </button>
//         )}

//         {/* Divider */}
//         <div className="flex items-center my-5">
//           <div className="flex-1 h-px bg-gray-200"></div>
//           <span className="px-3 text-gray-400 text-sm">or</span>
//           <div className="flex-1 h-px bg-gray-200"></div>
//         </div>

//         {/* Google Login */}
//         <div className="flex justify-center">
//           <GoogleLoginButton onSuccess={handleGoogleLogin} />
//         </div>

//         {/* Skip Button */}
//         <button
//           onClick={handleClose}
//           className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700"
//         >
//           Maybe later
//         </button>

//         {/* Toast */}
//         {toast.message && (
//           <div
//             className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm shadow-lg
//             ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}
//           >
//             {toast.message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;


// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { generateOtp, verifyOtp, addUser } from "../api/userApi";
// import jwt_decode from "jwt-decode";
// import { useLoginPopup } from "./LoginPopupContext";
// import GoogleLoginButton from "../components/googleLogin/GoogleLoginButton";
// import { Lock, Phone, MessageSquare, Shield, Zap, Star } from "lucide-react";

// const LoginPopup = () => {
//   const { showLoginPopup, closeLoginPopup, handleLoginSuccess } = useLoginPopup();

//   const [formData, setFormData] = useState({ phone: "" });
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [toast, setToast] = useState({ message: "", type: "" });

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast({ message: "", type: "" }), 3000);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleClose = () => {
//     setFormData({ phone: "" });
//     setOtp("");
//     setIsOtpSent(false);
//     closeLoginPopup();
//   };

//   // Generate OTP
//   const generateOtpMutation = useMutation({
//     mutationFn: async () =>
//       generateOtp({
//         channel: "whatsapp",
//         identifier: formData.phone,
//         purpose: "login",
//       }),
//     onSuccess: () => {
//       setIsOtpSent(true);
//       setOtp("");
//       showToast("OTP sent on WhatsApp 📲", "success");
//     },
//     onError: () => {
//       showToast("Failed to send OTP", "error");
//     },
//   });

//   // Verify OTP
//   const verifyOtpMutation = useMutation({
//     mutationFn: async () =>
//       verifyOtp({
//         channel: "whatsapp",
//         identifier: formData.phone,
//         purpose: "login",
//         code: otp,
//       }),
//     onSuccess: (res) => {
//       if (res?.verified) {
//         handleLoginSuccess({ userid: res.user.userid });
//         showToast("Login Successful! 🎉", "success");
//         handleClose();
//       } else {
//         showToast("Incorrect OTP", "error");
//       }
//     },
//     onError: () => {
//       showToast("OTP verification failed", "error");
//     },
//   });

//   // Google Login
//   const handleGoogleLogin = async (response) => {
//     try {
//       const decoded = jwt_decode(response.credential);

//       const payload = {
//         firstname: decoded.given_name,
//         lastname: decoded.family_name,
//         dob: "2002-11-23",
//         email: decoded.email,
//         mobile: "9999999999",
//         roleId: [6],
//         usertypeid: 3,
//       };

//       const res = await addUser(payload);
//       handleLoginSuccess({ userid: res.id });
//       showToast("Google Login Successful 🎉", "success");
//       handleClose();
//     } catch (err) {
//       console.error("Google login failed", err);
//       showToast("Google login failed", "error");
//     }
//   };

//   if (!showLoginPopup) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
//       <div className="flex gap-0 w-[100%] h-[75%] max-w-4xl rounded-3xl shadow-2xl overflow-hidden bg-white">

//         {/* Left Side - Trust & Features */}
//         <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-700 via-orange-600 to-amber-600 p-12 flex-col justify-between relative overflow-hidden">

//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-white"></div>
//             <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full border-2 border-white"></div>
//           </div>

//           <div className="relative z-10">
//             {/* Brand */}
//             <div className="mb-8">
//               <h1 className="text-4xl font-bold text-white mb-3">Welcome Back! 👋</h1>
//               <p className="text-amber-100 text-lg font-light">
//                 Trusted by millions. Don't miss our exclusive launches.
//               </p>
//             </div>

//             {/* Trust Badges */}
//             <div className="space-y-4">
//               <div className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
//                 <Star className="w-6 h-6 text-amber-300 mt-1 flex-shrink-0" />
//                 <div>
//                   <h3 className="font-bold text-white mb-1">Zero Subscription Fees</h3>
//                   <p className="text-amber-100 text-sm">Access exclusive deals without any charges</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
//                 <Zap className="w-6 h-6 text-amber-300 mt-1 flex-shrink-0" />
//                 <div>
//                   <h3 className="font-bold text-white mb-1">Lowest Price Guaranteed</h3>
//                   <p className="text-amber-100 text-sm">Explore unbeatable prices and unmatchable value</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
//                 <Shield className="w-6 h-6 text-amber-300 mt-1 flex-shrink-0" />
//                 <div>
//                   <h3 className="font-bold text-white mb-1">100% Secure & Spam Free</h3>
//                   <p className="text-amber-100 text-sm">Guaranteed data protection & spam-free inbox</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom CTA */}
//           <div className="relative z-10 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
//             <p className="text-white text-sm font-medium">🎁 Login Reward Unlocked</p>
//             <p className="text-amber-100 text-lg font-bold mt-1">Get 5% OFF on your first purchase</p>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="w-full lg:w-1/2 p-8 md:p-12 relative">

//           {/* Close Button */}
//           <button
//             onClick={handleClose}
//             className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 mb-4">
//               <Lock className="w-8 h-8 text-orange-600" />
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               {!isOtpSent ? "Unlock Exclusive Deals" : "Verify Your Number"}
//             </h2>
//             <p className="text-gray-500 text-sm">
//               {!isOtpSent 
//                 ? "Login to access amazing offers" 
//                 : "We've sent an OTP to your WhatsApp"}
//             </p>
//           </div>

//           {/* Phone Input */}
//           {!isOtpSent ? (
//             <div className="space-y-4">
//               <div className="relative">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="flex gap-2">

//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Enter your phone number"
//                     maxLength="10"
//                     className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Notification Checkbox */}
//               <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
//                 <input
//                   type="checkbox"
//                   defaultChecked
//                   id="notify"
//                   className="w-5 h-5 rounded accent-orange-600"
//                 />
//                 <label htmlFor="notify" className="text-sm text-gray-700">
//                   <span className="font-medium">Notify me</span> for updates & exclusive offers
//                 </label>
//               </div>

//               {/* Get OTP Button */}
//               <button
//                 onClick={() => generateOtpMutation.mutate()}
//                 disabled={generateOtpMutation.isLoading || !formData.phone}
//                 className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 <MessageSquare className="w-5 h-5" />
//                 {generateOtpMutation.isLoading ? "Sending OTP..." : "Get OTP on WhatsApp"}
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Enter OTP
//                 </label>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="000000"
//                   maxLength="6"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
//                 />
//                 <p className="text-xs text-gray-500 mt-2 text-center">Check your WhatsApp for the code</p>
//               </div>

//               {/* Verify OTP Button */}
//               <button
//                 onClick={() => verifyOtpMutation.mutate()}
//                 disabled={verifyOtpMutation.isLoading || !otp}
//                 className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {verifyOtpMutation.isLoading ? "Verifying..." : "Verify & Login"}
//               </button>

//               {/* Change Number */}
//               <button
//                 onClick={() => {
//                   setIsOtpSent(false);
//                   setOtp("");
//                 }}
//                 className="w-full text-gray-600 text-sm font-medium py-2 hover:text-orange-600 transition-colors"
//               >
//                 Change phone number
//               </button>
//             </div>
//           )}

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-6">
//             <div className="flex-1 h-px bg-gray-200"></div>
//             <span className="text-gray-400 text-sm font-medium">or continue with</span>
//             <div className="flex-1 h-px bg-gray-200"></div>
//           </div>

//           {/* Google Login */}
//           <div className="flex justify-center mb-4">
//             <GoogleLoginButton onSuccess={handleGoogleLogin} />
//           </div>

//           {/* Skip Button */}
//           <button
//             onClick={handleClose}
//             className="w-full text-gray-500 text-sm font-medium py-2 hover:text-gray-700 transition-colors"
//           >
//             Maybe later
//           </button>

//           {/* Terms */}
//           <p className="text-xs text-gray-500 text-center mt-6">
//             By continuing, you agree to our{" "}
//             <a href="#" className="text-orange-600 hover:underline">
//               Privacy Policy
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-orange-600 hover:underline">
//               Terms & Conditions
//             </a>
//           </p>
//         </div>

//         {/* Toast */}
//         {toast.message && (
//           <div
//             className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-sm font-medium shadow-lg backdrop-blur-md transition-all
//             ${toast.type === "success" 
//               ? "bg-green-500/90 text-white" 
//               : "bg-red-500/90 text-white"}`}
//           >
//             {toast.message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateOtp, verifyOtp, addUser } from "../api/userApi";
import jwt_decode from "jwt-decode";
import { useLoginPopup } from "./LoginPopupContext";
import GoogleLoginButton from "../components/googleLogin/GoogleLoginButton";
import { Lock, MessageSquare, Shield, Zap, Star, X } from "lucide-react";

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-4">
      <div className="flex w-full max-w-4xl h-[80%] max-h-[600px] rounded-3xl shadow-2xl overflow-hidden bg-white">

        {/* Left Side - Trust & Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-700 via-orange-600 to-amber-600 p-8 flex-col justify-between relative overflow-hidden">

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-16 h-16 rounded-full border-2 border-white"></div>
            <div className="absolute bottom-16 right-8 w-24 h-24 rounded-full border-2 border-white"></div>
          </div>

          {/* Scrollable Content */}
          <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar rounded-xl">
            {/* Brand */}
            <div className="mb-6 text-center ">
              <img
                src="/logo.svg"
                alt="Furnit Logo"
                className="mx-auto bg-white mb-2 px-3 py-2 rounded-xl h-14 w-auto"
              />
              {/* 
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back! 👋
              </h1> */}

              <p className="text-white text-base font-light">
                Trusted by millions. Don't miss our exclusive launches.
              </p>
            </div>


            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <Star className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white text-sm">Zero Subscription Fees</h3>
                  <p className="text-amber-100 text-xs">Access exclusive deals without any charges</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <Zap className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white text-sm">Lowest Price Guaranteed</h3>
                  <p className="text-amber-100 text-xs">Explore unbeatable prices and value</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <Shield className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white text-sm">100% Secure & Spam Free</h3>
                  <p className="text-amber-100 text-xs">Guaranteed data protection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA - Fixed at bottom */}
          <div className="relative z-10 mt-4 bg-white/15  backdrop-blur-md rounded-xl py-12 border border-white/20 flex-shrink-0 justify-items-center">
            <p className="text-white text-xl mb-1 font-bold">🎁 Login Reward Unlocked</p>
            <p className="text-amber-100 text-base font-bold">Get 5% OFF on your Login Reward Unlocked</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col relative">

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Form Content */}
          <div className="flex-1  p-3 md:p-8">
            {/* Header */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 mb-3">
                <Lock className="w-7 h-7 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {!isOtpSent ? "Unlock Exclusive Deals" : "Verify Your Number"}
              </h2>
              <p className="text-gray-500 text-sm">
                {!isOtpSent
                  ? "Login to access amazing offers"
                  : "We've sent an OTP to your WhatsApp"}
              </p>
            </div>

            {/* Phone Input */}
            {!isOtpSent ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    maxLength="10"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                  />
                </div>

                {/* Notification Checkbox */}
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <input
                    type="checkbox"
                    defaultChecked
                    id="notify"
                    className="w-4 h-4 rounded accent-orange-600"
                  />
                  <label htmlFor="notify" className="text-sm text-gray-700">
                    <span className="font-medium">Notify me</span> for updates & offers
                  </label>
                </div>

                {/* Get OTP Button */}
                <button
                  onClick={() => generateOtpMutation.mutate()}
                  disabled={generateOtpMutation.isLoading || !formData.phone}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  {generateOtpMutation.isLoading ? "Sending OTP..." : "Get OTP on WhatsApp"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength="6"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1.5 text-center">
                    Check your WhatsApp for the code
                  </p>
                </div>

                {/* Verify OTP Button */}
                <button
                  onClick={() => verifyOtpMutation.mutate()}
                  disabled={verifyOtpMutation.isLoading || !otp}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {verifyOtpMutation.isLoading ? "Verifying..." : "Verify & Login"}
                </button>

                {/* Change Number */}
                <button
                  onClick={() => {
                    setIsOtpSent(false);
                    setOtp("");
                  }}
                  className="w-full text-gray-600 text-sm font-medium py-1 hover:text-orange-600 transition-colors"
                >
                  Change phone number
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-xs font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Login */}
            <div className="flex justify-center">
              <GoogleLoginButton onSuccess={handleGoogleLogin} />
            </div>

            {/* Skip Button */}
            <button
              onClick={handleClose}
              className="w-full text-gray-500 text-sm font-medium py-2 mt-1 hover:text-gray-700 transition-colors"
            >
              Maybe later
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you agree to our{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Terms & Conditions
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-sm font-medium shadow-lg backdrop-blur-md transition-all z-[10000]
          ${toast.type === "success"
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default LoginPopup;