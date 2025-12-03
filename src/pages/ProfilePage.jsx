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
  const [isVerified, setIsVerified] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    mobile: "",
  });

  const [formData, setFormData] = useState({ phone: "" });

  // Load user ID
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.userid) setUser(stored);
  }, []);

  // Fetch user details if ID is stored
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

  // Handle input changes
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
  });

  // Verify OTP (Signin)
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
      if (res?.verified) {
        const newUser = { userid: res.user.userid };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        refetchUser();
        alert("✅ OTP verified successfully!");
      } else {
        alert("❌ Wrong OTP!");
      }
    },
  });

  // Signup mutation
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
        alert("✅ Signup successful!");
      }
    },
  });

  // ✅ If logged in
  if (user && fetchedUser) {
    return (
      <div className="pt-28 p-10 max-sm:pt-24 max-sm:px-6">
        <div className="font-normal py-1 text-sm mb-2">
          <button className="text-primary" onClick={() => navigate("/")}>
            Home
          </button>{" "}
          / <button className="text-theme">Profile</button>
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

  // 🧾 If not logged in
  return (
    <div className="pt-28 p-10 max-sm:pt-24 max-sm:px-6">
      {!isSignup ? (
        // ---- Sign In ----
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8">
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
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-theme"
              />
            )}
            {!isOtpSent && (
              <button
                type="button"
                onClick={() => generateOtpMutation.mutate()}
                className="bg-theme text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-theme/80"
              >
                Get OTP
              </button>
            )}
            {isOtpSent && (
              <button
                type="button"
                onClick={() => verifyOtpMutation.mutate()}
                className="bg-primary text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-theme"
              >
                Verify OTP
              </button>
            )}
            <p
              onClick={() => setIsSignup(true)}
              className="text-sm text-center text-primary mt-4 cursor-pointer hover:underline"
            >
              Don’t have an account? Sign up
            </p>
          </form>
        </div>
      ) : (
        // ---- Sign Up ----
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
                className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-theme"
              />
              <input
                type="text"
                name="lastname"
                value={signupData.lastname}
                onChange={handleSignupChange}
                placeholder="Last Name"
                required
                className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-theme"
              />
            </div>
            <input
              type="date"
              name="dob"
              value={signupData.dob}
              onChange={handleSignupChange}
              required
              className="border border-gray-300 rounded-md px-4 py-3 text-sm w-full focus:ring-2 focus:ring-theme"
            />
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              placeholder="Email"
              required
              className="border border-gray-300 rounded-md px-4 py-3 text-sm w-full focus:ring-2 focus:ring-theme"
            />
            <input
              type="text"
              name="mobile"
              value={signupData.mobile}
              onChange={handleSignupChange}
              placeholder="Mobile Number"
              required
              className="border border-gray-300 rounded-md px-4 py-3 text-sm w-full focus:ring-2 focus:ring-theme"
            />
            <button
              type="submit"
              className="bg-theme text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-theme/80"
            >
              Create Account
            </button>
            <p
              onClick={() => setIsSignup(false)}
              className="text-sm text-center text-primary mt-4 cursor-pointer hover:underline"
            >
              Already have an account? Sign in
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
