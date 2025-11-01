import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style/sales.css";
import ItemCard from "../shared/ItemCard";
import { useQuery } from "@tanstack/react-query";
import { fetchDiscountPercents, fetchProductsByDiscountPercent } from "../../api/userApi";

const SalesSection = () => {
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // ✅ Step 1: Fetch discount percentages
  const {
    data: discountPercents = [],
    isLoading: isDiscountsLoading,
    isError: isDiscountsError,
  } = useQuery({
    queryKey: ["discountPercents"],
    queryFn: fetchDiscountPercents,
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });

  // ✅ Step 2: Set default selected discount
  useEffect(() => {
    if (discountPercents.length > 0 && !selectedDiscount) {
      setSelectedDiscount(discountPercents[0]);
    }
  }, [discountPercents, selectedDiscount]);

  // ✅ Step 3: Fetch products based on selected discount
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["productsByDiscount", selectedDiscount],
    queryFn: () => fetchProductsByDiscountPercent(selectedDiscount),
    enabled: !!selectedDiscount, // only fetch when a discount is selected
  });

  // ✅ Step 4: Handlers
  const handleDiscountClick = (percent) => {
    setSelectedDiscount(percent);
    refetchProducts(); // trigger new product fetch
  };

  // ✅ Step 5: Render
  return (
    <div className="mt-10 px-10 max-sm:px-6">
      {/* --- Header Section --- */}
      <section className="border-b-2 border-primary/60 py-2 mb-5 flex pr-2 justify-between items-center">
        <h1 className="text-3xl text-primary font-normal">Save Big on Sales</h1>
        <div className="flex gap-5">
          {/* Desktop discount buttons */}
          <div className="flex gap-5 max-sm:hidden">
            {isDiscountsLoading ? (
              <p className="text-primary/50 italic">Loading discounts...</p>
            ) : isDiscountsError ? (
              <p className="text-red-500 italic">Failed to load discounts</p>
            ) : discountPercents.length === 0 ? (
              <p className="text-primary/60 italic">No discounts available</p>
            ) : (
              discountPercents.map((percent, i) => (
                <button
                  key={i}
                  onClick={() => handleDiscountClick(percent)}
                  className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedDiscount === percent
                      ? "bg-theme text-white font-semibold"
                      : "bg-theme/10 text-primary hover:bg-theme/90 hover:text-white"
                  }`}
                >
                  {percent}% off
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- Mobile Buttons --- */}
      <div className="flex gap-5 md:hidden mb-4">
        {isDiscountsLoading ? (
          <p className="text-primary/50 italic">Loading...</p>
        ) : isDiscountsError ? (
          <p className="text-red-500 italic">Error</p>
        ) : discountPercents.length === 0 ? (
          <p className="text-primary/60 italic">No discounts</p>
        ) : (
          discountPercents.map((percent, i) => (
            <button
              key={i}
              onClick={() => handleDiscountClick(percent)}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedDiscount === percent
                  ? "bg-theme text-white font-semibold"
                  : "bg-theme/10 text-primary hover:bg-theme/90 hover:text-white"
              }`}
            >
              {percent}% off
            </button>
          ))
        )}
      </div>

      {/* --- Product Scroll Section --- */}
      <section className="relative py-2 sm:py-4 md:py-6">
        {/* Right Fade - Desktop Only */}
        <div className="hidden md:block pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-mute/70 to-transparent z-10" />

        {isProductsLoading ? (
          <div className="flex justify-center items-center h-60 text-primary/60">
            Loading products...
          </div>
        ) : isProductsError ? (
          <div className="flex justify-center items-center h-60 text-red-500">
            Failed to load products.
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-60 text-primary/60">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="No Products"
              className="w-16 mb-3 opacity-70"
            />
            <p>No products found for {selectedDiscount}% discount.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={2} // default mobile
            navigation
            pagination={{ clickable: true }}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="sales-swiper"
            breakpoints={{
              768: { slidesPerView: 5, spaceBetween: 15 }, // 5 slides on desktop
            }}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full pb-10">
                  <ItemCard product={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </div>
  );
};

export default SalesSection;
