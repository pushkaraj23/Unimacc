import axiosInstance from "./axiosInstance";

export const fetchProducts = async () => {
  const res = await axiosInstance.get("/products");
  if (res.status !== 200) throw new Error("Failed to fetch products");
  return res.data.body || [];
};

export const fetchCategories = async () => {
  const res = await axiosInstance.get("/categories");
  if (res.status !== 200) throw new Error("Failed to fetch categories");
  return res.data.body || [];
};

export const fetchHeroSectionContent = async () => {
  const res = await axiosInstance.get("/content");
  if (res.status !== 200) throw new Error("Failed to fetch content");

  const allContent = res.data.body || [];

  // Filter only Hero Section and parse nested JSON
  const heroSection = allContent
    .filter((item) => item.contenttypes === "Hero Section" && !item.isdeleted)
    .map((item) => {
      const parsed = JSON.parse(item.content || "{}");
      return {
        id: item.id,
        contentimage: item.contentimage,
        title: parsed.title || "",
        mobileImage: parsed.mobileImage || "",
      };
    });

  return heroSection;
};

export const generateOtp = async (payload) => {
  const res = await axiosInstance.post("/manageotp/get-otp", payload);
  if (res.status !== 200) throw new Error("Failed to generate OTP");
  return res.data.body; // { success, code, expiresAt }
};

export const verifyOtp = async (payload) => {
  const res = await axiosInstance.post("/manageotp/verify-otp", payload);
  if (res.status !== 200) throw new Error("Failed to verify OTP");
  return res.data.body; // e.g. { success: true, token, user }
};

export const addCustomerAddress = async (payload) => {
  const res = await axiosInstance.post("/customeraddresses", payload);
  if (res.status !== 200) throw new Error("Failed to add address");
  return res.data.body || res.data;
};

// ✅ Create new Order (used in Razorpay checkout)
export const createOrder = async (payload) => {
  try {
    const res = await axiosInstance.post("/orders", payload);
    console.log("🧾 Backend Response:", res.data);
    if (res.status !== 200) throw new Error("Failed to create order");
    return res.data.body || res.data;
  } catch (error) {
    console.error("❌ createOrder error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch Single Product by ID
export const fetchProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    if (res.status !== 200) throw new Error("Failed to fetch product");
    return res.data.body || res.data;
  } catch (error) {
    console.error("❌ fetchProductById error:", error.response?.data || error.message);
    throw error;
  }
};
