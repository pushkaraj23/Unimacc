import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style/sales.css";
import ItemCard from "../shared/ItemCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/userApi";

const SalesSection = () => {
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return (
    <div className="mt-10 px-10 max-sm:px-6">
      {/* --- Header Section --- */}
      <section className="border-b-2 border-primary/60 py-2 mb-5 flex pr-2 justify-between items-center">
        <h1 className="text-3xl text-primary font-normal">Save Big on Sales</h1>
        <div className="flex gap-5">
          <div className="flex gap-5 max-sm:hidden">
            {["85% off", "65% off", "50% off"].map((deal, i) => (
              <button
                key={i}
                className="px-5 py-3 hover:bg-theme/90 bg-theme/10 text-primary font-medium transition-all duration-200 rounded-lg hover:font-semibold"
              >
                {deal}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-primary font-medium hover:text-theme transition-all duration-200">
            View All
            <FaPlay className="text-sm" />
          </button>
        </div>
      </section>
      <div className="flex gap-5 md:hidden mb-4">
        {["85% off", "65% off", "50% off"].map((deal, i) => (
          <button
            key={i}
            className="px-5 py-3 hover:bg-theme/90 bg-theme/10 text-primary font-medium transition-all duration-200 rounded-lg hover:font-semibold"
          >
            {deal}
          </button>
        ))}
      </div>

      {/* --- Product Scroll Section --- */}
      <section className="relative py-2 sm:py-4 md:py-6">
        {/* Right Fade - Desktop Only */}
        <div className="hidden md:block pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-mute/70 to-transparent z-10" />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={2} // default: mobile view
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
            768: { slidesPerView: 5, spaceBetween: 15 }, // switch to 5 slides on laptop and above
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
      </section>
    </div>
  );
};

export default SalesSection;
