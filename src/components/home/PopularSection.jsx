import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style/sales.css";
import ItemCard from "../shared/ItemCard";
import products from "../../data.json";

const PopularSection = () => {
  return (
    <div className="px-10">
      {/* --- Header Section --- */}
      <section className="border-b-2 border-primary/60 py-2 mb-5 flex pr-2 justify-between items-center">
        <h1 className="text-3xl text-primary font-normal">Popular Products</h1>
        <div className="flex gap-5">
          <button className="flex items-center gap-2 text-primary font-medium hover:text-theme transition-all duration-200">
            View All
            <FaPlay className="text-sm" />
          </button>
        </div>
      </section>

      {/* --- Product Scroll Section --- */}
      <section className="py-2 relative">
        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-mute/70 to-transparent z-10" />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 2500, // time between slides in ms
            disableOnInteraction: false, // keeps autoplay even after manual navigation
            pauseOnMouseEnter: true,
          }}
          className="h-[57vh] sales-swiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <ItemCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default PopularSection;
