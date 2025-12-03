import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ItemCard from "../shared/ItemCard";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDiscountPercents,
  fetchProductsByDiscountPercent,
} from "../../api/userApi";

const SalesSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // ✅ Step 1: Fetch discount percentages
  const {
    data: discountPercents = [],
    isLoading: isDiscountsLoading,
    isError: isDiscountsError,
  } = useQuery({
    queryKey: ["discountPercents"],
    queryFn: fetchDiscountPercents,
    staleTime: 5 * 60 * 1000,
  });

  // ✅ Step 2: Fetch products for all discount percentages at once
  const {
    data: allProducts = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["allDiscountProducts"],
    queryFn: async () => {
      // Fetch products for all unique discount percentages
      const productArrays = await Promise.all(
        discountPercents.map((percent) =>
          fetchProductsByDiscountPercent(percent)
        )
      );
      return productArrays.flat(); // flatten into one array
    },
    enabled: discountPercents.length > 0,
  });

  // ✅ Step 3: Derived filtered products (memoized)
  const filteredProducts = useMemo(() => {
    if (selectedFilter === "All") return allProducts;
    if (selectedFilter === "Upto 40%")
      return allProducts.filter((p) => parseFloat(p.discountpercent) <= 40);
    if (selectedFilter === "Upto 20%")
      return allProducts.filter((p) => parseFloat(p.discountpercent) <= 20);
    return allProducts;
  }, [selectedFilter, allProducts]);

  // ✅ Step 4: Filter options
  const filterOptions = ["All", "Upto 40%", "Upto 20%"];

  // ✅ Step 5: Render
  return (
    <div className="mt-16">
      {/* --- Header Section --- */}
      <section className="border-b-2 border-primary/60 py-2 mb-5 flex pr-2 justify-between items-center mx-10 max-sm:mx-6">
        <h1 className="text-3xl text-primary font-normal">Save Big on Sales</h1>

        {/* Desktop buttons */}
        <div className="flex gap-3 max-sm:hidden">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedFilter(option)}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedFilter === option
                  ? "bg-theme text-white font-semibold"
                  : "bg-theme/10 text-primary hover:bg-theme/90 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      {/* --- Mobile Buttons --- */}
      <div className="grid grid-cols-3 gap-2 md:hidden mb-4 px-6">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedFilter(option)}
            className={`px-5 py-3 text-xs rounded-lg font-medium transition-all duration-200 ${
              selectedFilter === option
                ? "bg-theme text-white font-semibold"
                : "bg-theme/10 text-primary hover:bg-theme/90 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* --- Product Scroll Section --- */}
      <section className="relative py-2 sm:py-4 md:py-6 px-10 max-sm:px-5">
        <div className="hidden md:block pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-mute/70 to-transparent z-10" />

        {isDiscountsLoading || isProductsLoading ? (
          <div className="flex justify-center items-center h-60 text-primary/60">
            Loading products...
          </div>
        ) : isDiscountsError || isProductsError ? (
          <div className="flex justify-center items-center h-60 text-red-500">
            Failed to load products.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-60 text-primary/60">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="No Products"
              className="w-16 mb-3 opacity-70"
            />
            <p>No products found for {selectedFilter}.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={2}
            navigation
            pagination={{
              clickable: true,
              el: ".custom-pagination", // 👈 use custom element
            }}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="sales-swiper"
            breakpoints={{
              768: { slidesPerView: 5, spaceBetween: 15 },
            }}
          >
            {filteredProducts.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full pb-5">
                  <ItemCard product={item} />
                </div>
              </SwiperSlide>
            ))}

            {/* 👇 Custom pagination container */}
            <div className="custom-pagination no-scrollbar px-10 max-sm:px-6" />
          </Swiper>
        )}
      </section>
    </div>
  );
};

export default SalesSection;
