import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateOtp, verifyOtp, addUser, fetchUserById } from "../api/userApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import CheckoutAddresses from "../components/checkout/CheckoutAddresses";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [tempMessage, setTempMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    mobile: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({ phone: "" });
  const deliveryCharge = 0;

  const showTempMessage = (msg) => {
    setTempMessage(msg);
    setTimeout(() => setTempMessage(""), 3000);
  };

  // ✅ Load stored user & cart
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userid) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // ✅ Fetch user details if logged in
  const { data: fetchedUser, refetch: refetchUser } = useQuery({
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

  // ---------------------------
  // Input Handlers
  // ---------------------------
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------------------
  // Generate OTP
  // ---------------------------
  const generateOtpMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        channel: "whatsapp",
        identifier: formData.phone,
        purpose: "login",
      };
      return await generateOtp(payload);
    },
    onSuccess: () => {
      setIsOtpSent(true);
      setOtp("");
      showTempMessage("✅ OTP sent successfully on WhatsApp!");
    },
  });

  // ---------------------------
  // Verify OTP
  // ---------------------------
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        channel: "whatsapp",
        identifier: formData.phone,
        purpose: "login",
        code: otp,
      };
      return await verifyOtp(payload);
    },
    onSuccess: (res) => {
      if (res?.verified) {
        const newUser = { userid: res.user.userid };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        refetchUser();
        showTempMessage("✅ OTP verified successfully!");

        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        showTempMessage("❌ Incorrect OTP!");
      }
    },
    onError: () => {
      showTempMessage("❌ OTP verification failed. Please try again.");
    },
  });

  // ---------------------------
  // Signup Mutation
  // ---------------------------
  const signupMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...signupData,
        roleId: [6],
        usertypeid: 3,
      };
      return await addUser(payload);
    },
    onSuccess: (res) => {
      if (res?.id) {
        const newUser = { userid: res.id };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        refetchUser();
        showTempMessage("✅ Account created successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    },
  });

  // ---------------------------
  // If Logged In → Show Checkout Sections
  // ---------------------------
  if (user && fetchedUser && isAuthenticated) {
    return (
      <div className="w-full min-h-screen pt-20 max-sm:pt-24 max-sm:px-6 p-10">
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

        <h1 className="text-3xl font-semibold mb-6 max-sm:text-2xl">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE — Delivery Address */}
          <CheckoutAddresses
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setIsAuthenticated={setIsAuthenticated}
            showTempMessage={showTempMessage}
          />

          {/* RIGHT SIDE — Order Summary */}
          <CheckoutSummary
            deliveryCharge={deliveryCharge}
            verified={true}
            isAuthenticated={true}
            startLoading={setLoading}
            loading={loading}
            addresses={addresses}
            selectedAddress={selectedAddress}
            showTempMessage={showTempMessage}
          />
        </div>

        {tempMessage && (
          <div className="fixed top-32 right-5 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fade z-50">
            {tempMessage}
          </div>
        )}
      </div>
    );
  }

  // ---------------------------
  // Not Logged In → Auth Popup (Sign-in/Signup)
  // ---------------------------
  return (
    <div className="pt-28 p-10 max-sm:pt-24 max-sm:px-6">
      {!isSignup ? (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <h1 className="text-3xl font-semibold mb-6">Sign In</h1>

          <form className="space-y-6">
            {/* Phone Input */}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-theme"
              required
            />

            {/* OTP Input Box */}
            {isOtpSent && (
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP received on WhatsApp"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-theme"
              />
            )}

            {/* Buttons */}
            {!isOtpSent ? (
              <button
                type="button"
                onClick={() => generateOtpMutation.mutate()}
                className="bg-theme text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-theme/80"
              >
                Get OTP
              </button>
            ) : (
              <button
                type="button"
                onClick={() => verifyOtpMutation.mutate()}
                className="bg-primary text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-primary/80"
              >
                Verify OTP
              </button>
            )}

            <p
              onClick={() => {
                setIsSignup(true);
                setIsOtpSent(false);
                setOtp("");
              }}
              className="text-sm text-center text-primary cursor-pointer hover:underline"
            >
              Don’t have an account? Sign up
            </p>
          </form>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <h1 className="text-3xl font-semibold mb-6">Create Account</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signupMutation.mutate();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstname"
                value={signupData.firstname}
                onChange={handleSignupChange}
                placeholder="First Name"
                required
                className="border border-gray-300 rounded-md px-4 py-3 text-sm"
              />

              <input
                type="text"
                name="lastname"
                value={signupData.lastname}
                onChange={handleSignupChange}
                placeholder="Last Name"
                required
                className="border border-gray-300 rounded-md px-4 py-3 text-sm"
              />
            </div>

            <input
              type="date"
              name="dob"
              value={signupData.dob}
              onChange={handleSignupChange}
              required
              className="border border-gray-300 rounded-md px-4 py-3 text-sm w-full"
            />

            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              placeholder="Email"
              required
              className="border border-gray-300 rounded-md px-4 py-3 text-sm w-full"
            />

            <input
              type="text"
              name="mobile"
              value={signupData.mobile}
              onChange={handleSignupChange}
              placeholder="Mobile Number"
              required
              className="border border-gray-300 rounded-md px-4 py-3 text-sm w-full"
            />

            <button
              type="submit"
              className="bg-theme text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-theme/80"
            >
              Create Account
            </button>

            <p
              onClick={() => {
                setIsSignup(false);
                setIsOtpSent(false);
                setOtp("");
              }}
              className="text-sm text-center text-primary mt-4 cursor-pointer hover:underline"
            >
              Already have an account? Sign in
            </p>
          </form>
        </div>
      )}

      {tempMessage && (
        <div className="fixed top-32 right-5 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fade z-50">
          {tempMessage}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
