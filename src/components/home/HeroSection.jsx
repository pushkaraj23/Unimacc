import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style/hero.css";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchHeroSectionContent } from "../../api/userApi";

const HeroSection = () => {
  // ✅ Fetch data using React Query
  const navigate = useNavigate();
  const {
    data: heroSlides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["heroSectionContent"],
    queryFn: fetchHeroSectionContent,
    staleTime: 5 * 60 * 1000, // cache 5 min
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="w-full h-[70vh] flex items-center justify-center text-gray-400">
        Loading hero section...
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-[70vh] flex items-center justify-center text-red-400">
        Failed to load hero section.
      </div>
    );

  let adjustedSlides = heroSlides;
  if (heroSlides.length > 0 && heroSlides.length < 4) {
    const duplicateCount = 4 - heroSlides.length;
    adjustedSlides = [...heroSlides, ...heroSlides.slice(0, duplicateCount)];
  }

  return (
    <div className="w-full mt-5 flex items-center justify-center">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={15}
        loop={true}
        slidesPerView={1.2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="h-[75vh] max-sm:h-[60vh]"
      >
        {adjustedSlides.map((slide, index) => (
          <SwiperSlide
            key={`${slide.id}-${index}`}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={slide.contentimage}
              alt={slide.title}
              className="w-full h-[80vh] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-16 max-sm:px-10 text-white">
              <h2 className="text-5xl font-bold mb-3 drop-shadow-md">
                {slide.title}
              </h2>
              <button
                onClick={() => navigate("/products")}
                className="bg-[#FF7A00] hover:bg-[#e56e00] text-primary font-semibold px-7 py-3 rounded-full shadow-md transition duration-300 w-fit"
              >
                Shop Now →
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
