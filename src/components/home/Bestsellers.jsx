import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "../shared/ItemCard";
import { fetchProducts, fetchCategories } from "../../api/userApi";

const Bestsellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Fetch products & categories from API
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const {
    data: categoriesData = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // ✅ Handle loading & error states
  if (productsLoading || categoriesLoading)
    return (
      <div className="w-full h-[50vh] flex items-center justify-center text-primary/60">
        Loading bestsellers...
      </div>
    );

  if (productsError || categoriesError)
    return (
      <div className="w-full h-[50vh] flex items-center justify-center text-red-500">
        Failed to load bestsellers. Please try again later.
      </div>
    );

  // ✅ Derive unique categories from API
  const categories = ["All", ...new Set(categoriesData.map((c) => c.name))];

  // ✅ Filter products by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="px-5 md:px-10 py-10">
      {/* --- Section Title --- */}
      <div className="flex items-center justify-between border-b-2 border-primary/60 pb-2">
        <h2 className="text-2xl sm:text-3xl font-medium text-primary">
          Bestsellers
        </h2>
      </div>

      {/* --- Horizontal Category Row --- */}
      <div className="flex gap-3 sm:gap-5 overflow-x-auto no-scrollbar my-3 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 text-sm sm:text-base rounded-full font-medium border transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-theme text-white border-theme"
                : "bg-white border-gray-300 text-primary/70 hover:bg-theme/10 hover:border-theme/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- Product Grid --- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((item, index) => (
            <ItemCard key={index} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-primary/60">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
            alt="No Products"
            className="w-20 mx-auto mb-4 opacity-80"
          />
          <h3 className="text-xl font-semibold mb-1">No Products Found</h3>
          <p className="text-sm text-primary/50 max-w-md mx-auto">
            We couldn’t find any bestsellers in this category. Try choosing
            another one!
          </p>
        </div>
      )}
    </section>
  );
};

export default Bestsellers;
