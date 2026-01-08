import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateOtp, verifyOtp, fetchUserById } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileOrders from "../components/profile/ProfileOrders";
import ProfileAddresses from "../components/profile/ProfileAddresses";
import jwt_decode from "jwt-decode";
import { addUser } from "../api/userApi";
import GoogleLoginButton from "../components/googleLogin/GoogleLoginButton";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({ phone: "" });

  // 🔔 Small toast (errors / info)
  const [toast, setToast] = useState({ message: "", type: "" });

  // 🎉 Login success popup
  const [loginSuccess, setLoginSuccess] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  };

  // ===========================
  // Load stored user
  // ===========================
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.userid) setUser(stored);
  }, []);

  // ===========================
  // Fetch user details
  // ===========================
  const { data: fetchedUser, refetch: refetchUser } = useQuery({
    queryKey: ["userDetails", user?.userid],
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
    },
  });

  // ===========================
  // Logout (NO redirect)
  // // ===========================
  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("authToken");
  //   window.dispatchEvent(new Event("localStorageUpdated"));
  //   setUser(null);

  //   showToast("Logged out successfully 👋", "success");
  // };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("localStorageUpdated"));
    setUser(null);

    // 🔥 Tell Google to forget previous selection
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }

    showToast("Logged out successfully 👋", "success");
  };

  // ===========================
  // Input handler
  // ===========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ===========================
  // Generate OTP
  // ===========================
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

  // const handleGoogleLogin = async (response) => {
  //   try {
  //     // 1️⃣ Decode Google token
  //     const decoded = jwt_decode(response.credential);

  //     // 2️⃣ Prepare payload for backend
  //     const payload = {
  //       firstname: decoded.given_name,
  //       lastname: decoded.family_name,
  //       dob: "2002-11-23",       // optional
  //       email: decoded.email,
  //       mobile: "9999999999",   // optional
  //       roleId: [6],
  //       usertypeid: 3,
  //     };

  //     // 3️⃣ Call backend API
  //     const res = await addUser(payload);

  //     // 4️⃣ Store user locally
  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify({ userid: res.id })
  //     );

  //     alert("Google Login Successful 🎉");
  //   } catch (err) {
  //     console.error("Google login failed", err);
  //   }
  // };


  const handleGoogleLogin = async (response) => {
    try {
      // 1️⃣ Decode Google token
      const decoded = jwt_decode(response.credential);

      // 2️⃣ Prepare payload for backend
      const payload = {
        firstname: decoded.given_name,
        lastname: decoded.family_name,
        dob: "2002-11-23",       // optional
        email: decoded.email,
        mobile: "9999999999",   // optional
        roleId: [6],
        usertypeid: 3,
      };

      // 3️⃣ Call backend API
      const res = await addUser(payload);

      // 4️⃣ Store user locally
      localStorage.setItem("user", JSON.stringify({ userid: res.id }));

      // 🎉 Show success toast
      showToast("Google Login Successful 🎉", "success");
      navigate("/");

    } catch (err) {
      console.error("Google login failed", err);
      showToast("Google login failed. Please try again.", "error");
    }
  };

  // ===========================
  // Verify OTP
  // ===========================
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
        const newUser = { userid: res.user.userid };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        refetchUser();

        // 🎉 Show success popup
        setLoginSuccess(true);

        // ⏳ Redirect after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        showToast("Incorrect OTP", "error");
      }
    },
    onError: () => {
      showToast("OTP verification failed", "error");
    },
  });

  // ===========================
  // Logged-in Profile View
  // ===========================
  if (user && fetchedUser) {
    return (
      <div className="pt-20 p-10 max-sm:pt-24 max-sm:px-6">
        <div className="font-normal py-1 text-sm mb-2 flex justify-between items-center">
          <div>
            <button className="text-primary" onClick={() => navigate("/")}>
              Home
            </button>{" "}
            / <button className="text-theme">Profile</button>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <h1 className="text-3xl font-semibold mb-6">Profile Page</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProfileDetails user={fetchedUser} refetch={refetchUser} />
          <ProfileAddresses userid={user.userid} />
        </div>

        <ProfileOrders userid={user.userid} />
        {/* 🎉 LOGIN SUCCESS POPUP */}
        {loginSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl px-10 py-8 text-center w-[90%] max-w-md animate-scale-in">
              {/* ✅ Success Icon */}
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* 🎉 Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Logged in Successfully
              </h2>

              {/* ⏳ Subtitle */}
              <p className="text-gray-500 text-sm mb-6">
                Redirecting to home page...
              </p>

              {/* ⏱ Loader */}
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-full bg-green-500 animate-progress"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===========================
  // OTP Login View
  // ===========================
  return (
    <div className="pt-20 p-10 max-sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 mt-6">
        <h1 className="text-3xl font-semibold mb-6">Sign In</h1>

        <form className="space-y-6">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
            required
          />

          {isOtpSent && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP received on WhatsApp"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
            />
          )}

          {!isOtpSent ? (
            <button
              type="button"
              onClick={() => generateOtpMutation.mutate()}
              className="bg-theme text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-theme/80 transition"
            >
              Get OTP
            </button>
          ) : (
            <button
              type="button"
              onClick={() => verifyOtpMutation.mutate()}
              className="bg-primary text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-primary/80 transition"
            >
              Verify OTP
            </button>
          )}
          <div>
            <GoogleLoginButton onSuccess={handleGoogleLogin} />
          </div>
        </form>
      </div>

      {/* 🔔 Small Toast */}
      {toast.message && (
        <div
          className={`fixed top-24 right-6 z-50 px-4 py-2 rounded-lg text-sm shadow-lg transition-all duration-300
          ${toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-500 text-white"
            }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
