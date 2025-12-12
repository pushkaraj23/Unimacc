import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesRaw } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1656411363355-808151c00f79?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 py-10">
        ⚠️ Failed to load categories. Please try again later.
      </p>
    );
  }

  return (
    <section className="relative py-16 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-transparent via-theme/30 to-mute min-h-[70vh] overflow-hidden">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary mb-4 relative z-10">
        Explore Categories
      </h2>
      <div className="w-24 h-[3px] bg-theme mx-auto mb-10 rounded-full"></div>

      {/* Category Cards */}
      <div className="flex flex-wrap justify-center gap-8 max-sm:gap-5 relative z-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products?category=${cat.id}`)}
            className="group cursor-pointer relative transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center w-[40vw] sm:w-[200px] md:w-[220px]"
          >
            {/* Animated orange ring on hover */}
            {/* <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#ef790b] transition-all duration-300 shadow-[0_0_0px_rgba(239,121,11,0)] group-hover:shadow-[0_0_20px_rgba(239,121,11,0.35)] pointer-events-none"></div> */}

            {/* Image container with soft shimmer */}
            <div className="relative w-full h-[40vh] max-sm:h-[25vh] rounded-xl overflow-hidden group mb-4 transition-all duration-300 shadow-md hover:shadow-xl">
              {/* Category Image */}
              <img
                src={cat.imagepath || FALLBACK_IMAGE}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4">
                <p className="text-mute text-sm sm:text-base leading-snug max-w-[90%]">
                  {cat.description || "Explore our collection"}
                </p>
              </div>
            </div>

            {/* Text Content */}
            <h3 className="text-base sm:text-lg font-semibold text-primary">
              {cat.name}
            </h3>

            {/* Hover CTA */}
            <span className="text-[#ef790b] font-medium text-sm opacity-50 group-hover:opacity-100 transition-all duration-300">
              View Products →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryListing;
