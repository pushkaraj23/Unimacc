import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules"; // ✅ Added Autoplay
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style/hero.css";

const slides = [
  {
    id: 1,
    title: "Find What You Need,",
    subtitle: "Love What You Get",
    text: "New Arrivals & Exclusive Discounts – Shop Now!",
    img: "https://modernquests.com/cdn/shop/files/ResinBathroomSetOf3CheckGreen_2.jpg?v=1753508391&width=1000",
  },
  {
    id: 2,
    title: "Refresh Your Space,",
    subtitle: "Redefine Your Style",
    text: "Premium Bathroom Essentials with Modern Design.",
    img: "https://s3-ap-south-1.amazonaws.com/delta-faucet-india-cdn/delta/RP50841/images/005.png",
  },
  {
    id: 3,
    title: "Elegance in Every Detail",
    subtitle: "Crafted for You",
    text: "Durable, Stylish, and Built to Last.",
    img: "https://lifetimebath.in/wp-content/uploads/2021/05/He46a49e8f20f4535b6d3e9d1941fae14c.jpg",
  },
  {
    id: 4,
    title: "Refresh Your Space,",
    subtitle: "Redefine Your Style",
    text: "Premium Bathroom Essentials with Modern Design.",
    img: "https://s3-ap-south-1.amazonaws.com/delta-faucet-india-cdn/delta/RP50841/images/005.png",
  },
  {
    id: 5,
    title: "Elegance in Every Detail",
    subtitle: "Crafted for You",
    text: "Durable, Stylish, and Built to Last.",
    img: "https://lifetimebath.in/wp-content/uploads/2021/05/He46a49e8f20f4535b6d3e9d1941fae14c.jpg",
  },
];

const HeroSection = () => {
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
          delay: 3000, // 3 seconds
          disableOnInteraction: false, // Keeps autoplay active after user interaction
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // ✅ Added Autoplay here
        className="h-[75vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative h-[50vh] overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[80vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/20 flex flex-col justify-center px-16 text-white">
              <p className="text-4xl font-thin text-mute/75">{slide.title}</p>
              <h2 className="text-6xl font-bold text-mute mb-3">
                {slide.subtitle}
              </h2>
              <p className="text font-thin mb-5">{slide.text}</p>
              <button className="bg-[#FF7A00] hover:bg-[#e56e00] text-primary font-semibold px-7 py-3 rounded-full shadow-md transition duration-300 w-fit">
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
