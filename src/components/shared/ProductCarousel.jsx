import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/userApi";

const ProductCarousel = ({
  title = "Section Title",
  viewAllRoute = "/",
  slidesMobile = 2,
  slidesDesktop = 5,
}) => {
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center text-red-600 justify-center">
        Something went wrong! Try again later!
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* --- Header --- */}
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
        </Swiper>
      </section>
    </div>
  );
};

export default ProductCarousel;
