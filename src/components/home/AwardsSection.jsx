import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const AwardsSection = () => {
  const awards = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/3004/3004613.png",
      title: "Start-up of the Year 2022 – TiE Con Chennai",
    },
    {
      img: "/assets/graph.png",
      title: "India’s Top 10 Fastest Growing D2C Brands",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3003/3003035.png",
      title: "FICCI - Best Ecommerce Startup of the Year 2021",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
      title: "Winners at the e4m D2C Revolution Awards 2022",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3004/3004613.png",
      title: "Retail Excellence Award 2020",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden pb-20 pt-8 px-6 sm:px-10 md:px-20">
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-primary">
          Awards & Accolades
        </h2>
        <div className="w-24 h-1 bg-theme mx-auto mt-4 rounded-full"></div>
        <p className="text-primary/70 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Celebrating excellence, innovation, and our commitment to delivering
          world-class products.
        </p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="relative z-10"
      >
        {awards.map((award, index) => (
          <SwiperSlide key={index}>
            <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:shadow-theme/20 transition-all duration-500 relative overflow-hidden">
              {/* Animated Glow Line */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-theme/70 transition-all duration-500"></div>

              {/* Award Icon */}
              <div className="w-20 h-20 mx-auto flex items-center justify-center bg-theme/10 rounded-full mb-6 relative">
                <img
                  src={award.img}
                  alt={award.title}
                  className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-theme/10 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-all"></div>
              </div>

              {/* Title */}
              <p className="text-center text-primary font-semibold text-base sm:text-lg leading-snug tracking-wide group-hover:text-theme transition-colors">
                {award.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Shine Animation Overlay */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-150%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform rotate-12 animate-[shine_6s_infinite]"></div>
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -150%; }
          50% { left: 150%; }
          100% { left: 150%; }
        }
      `}</style>
    </section>
  );
};

export default AwardsSection;
