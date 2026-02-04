import { useState, useEffect, useMemo } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import ItemCard from "../components/shared/ItemCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsBySearch,
  fetchCategoryById,
  fetchRecommendedProducts
} from "../api/userApi";
import useSEO from "../utils/SEO";

const ProductsListing = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ---------- URL PARAMS ----------
  const categoryParam = searchParams.get("category"); // single category id
  const searchQuery = searchParams.get("search");

  const [category, setCategory] = useState(categoryParam || "All");

  // ---------- FETCH PRODUCTS ----------
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: searchQuery ? ["searchProducts", searchQuery] : ["products"],
    queryFn: () =>
      searchQuery ? fetchProductsBySearch(searchQuery) : fetchProducts(),
  });

  // ---------- FETCH CATEGORIES ----------
  const {
    data: categories = {},
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // ✅ FETCH SINGLE CATEGORY DETAILS (if ID present)
  const {
    data: categoryDetails,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ["categoryDetails", categoryParam],
    queryFn: () => fetchCategoryById(categoryParam),
    enabled: !!categoryParam,
  });

  // ---------- PRICE RANGE ----------
  const [price, setPrice] = useState(0);
  const maxPrice = useMemo(
    () =>
      products.length
        ? Math.max(...products.map((p) => p.sellingprice || 0))
        : 0,
    [products]
  );

  useEffect(() => {
    if (products.length > 0) setPrice(maxPrice);
  }, [maxPrice, products]);

  // ---------- SYNC CATEGORY WITH PARAM ----------
  useEffect(() => {
    setCategory(categoryParam || "All");
  }, [categoryParam]);

  const categoryName = getCategoryNameById(categoryParam || category);
  const seoTitle = searchQuery
    ? `Search: ${searchQuery}`
    : categoryName
      ? `${categoryName} - Home & Kitchen Products`
      : "All Products";
  const seoDesc = searchQuery
    ? `Find ${searchQuery} - shop home essentials, kitchen & bathroom products at Unimacc.`
    : categoryName
      ? `Shop ${categoryName} - premium home organization, storage solutions & more at best prices.`
      : "Browse all home essentials, kitchen accessories, bathroom products & storage solutions. Best prices & free shipping.";

  useSEO({
    title: seoTitle,
    description: seoDesc,
    keywords: `${categoryName || ""} home essentials, kitchen essentials, bathroom essentials, storage solutions, ${searchQuery || ""}`.trim(),
    url: searchQuery ? `/products?search=${encodeURIComponent(searchQuery)}` : categoryParam ? `/products?category=${categoryParam}` : "/products",
  });

  // ---------- FIND CATEGORY/SUBCATEGORY NAME ----------
  function getCategoryNameById(id) {
    if (!id || id === "All") return "";

    for (const [parent, info] of Object.entries(categories)) {
      if (String(info.id) === String(id)) return parent; // parent found
      const child = info.children.find((c) => String(c.id) === String(id));
      if (child) return child.name; // child found
    }

    return id;
  }

  // ---------- FILTER PRODUCTS ----------
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        category === "All" ||
        String(p.categoryid) === String(category) ||
        String(p.subcategoryid) === String(category);

      const matchesPrice = p.sellingprice <= price;

      return matchesCategory && matchesPrice;
    });
  }, [products, category, price]);

  // ---------- LOADING / ERROR ----------
  if (isProductsLoading || isCategoriesLoading)
    return (
      <div className="flex items-center justify-center h-screen text-primary">
        Loading products...
      </div>
    );

  if (isProductsError || isCategoriesError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load data.
      </div>
    );

  // ---------- HANDLERS ----------
  const handleCategoryChange = (id) => {
    setCategory(id);
    navigate(`/products?category=${id}`);
  };

  const handleSubcategoryClick = (id) => {
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="w-full pt-20 max-sm:pt-20 flex flex-col lg:flex-row relative min-h-screen">
      {/* ====================== SIDEBAR ====================== */}
      <aside
        className={`${
          toggleSidebar
            ? "absolute lg:static left-0 h-full z-30 bg-white shadow-lg w-[75vw] sm:w-[50vw] lg:w-[20vw] px-5 pt-2"
            : "w-[4vw] max-sm:hidden"
        } bg-gradient-to-b from-white to-primary/40 transition-all duration-300 lg:h-[100vh] px-4`}
      >
        {/* Sidebar Header */}
        <div
          className={`flex pb-2 border-b-2 mb-5 border-primary/75 ${
            toggleSidebar ? "justify-between" : "justify-center"
          } items-center`}
        >
          {toggleSidebar && (
            <h1 className="text-2xl sm:text-3xl font-semibold text-primary">
              Filters
            </h1>
          )}
          <div
            className="hover:cursor-pointer text-primary"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            {toggleSidebar ? <HiX size={24} /> : <HiMenu size={24} />}
          </div>
        </div>

        {/* ====================== FILTER BODY ====================== */}
        {toggleSidebar && (
          <div className="space-y-6 overflow-y-auto h-[80vh] pb-6">
            {/* Price Filter */}
            <div>
              <h2 className="font-bold mb-2 text-primary/75 flex justify-between items-center">
                <span>Price Range</span>
                <span className="text-[#DD7427] font-semibold">{price} Rs</span>
              </h2>

              <input
                type="range"
                min="0"
                max={maxPrice}
                step="100"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-theme"
              />

              <div className="flex justify-between text-sm mt-1 text-primary/60">
                <span>0 Rs</span>
                <span>{maxPrice} Rs</span>
              </div>
            </div>

            {/* Parent Category Dropdown */}
            <div>
              <h2 className="text-primary/75 font-bold mb-2">Category</h2>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full bg-transparent border-2 border-primary/40 font-medium rounded-lg py-3 px-4 pr-10 text-primary/75"
                >
                  <option value="All">All</option>

                  {Object.entries(categories).map(([parent, info]) => (
                    <option key={info.id} value={info.id}>
                      {parent}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subcategories */}
            {category !== "All" && (
              <div>
                <h2 className="text-primary/75 font-bold mb-2">Subcategory</h2>
                <div className="relative">
                  <select
                    value="All"
                    onChange={(e) => handleSubcategoryClick(e.target.value)}
                    className="w-full bg-transparent border-2 border-primary/40 font-medium rounded-lg py-3 px-4 pr-10 text-primary/75"
                  >
                    <option value="All" disabled>
                      Select Subcategory
                    </option>

                    {Object.entries(categories).map(([parent, info]) =>
                      String(info.id) === String(category)
                        ? info.children.map((child) => (
                            <option key={child.id} value={child.id}>
                              {child.name}
                            </option>
                          ))
                        : null
                    )}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* ====================== PRODUCT SECTION ====================== */}
      <section className="flex-1 relative overflow-y-auto pb-4 no-scrollbar w-full h-[100vh]">
        {/* Breadcrumb */}
        <div className="bg-white sticky top-0 px-5 z-20 flex justify-between items-center text-primary/75 text-sm font-medium max-sm:mt-2">
          <div className="font-normal py-1">
            <button className="text-primary" onClick={() => navigate("/")}>
              Home
            </button>{" "}
            /{" "}
            <button
              className="text-primary"
              onClick={() => navigate("/products")}
            >
              Products
            </button>
            {category !== "All" && (
              <>
                {" "}
                /{" "}
                <span className="text-theme">
                  {getCategoryNameById(category)}
                </span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}
                / <span className="text-theme">Search: {searchQuery}</span>
              </>
            )}
          </div>

          <button
            className="lg:hidden flex items-center gap-1 bg-theme text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full shadow"
            onClick={() => setToggleSidebar(true)}
          >
            <HiMenu size={16} /> Menu
          </button>
        </div>

        {/* ✅ CATEGORY DETAILS (if category ID present) */}
        {categoryParam &&
          !isCategoryLoading &&
          !isCategoryError &&
          categoryDetails && (
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white/80 relative shadow-md overflow-hidden rounded-2xl p-6 mx-3.5 my-3  border border-theme/20">
              <img
                src={
                  "https://images.unsplash.com/photo-1754211568488-f8481375d6fb?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={categoryDetails.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.unsplash.com/photo-1754211568488-f8481375d6fb?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                }}
                className="w-full h-full blur absolute brightness-50 object-cover rounded-2xl top-0 left-0"
              />
              <div className="z-10 w-full flex flex-col items-center">
                <h2 className="text-5xl font-bold text-white mx-auto mb-1">
                  {categoryDetails.name}
                </h2>
                <p className="text-white/70 leading-relaxed">
                  {categoryDetails.description}
                </p>
              </div>
            </div>
          )}

        {/* PRODUCT GRID */}
        <div
          className={`w-full gap-3 grid px-4 py-4 ${
            toggleSidebar ? "lg:grid-cols-4" : "lg:grid-cols-5"
          } sm:grid-cols-3 grid-cols-2`}
        >
          {filteredProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-primary/60">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt="No Products"
                className="w-24 mb-4 opacity-80"
              />
              <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
              <p className="text-sm text-primary/50 max-w-md">
                We couldn’t find any products matching your selected filters.
              </p>
            </div>
          ) : (
            filteredProducts.map((item, index) => (
              <ItemCard key={index} product={item} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsListing;
