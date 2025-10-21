import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import data from "../data.json";
import ItemCard from "../components/shared/ItemCard";
import { useSearchParams, useNavigate } from "react-router-dom";

const ProductsListing = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [price, setPrice] = useState(5000);
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const c = searchParams.get("category");

  // Update category from URL
  useEffect(() => {
    setCategory(c || "All");
  }, [c]);

  return (
    <div className="w-full pt-28 max-sm:pt-20 flex flex-col lg:flex-row relative min-h-screen">
      {/* --- Sidebar (Desktop) --- */}
      <aside
        className={`hidden lg:block h-screen bg-gradient-to-b from-mute to-primary/40 transition-all duration-300 ${
          toggleSidebar ? "w-[20vw] px-4" : "w-[4vw] px-2"
        } col-span-1 pt-2`}
      >
        {/* Sidebar Header */}
        <div
          className={`flex pb-2 border-b-2 mb-5 border-primary/75 ${
            toggleSidebar ? "justify-between" : "justify-center"
          } items-center`}
        >
          {toggleSidebar && (
            <h1 className="text-3xl font-semibold text-primary">Filters</h1>
          )}
          <div
            className="hover:cursor-pointer"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            {toggleSidebar ? <HiX size={24} /> : <HiMenu size={24} />}
          </div>
        </div>

        {/* Price Range */}
        {toggleSidebar && (
          <div className="mb-5">
            <h2 className="font-bold mb-2 text-primary/75 flex justify-between items-center">
              <span>Price Range</span>
              <span className="text-[#DD7427] font-semibold">{price} Rs</span>
            </h2>
            <input
              type="range"
              min="0"
              max="5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full accent-theme"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>0 Rs</span>
              <span>5000 Rs</span>
            </div>
          </div>
        )}

        {/* Category */}
        {toggleSidebar && (
          <div className="mb-5">
            <h2 className="text-primary/75 font-bold mb-2">Category</h2>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent border-2 border-primary/40 font-medium rounded-lg py-3 px-4 pr-10 text-primary/75 focus:outline-none appearance-none"
              >
                <option>All</option>
                <option>Bathroom</option>
                <option>Kitchen</option>
                <option>Decor</option>
              </select>
              <FaPlay
                size={10}
                className="absolute rotate-90 right-3 top-1/2 transform -translate-y-1/2 text-[#DD7427]"
              />
            </div>
          </div>
        )}

        {/* Sub-Category */}
        {toggleSidebar && (
          <div>
            <h2 className="text-primary/75 font-bold mb-2">Sub-Category</h2>
            <div className="relative">
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full bg-transparent border-2 border-primary/40 rounded-lg py-3 px-4 pr-10 text-primary/75 focus:outline-none font-medium appearance-none"
              >
                <option>All</option>
                <option>Faucets</option>
                <option>Showers</option>
                <option>Basins</option>
              </select>
              <FaPlay
                size={10}
                className="absolute rotate-90 right-3 top-1/2 transform -translate-y-1/2 text-[#DD7427]"
              />
            </div>
          </div>
        )}
      </aside>

      {/* --- Mobile Sidebar Overlay --- */}
      {toggleSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setToggleSidebar(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-gradient-to-b from-mute to-[#858585] z-40 pt-24 px-6 transition-transform duration-300 lg:hidden ${
          toggleSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex justify-between items-center border-b-2 border-primary/75 pb-3 mb-5">
          <h1 className="text-2xl font-semibold text-primary">Filters</h1>
          <HiX
            size={28}
            className="text-primary cursor-pointer"
            onClick={() => setToggleSidebar(false)}
          />
        </div>

        {/* Filter Controls */}
        <div className="space-y-6">
          {/* Price */}
          <div>
            <h2 className="font-bold mb-2 text-primary/75 flex justify-between items-center">
              <span>Price Range</span>
              <span className="text-[#DD7427] font-semibold">{price} Rs</span>
            </h2>
            <input
              type="range"
              min="0"
              max="5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full accent-theme"
            />
          </div>

          {/* Category */}
          <div>
            <h2 className="text-primary/75 font-bold mb-2">Category</h2>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border-2 border-primary/40 font-medium rounded-lg py-3 px-4 text-primary/75 focus:outline-none"
            >
              <option>All</option>
              <option>Bathroom</option>
              <option>Kitchen</option>
              <option>Decor</option>
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <h2 className="text-primary/75 font-bold mb-2">Sub-Category</h2>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full bg-transparent border-2 border-primary/40 font-medium rounded-lg py-3 px-4 text-primary/75 focus:outline-none"
            >
              <option>All</option>
              <option>Faucets</option>
              <option>Showers</option>
              <option>Basins</option>
            </select>
          </div>
        </div>
      </aside>

      {/* --- Products Section --- */}
      <section className="flex-1 relative overflow-y-auto pb-4 no-scrollbar w-full">
        {/* Header bar */}
        <div className="bg-mute sticky top-0 py-3 px-5 z-20 flex justify-between items-center text-primary/75 text-sm font-medium border-b">
          <div>
            <button onClick={() => navigate("/")}>Home</button> /{" "}
            <button onClick={() => setCategory("All")}>Products</button> /{" "}
            <button className="text-theme">{category}</button>
          </div>

          {/* Filter Toggle (Mobile only) */}
          <button
            className="lg:hidden flex items-center gap-1 bg-theme text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full shadow"
            onClick={() => setToggleSidebar(true)}
          >
            <HiMenu size={16} /> Filters
          </button>
        </div>

        {/* Product Grid */}
        <div
          className={`w-full gap-3 grid px-4 py-4 ${
            toggleSidebar ? "lg:grid-cols-4" : "lg:grid-cols-5"
          } sm:grid-cols-3 grid-cols-2`}
        >
          {(() => {
            const filteredProducts = data.filter((item) => {
              const matchesPrice = item.price <= price;
              const matchesCategory =
                category === "All" || item.category === category;
              const matchesSubCategory =
                subCategory === "All" || item.subCategory === subCategory;

              return matchesPrice && matchesCategory && matchesSubCategory;
            });

            if (filteredProducts.length === 0) {
              return (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-primary/60">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                    alt="No Products"
                    className="w-24 mb-4 opacity-80"
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    No Products Found
                  </h2>
                  <p className="text-sm text-primary/50 max-w-md">
                    We couldn’t find any products that match your filters. Try
                    adjusting your search or resetting the filters.
                  </p>
                </div>
              );
            }

            return filteredProducts.map((item) => (
              <ItemCard key={item.id} {...item} />
            ));
          })()}
        </div>
      </section>
    </div>
  );
};

export default ProductsListing;
