import { useState, useEffect, useMemo } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import ItemCard from "../components/shared/ItemCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../api/userApi";

const ProductsListing = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState(categoryParam || "All");

  // ✅ Fetch Products
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // 1️⃣ Initialize price to 0 first
  const [price, setPrice] = useState(0);

  // 2️⃣ Compute maxPrice once products are fetched
  const maxPrice = useMemo(
    () =>
      products.length
        ? Math.max(...products.map((p) => p.sellingprice || 0))
        : 0,
    [products]
  );

  // 3️⃣ Once data arrives, set slider to max price
  useEffect(() => {
    if (products.length > 0) {
      setPrice(maxPrice);
    }
  }, [maxPrice, products]);

  // ✅ Fetch Categories
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // ✅ Sync category from URL param
  useEffect(() => {
    setCategory(categoryParam || "All");
  }, [categoryParam]);

  // ✅ Derived filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        category === "All" ||
        p.category?.toLowerCase() === category.toLowerCase();
      const matchesPrice = p.sellingprice <= price;
      return matchesCategory && matchesPrice;
    });
  }, [products, category, price]);

  // ✅ Loading / Error
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

  return (
    <div className="w-full pt-28 max-sm:pt-20 flex flex-col lg:flex-row relative min-h-screen">
      {/* --- Sidebar --- */}
      <aside
        className={`${
          toggleSidebar
            ? "absolute lg:static left-0 h-full z-30 bg-white shadow-lg w-[75vw] sm:w-[50vw] lg:w-[20vw] px-5 pt-2"
            : "w-[4vw] max-sm:hidden"
        } bg-gradient-to-b from-mute to-primary/40 transition-all duration-300 lg:h-[100vh] px-4`}
      >
        {/* Header Row */}
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

        {/* --- Filters --- */}
        {toggleSidebar && (
          <div className="space-y-6 overflow-y-auto h-[80vh] pb-6">
            {/* ✅ Price Range */}
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

            {/* ✅ Category Dropdown */}
            <div>
              <h2 className="text-primary/75 font-bold mb-2">Category</h2>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    navigate(`/products?category=${e.target.value}`);
                  }}
                  className="w-full bg-transparent border-2 border-primary/40 font-medium rounded-lg py-3 px-4 pr-10 text-primary/75 focus:outline-none appearance-none"
                >
                  <option value="All">All</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <FaPlay
                  size={10}
                  className="absolute rotate-90 right-3 top-1/2 transform -translate-y-1/2 text-[#DD7427]"
                />
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* --- Products Section --- */}
      <section className="flex-1 relative overflow-y-auto pb-4 no-scrollbar w-full h-[100vh]">
        {/* Header */}
        <div className="bg-mute sticky top-0 px-5 z-20 flex justify-between items-center text-primary/75 text-sm font-medium  max-sm:mt-2">
          <div className="font-normal py-1">
            <button className="text-primary" onClick={() => navigate("/")}>
              Home
            </button>{" "}
            /{" "}
            <button className="text-primary" onClick={() => setCategory("All")}>
              Products
            </button>
            {category !== "All" && (
              <>
                {" "}
                / <span className="text-theme">{category}</span>
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

        {/* Product Grid */}
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
                We couldn’t find any products in this category or range.
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
