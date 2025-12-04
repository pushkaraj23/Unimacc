import axiosInstance from "./axiosInstance";

export const fetchProducts = async () => {
  const res = await axiosInstance.get("/products");
  if (res.status !== 200) throw new Error("Failed to fetch products");
  return res.data.body || [];
};

export const fetchProductsByCategory = async (categoryName) => {
  try {
    const allProducts = await fetchProducts();
    const filtered = allProducts.filter(
      (item) => item.category?.toLowerCase() === categoryName?.toLowerCase()
    );

    return filtered;
  } catch (error) {
    console.error("❌ fetchProductsByCategory error:", error.message);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories");
    if (res.status !== 200) throw new Error("Failed to fetch categories");

    let allCategories = res.data.body || [];

    // Keep only active categories
    allCategories = allCategories.filter((cat) => cat.isactive === true);

    // Separate active parents and children
    const parentCategories = allCategories.filter(
      (cat) => cat.parentid === null
    );
    const childCategories = allCategories.filter(
      (cat) => cat.parentid !== null
    );

    // Build parent → children mapping with parent ID included
    const categoryMap = {};

    parentCategories.forEach((parent) => {
      const children = childCategories
        .filter((child) => child.parentid === parent.id)
        .map((child) => ({
          id: child.id,
          name: child.name,
        }));

      categoryMap[parent.name] = {
        id: parent.id,
        children: children,
      };
    });

    return categoryMap;
  } catch (error) {
    console.error(
      "❌ fetchCategories error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchHeroSectionContent = async () => {
  try {
    const res = await axiosInstance.get("/content");
    if (res.status !== 200) throw new Error("Failed to fetch content");

    const allContent = res.data.body || [];

    // 🔹 Filter only active Hero Sections
    const heroSection = allContent
      .filter((item) => item.contenttypes === "Hero Section" && !item.isdeleted)
      .map((item) => {
        const parsed = JSON.parse(item.content || "{}");
        return {
          id: item.id,
          contentimage: item.contentimage,
          title: parsed.title || "",
          mobileImage: parsed.mobileImage || "",
          offer_id: item.offer_id || null, // ✅ Include offer_id
        };
      });

    return heroSection;
  } catch (error) {
    console.error(
      "❌ fetchHeroSectionContent error:",
      error.response?.data || error.message
    );
    throw error;
  }
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

export const createOrder = async (payload) => {
  try {
    const res = await axiosInstance.post("/orders", payload);
    console.log("🧾 Backend Response:", res.data);
    if (res.status !== 200) throw new Error("Failed to create order");
    return res.data.body || res.data;
  } catch (error) {
    console.error(
      "❌ createOrder error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    if (res.status !== 200) throw new Error("Failed to fetch product");
    return res.data.body || res.data;
  } catch (error) {
    console.error(
      "❌ fetchProductById error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchRecommendedProducts = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/recommended/${id}`);
    if (res.status !== 200)
      throw new Error("Failed to fetch recommended products");
    return res.data.body || [];
  } catch (error) {
    console.error(
      "❌ fetchRecommendedProducts error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchDiscountById = async (id) => {
  try {
    const res = await axiosInstance.get(`/discounts/${id}`);
    if (res.status !== 200) throw new Error("Failed to fetch discount");
    return res.data.body || res.data; // return the document body or fallback to raw data
  } catch (error) {
    console.error(
      "❌ fetchDiscountById error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchProductCollections = async () => {
  try {
    const res = await axiosInstance.get("/productcollections");
    if (res.status !== 200)
      throw new Error("Failed to fetch product collections");
    return res.data.body || res.data; // return list of collections
  } catch (error) {
    console.error(
      "❌ fetchProductCollections error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchPromotions = async () => {
  try {
    const res = await axiosInstance.get("/promotions");
    if (res.status !== 200) throw new Error("Failed to fetch promotions");
    return res.data.body || res.data; // return list of promotions
  } catch (error) {
    console.error(
      "❌ fetchPromotions error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchPromotionalVideos = async () => {
  try {
    const res = await axiosInstance.get("/promotionalvideos");
    if (res.status !== 200)
      throw new Error("Failed to fetch promotional videos");
    return res.data.body || res.data; // returns the list of videos
  } catch (error) {
    console.error(
      "❌ fetchPromotionalVideos error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchProductsBySearch = async (productName) => {
  try {
    if (!productName) throw new Error("Search query cannot be empty");

    const res = await axiosInstance.get(
      `/products/search/${encodeURIComponent(productName)}`
    );
    if (res.status !== 200)
      throw new Error("Failed to fetch products by search");

    return res.data.body || res.data; // return list of matching products
  } catch (error) {
    console.error(
      "❌ fetchProductsBySearch error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchDiscountPercents = async () => {
  try {
    const res = await axiosInstance.get(
      "/products/get-products/by/discount-percents"
    );
    if (res.status !== 200)
      throw new Error("Failed to fetch discount percents");

    const data = res.data.body || [];

    // 🔹 Filter out zero and sort descending
    const filtered = data.filter((d) => d > 0).sort((a, b) => b - a);

    return filtered;
  } catch (error) {
    console.error(
      "❌ fetchDiscountPercents error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchProductsByDiscountPercent = async (percent) => {
  try {
    if (!percent) throw new Error("Discount percent is required");

    const res = await axiosInstance.get(`/products?discountpercent=${percent}`);
    if (res.status !== 200)
      throw new Error("Failed to fetch products by discount percent");

    return res.data.body || [];
  } catch (error) {
    console.error(
      "❌ fetchProductsByDiscountPercent error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchBlogs = async () => {
  try {
    const res = await axiosInstance.get("/blogs");
    if (res.status !== 200) throw new Error("Failed to fetch blogs");
    const blogs = res.data.body || [];
    // ✅ Return only active blogs
    return blogs.filter((blog) => blog.isactive === true);
  } catch (error) {
    console.error(
      "❌ fetchBlogs error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchBlogById = async (id) => {
  try {
    if (!id) throw new Error("Blog ID is required");
    const res = await axiosInstance.get(`/blogs/${id}`);
    if (res.status !== 200) throw new Error("Failed to fetch blog details");

    return res.data.body || null;
  } catch (error) {
    console.error(
      "❌ fetchBlogById error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchCategoryNameById = async (id) => {
  try {
    const response = await axiosInstance.get(`/categories/${id}`);

    // Check response status
    if (response.status !== 200) {
      throw new Error(`Failed to fetch category with ID ${id}`);
    }

    const data = response.data;

    // Validate and return category name
    if (data?.code === 200 && data?.body?.name) {
      return data.body.name;
    } else {
      console.warn("Unexpected response format:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching category name:", error);
    return null;
  }
};

export const fetchOrderById = async (id) => {
  try {
    if (!id) throw new Error("Order ID is required");
    const res = await axiosInstance.get(`/orders/fetchby/customer/${id}`);
    if (res.status !== 200) {
      throw new Error(`Failed to fetch order with ID ${id}`);
    }
    return res.data.body || null; // Return the order details
  } catch (error) {
    console.error(
      "❌ fetchOrderById error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    if (!id) throw new Error("User ID is required");

    const res = await axiosInstance.get(`/users/${id}`);

    if (res.status !== 200) {
      throw new Error(`Failed to fetch user with ID ${id}`);
    }

    return res.data?.body || res.data;
  } catch (error) {
    console.error(
      "❌ fetchUserById error:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const addUser = async (payload) => {
  try {
    const res = await axiosInstance.post(`/users`, payload);

    if (res.status !== 200) {
      throw new Error("Failed to add user");
    }

    return res.data?.body || res.data;
  } catch (error) {
    console.error("❌ addUser error:", error.response?.data || error.message);
    throw error;
  }
};

export const editUser = async (id, payload) => {
  try {
    const res = await axiosInstance.put(`/users/update/${id}`, payload);

    if (res.status !== 200) {
      throw new Error("Failed to edit user");
    }

    return res.data?.body || res.data;
  } catch (error) {
    console.error("❌ editUser error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchUserAddresses = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is required");

    const res = await axiosInstance.get(
      `/customeraddresses/fetchByUser/${userId}`
    );

    if (res.status !== 200) {
      throw new Error(`Failed to fetch addresses for user ${userId}`);
    }

    return res.data?.body || res.data;
  } catch (error) {
    console.error(
      "❌ fetchUserAddresses error:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const editCustomerAddress = async (id, payload) => {
  try {
    const res = await axiosInstance.put(
      `/customeraddresses/update/${id}`,
      payload
    );

    if (res.status !== 200) {
      throw new Error("Failed to edit address");
    }

    return res.data?.body || res.data;
  } catch (error) {
    console.error(
      "❌ editCustomerAddress error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteCustomerAddress = async (id) => {
  try {
    if (!id) throw new Error("Address ID is required");

    const res = await axiosInstance.delete(`/customeraddresses/${id}`);

    if (res.status !== 200) {
      throw new Error(`Failed to delete address with ID ${id}`);
    }

    return res.data?.body || res.data;
  } catch (error) {
    console.error(
      "❌ deleteCustomerAddress error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchOrder = async (orderId) => {
  try {
    const res = await axiosInstance.get(`/orders/${orderId}`);
    if (res.status !== 200) throw new Error("Failed to fetch order details");
    return res.data.body;
  } catch (error) {
    console.error(
      "❌ fetchOrder error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
