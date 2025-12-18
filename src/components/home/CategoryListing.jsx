import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesRaw } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1656411363355-808151c00f79?q=80&w=1200&auto=format&fit=crop";

const CategoryListing = () => {
  const navigate = useNavigate();

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories_raw"],
    queryFn: fetchCategoriesRaw,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-theme border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-600 py-10">
        ⚠️ Failed to load categories.
      </p>
    );

  return (
    <section className="w-full px-6 md:px-16 py-16">
      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-wide mb-3 mx-auto">
        Shop By Category
      </h2>
      <div className="flex w-full justify-center">
        <div className="bg-theme w-1/2 md:w-1/5 h-1 rounded mb-12" />
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={categories.length > 4}
        spaceBetween={32}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="!pb-2"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div
              onClick={() => navigate(`/products?category=${cat.id}`)}
              className="cursor-pointer"
            >
              {/* CARD */}
              <div className="relative w-full aspect-[1/1] rounded-lg overflow-hidden bg-[#d6d6d6]">
                <img
                  src={cat.imagepath || FALLBACK_IMAGE}
                  onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                  alt={cat.name}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-700
                    hover:scale-110
                  "
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition" />

                {/* Label */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <div
                    className="
                      bg-white text-black
                      px-6 py-2 rounded-md shadow
                      text-sm md:text-base font-medium
                      max-w-[180px]
                      truncate text-center
                    "
                    title={cat.name}
                  >
                    {cat.name}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryListing;
