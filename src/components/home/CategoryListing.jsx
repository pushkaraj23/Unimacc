import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesRaw } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1656411363355-808151c00f79?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CategoryListing = () => {
  const navigate = useNavigate();

  // Fetch categories
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories_raw"],
    queryFn: fetchCategoriesRaw,
  });

  // Floating tooltip state
  const [hoverData, setHoverData] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e, name) => {
    setHoverData({
      visible: true,
      text: name,
      x: e.clientX + 15,
      y: e.clientY + 15,
    });
  };

  const handleMouseLeave = () => {
    setHoverData({ visible: false, text: "", x: 0, y: 0 });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-600 py-10">
        ⚠️ Failed to load categories. Please try again later.
      </p>
    );

  return (
    <section className="relative md:px-10 mb-2 rounded-2xl">

      {/* Centered Categories */}
      <div
        className="
          flex justify-center max-sm:justify-start
          gap-6 no-scrollbar max-sm:gap-0 py-2 px-2 overflow-x-scroll
        "
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products?category=${cat.id}`)}
            onMouseMove={(e) => handleMouseMove(e, cat.name)}
            onMouseLeave={handleMouseLeave}
            className="
              group cursor-pointer flex flex-col items-center text-center
              transition-all duration-300 hover:-translate-y-2
            "
          >
            <div className="relative">
              <img
                src={cat.imagepath || FALLBACK_IMAGE}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
                alt={cat.name}
                loading="lazy"
                className="
                  w-20 h-20 md:w-24 md:h-24 object-contain rounded-xl
                  transition-transform duration-700 group-hover:scale-110 z-10 relative
                "
              />
              <div className="w-20 h-12 hover:w-28 hover:h-16 bg-black/30 blur-lg rounded-full absolute bottom-1 group-hover:bg-black/15 transition-all duration-500 z-0" />
            </div>

            <h2
              className="
                text-primary text-xs mt-2 w-24 text-center font-medium
                group-hover:text-theme transition-colors duration-300
              "
            >
              {cat.name}
            </h2>
          </div>
        ))}
        <div className="h-full w-12 bg-gradient-to-r from-white to-white/0 absolute left-0 top-0" />
        <div className="h-full w-12 bg-gradient-to-l from-white to-white/0 absolute right-0 top-0" />
      </div>
    </section>
  );
};

export default CategoryListing;
