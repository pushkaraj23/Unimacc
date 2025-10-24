import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import ItemCard from "../components/shared/ItemCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/userApi";

const ProductsListing = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

  // React Query to fetch products
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-primary">
        Loading products...
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load products.
      </div>
    );

  return (
    <div className="w-full pt-28 max-sm:pt-20 flex flex-col lg:flex-row relative min-h-screen">
      {/* --- Sidebar (Removed Filters) --- */}
      <aside
        className={`hidden lg:flex flex-col items-center justify-center h-screen bg-gradient-to-b from-mute to-primary/40 transition-all duration-300 ${
          toggleSidebar ? "w-[20vw]" : "w-[4vw]"
        }`}
      >
        <div
          className="hover:cursor-pointer"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          {toggleSidebar ? <HiX size={24} /> : <HiMenu size={24} />}
        </div>
      </aside>

      {/* --- Products Section --- */}
      <section className="flex-1 relative overflow-y-auto pb-4 no-scrollbar w-full">
        {/* Header bar */}
        <div className="bg-mute sticky top-0 py-3 px-5 z-20 flex justify-between items-center text-primary/75 text-sm font-medium border-b">
          <div>
            <button onClick={() => navigate("/")}>Home</button> /{" "}
            <button className="text-theme">Products</button>
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
          {products.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-primary/60">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt="No Products"
                className="w-24 mb-4 opacity-80"
              />
              <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
              <p className="text-sm text-primary/50 max-w-md">
                We couldn’t find any products. Try refreshing the page.
              </p>
            </div>
          ) : (
            products.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.name}
                subtitle={item.category}
                images={[item.thumbnailimage, item.thumbnailimage]}
                price={item.sellingprice}
                category={item.category}
                subCategory={item.subcategory}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsListing;
