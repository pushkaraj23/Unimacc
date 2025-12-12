import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateOtp, verifyOtp, addUser, fetchUserById } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileOrders from "../components/profile/ProfileOrders";
import ProfileAddresses from "../components/profile/ProfileAddresses";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    mobile: "",
  });

  const [formData, setFormData] = useState({ phone: "" });

  // Load stored user
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.userid) setUser(stored);
  }, []);

  // Fetch user details
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

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("localStorageUpdated"));
    setUser(null);
    window.location.reload(); // Refresh component
  };

  // Input Handlers
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate OTP
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
      alert("✅ OTP sent successfully on WhatsApp!");
    },
  });

  // Verify OTP
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
        alert("✅ OTP verified successfully!");
      } else {
        alert("❌ Incorrect OTP!");
      }
    },
  });

  // Signup Mutation
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
        alert("✅ Account created successfully!");
      }
    },
  });

  // ---------------------------
  // If Logged In → Show Profile
  // ---------------------------
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

          {/* ✅ LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
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
      </div>
    );
  }

  // ---------------------------
  // Not Logged In (Sign-in + OTP)
  // ---------------------------
  return (
    <div className="pt-20 p-10  max-sm:px-6">
      {!isSignup ? (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 mt-4 md:mb-10 md:mt-12">
          <h1 className="text-3xl font-semibold mb-6">Sign In</h1>

          <form className="space-y-6">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-theme"
              required
            />

            {isOtpSent && (
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP received on WhatsApp"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-theme"
              />
            )}

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
              className="text-sm text-center text-primary cursor-pointer group"
            >
              Don’t have an account? <span className="text-theme group-hover:underline">Sign up</span>
            </p>
          </form>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 mt-4 md:mb-10 md:mt-12">
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
              className="text-sm text-center text-primary mt-4 cursor-pointer group"
            >
              Already have an account? <span className="text-theme group-hover:underline">Sign in</span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
