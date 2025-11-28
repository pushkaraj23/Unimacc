import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";

const ProductCarousel = ({
  title = "Section Title",
  items,
  viewAllRoute = "/",
  slidesMobile = 2,
  slidesDesktop = 5,
}) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* --- Header --- */}
      {items.length !== 0 ? (
        <section className="border-b-2 border-primary/60 py-2 mb-5 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl text-primary font-medium">
            {title}
          </h1>

          {viewAllRoute && (
            <button
              onClick={() => navigate(viewAllRoute)}
              className="flex items-center gap-2 text-primary font-medium hover:text-theme transition-all duration-200"
            >
              View All
              <FaPlay className="text-xs sm:text-sm" />
            </button>
          )}
        </section>
      ) : (
        <></>
      )}

      {/* --- Swiper Section --- */}
      <section className="py-2 relative">
        {/* Left Fade (for symmetry on desktop) */}
        <div className="hidden md:block pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-mute/70 to-transparent z-10" />
        {/* Right Fade */}
        <div className="hidden md:block pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-mute/70 to-transparent z-10" />
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={slidesMobile}
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
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: slidesDesktop },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="pb-10">
                <ItemCard product={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default ProductCarousel;
