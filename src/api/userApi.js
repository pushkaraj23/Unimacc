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
