import React, { useEffect, useState } from "react";
import ItemCard from "../components/shared/ItemCard";
import { FaTrashAlt } from "react-icons/fa";
import { fetchProducts } from "../api/userApi";
import { useQuery } from "@tanstack/react-query";

const CompareProducts = () => {
  const [compareList, setCompareList] = useState([]);

  // 🧠 Load and auto-update compare products from localStorage
  useEffect(() => {
    const loadCompareList = () => {
      const storedCompare = JSON.parse(localStorage.getItem("compare")) || [];
      setCompareList(storedCompare);
    };

    // Initial load
    loadCompareList();

    // Listen for any cross-tab or in-app changes
    window.addEventListener("storage", loadCompareList);
    window.addEventListener("localStorageUpdated", loadCompareList);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("storage", loadCompareList);
      window.removeEventListener("localStorageUpdated", loadCompareList);
    };
  }, []);

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const removeFromCompare = (id) => {
    const updated = compareList.filter((item) => item.id !== id);
    setCompareList(updated);
    localStorage.setItem("compare", JSON.stringify(updated));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  return (
    <div className="w-full pt-20 max-sm:pt-24 px-5 sm:px-10 pb-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex gap-1 font-medium my-3 max-sm:my-0 text-sm">
        <span
          className="text-primary cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Home
        </span>
        <span className="text-gray-400">/</span>
        <span className="text-theme">Compare</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 max-sm:mt-1 max-sm:mb-5">Compare Products</h1>

      {/* Comparison Table */}
      {compareList.length > 0 ? (
        <div className="relative overflow-x-auto bg-white rounded-2xl shadow-sm border border-theme/50 mb-12">
          <table className="min-w-max w-full border-collapse text-left text-sm sm:text-base">
            <tbody>
              {/* Product Images */}
              <tr className="border-b border-theme/50">
                <td className="p-2 sm:p-4 font-medium text-primary/75 text-center bg-[#F5D5BE] sticky left-0 z-10 w-28 sm:w-36">
                  Image
                </td>
                {compareList.map((item) => (
                  <td
                    key={item.id}
                    className="px-2 sm:px-6 py-3 sm:py-4 text-center min-w-[160px] sm:min-w-[22vw] max-w-[220px]"
                  >
                    <div className="relative flex flex-col items-start">
                      {/* Remove button */}
                      <div className="w-full flex justify-end mb-2 sm:mb-3">
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="bg-red-500 text-white p-1 sm:p-1.5 rounded-full hover:bg-red-600 transition"
                        >
                          <FaTrashAlt size={12} className="sm:hidden" />
                          <FaTrashAlt size={14} className="hidden sm:block" />
                        </button>
                      </div>

                      {/* Product Image */}
                      <img
                        src={item.thumbnailimage}
                        alt={item.name}
                        className="w-full h-[20vh] sm:h-[30vh] object-cover rounded-lg border border-theme/50"
                      />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Product Name */}
              <tr className="border-b border-theme/50">
                <td className="p-2 sm:p-4 font-medium text-primary/75 text-center bg-[#F5D5BE] sticky left-0 z-10">
                  Name
                </td>
                {compareList.map((item) => (
                  <td
                    key={item.id}
                    className="px-2 sm:px-6 py-3 sm:py-4 font-semibold text-primary min-w-[160px] sm:min-w-[22vw] max-w-[220px] text-xs sm:text-sm"
                  >
                    <span className="line-clamp-2">{item.name}</span>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b border-theme/50">
                <td className="p-2 sm:p-4 font-medium text-primary/75 text-center bg-[#F5D5BE] sticky left-0 z-10">
                  Price
                </td>
                {compareList.map((item) => (
                  <td
                    key={item.id}
                    className="px-2 sm:px-6 py-3 sm:py-4 min-w-[160px] sm:min-w-[22vw] max-w-[220px]"
                  >
                    <span className="font-bold text-black text-sm sm:text-base">
                      ₹{item.sellingprice?.toLocaleString()}
                    </span>
                    {item.mrp && (
                      <span className="ml-1 sm:ml-2 text-gray-400 line-through text-xs sm:text-sm">
                        ₹{item.mrp}
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Description */}
              <tr className="border-b border-theme/50">
                <td className="p-2 sm:p-4 font-medium text-primary/75 text-center bg-[#F5D5BE] sticky left-0 z-10">
                  Description
                </td>
                {compareList.map((item) => (
                  <td
                    key={item.id}
                    className="px-2 sm:px-6 py-3 sm:py-4 text-primary/75 min-w-[160px] sm:min-w-[22vw] max-w-[220px] text-xs sm:text-sm"
                  >
                    <span className="line-clamp-3">
                      {item.description ? item.description : "—"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Discount */}
              <tr className="border-b border-theme/50">
                <td className="p-2 sm:p-4 font-medium text-primary/75 text-center bg-[#F5D5BE] sticky left-0 z-10">
                  Discount
                </td>
                {compareList.map((item) => (
                  <td
                    key={item.id}
                    className="px-2 sm:px-6 py-3 sm:py-4 text-theme font-semibold min-w-[160px] sm:min-w-[22vw] max-w-[220px] text-xs sm:text-sm"
                  >
                    {item.isDiscountActive
                      ? `${item.discountPercent}% OFF`
                      : "—"}
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr className="border-b border-theme/50">
                <td className="p-2 sm:p-4 font-medium text-primary/75 text-center bg-[#F5D5BE] sticky left-0 z-10">
                  Category
                </td>
                {compareList.map((item) => (
                  <td
                    key={item.id}
                    className="px-2 sm:px-6 py-3 sm:py-4 text-gray-700 min-w-[160px] sm:min-w-[22vw] max-w-[220px] text-xs sm:text-sm"
                  >
                    {item.category || "-"}
                  </td>
                ))}
              </tr>

              {/* Subcategory */}
              <tr className="border-b border-theme/50">
                <td className="p-2 sm:p-4 font-medium text-primary/75 text-center bg-[#F5D5BE] sticky left-0 z-10">
                  Subcategory
                </td>
                {compareList.map((item) => (
                  <td
                    key={item.id}
                    className="px-2 sm:px-6 py-3 sm:py-4 text-gray-700 min-w-[160px] sm:min-w-[22vw] max-w-[220px] text-xs sm:text-sm"
                  >
                    {item.subCategory || "-"}
                  </td>
                ))}
              </tr>

              {/* Offer Time */}
              <tr>
                <td className="p-2 sm:p-4 font-medium text-primary/75 text-center bg-[#F5D5BE] sticky left-0 z-10">
                  Offer Validity
                </td>
                {compareList.map((item) => (
                  <td
                    key={item.id}
                    className="px-2 sm:px-6 py-3 sm:py-4 text-gray-700 min-w-[160px] sm:min-w-[22vw] max-w-[220px] text-xs sm:text-sm"
                  >
                    {item.offerTime || "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-16 bg-white rounded-2xl border border-gray-100 shadow-sm mb-12">
          No products selected for comparison.
        </div>
      )}

      {/* All Products Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">
          Add More Products for Comparison
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((item, index) => (
            <ItemCard key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;
