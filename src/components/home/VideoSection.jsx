
import React, { useEffect, useState } from "react";
import { FaExpand, FaArrowRight, FaLayerGroup } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPromotionalVideos } from "../../api/userApi";

const VideoSection = () => {
  const navigate = useNavigate();
  
  const {
    data: videos = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["promotionalVideos"],
    queryFn: fetchPromotionalVideos,
  });

  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 🔹 Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Auto-play all videos
  useEffect(() => {
    if (!videos?.length) return;
    videos.forEach((v) => {
      const el = document.getElementById(`video-${v.id}`);
      if (el) {
        el.muted = true;
        el.play().catch(() => {});
      }
    });
  }, [videos]);

  // 🔹 Fullscreen with contain fit
  const handleFullScreen = (id) => {
    const video = document.getElementById(`video-${id}`);
    if (!video) return;

    const handleChange = () => {
      const isFull =
        document.fullscreenElement === video ||
        document.webkitFullscreenElement === video ||
        document.msFullscreenElement === video;

      if (isFull) {
        video.style.objectFit = "contain";
        video.style.backgroundColor = "black";
      } else {
        video.style.objectFit = "cover";
        video.style.backgroundColor = "transparent";
      }
    };

    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    document.addEventListener("msfullscreenchange", handleChange);

    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();

    video.play();
  };

  // 🔹 Navigate to Category
  const handleViewCategory = (e, categoryId) => {
    e.stopPropagation();
    if (categoryId) {
      navigate(`products?category=${categoryId}`);
    }
  };

  // 🔹 Navigate to Product (uses slug; video.productslug from API, fallback to productid if backend only returns id)
  const handleViewProduct = (e, productSlug) => {
    e.stopPropagation();
    if (productSlug) {
      navigate(`/products/${productSlug}`);
    }
  };

  // 🔹 Loading & Error States
  if (isPending)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading videos...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-600">
        Failed to load promotional videos.
      </div>
    );

  if (!videos?.length)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-600">
        No promotional videos found.
      </div>
    );

  // 🔹 Determine how many videos to show before "View More"
  const limit = isMobile ? 4 : 5;
  const visibleVideos = showAll ? videos : videos.slice(0, limit);
  const shouldShowButton = videos.length > limit;

  return (
    <section className="py-16 px-5 sm:px-8 md:px-10 text-center">
      {/* --- Section Header --- */}
      <div className="border-b-2 border-primary/60 py-2 mb-8 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl text-primary font-medium">
          Watch Our Videos
        </h1>
      </div>

      {/* --- Grid of Videos --- */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {visibleVideos.map((video) => (
          <div
            key={video.id}
            className="bg-black hover:cursor-pointer relative rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 group"
          >
            {/* Video Container */}
            <div className="relative w-full aspect-[9/16]">
              <video
                id={`video-${video.id}`}
                src={video.videourl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-t-md transition-transform duration-300 group-hover:scale-[1.02]"
                onClick={() => handleFullScreen(video.id)}
              ></video>

              {/* 🔹 Subtitle - Top Right Corner */}
              {video.subtitle && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md border border-white/20 shadow-lg">
                    {video.subtitle}
                  </span>
                </div>
              )}

              {/* 🔹 Fullscreen Button - Top Left */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullScreen(video.id);
                }}
                className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-theme hover:text-white z-20"
                title="Full Screen"
              >
                <FaExpand size={12} />
              </button>

              {/* 🔹 Bottom Overlay with Title & Buttons */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-4 px-3">
                {/* Title */}
                <h3 className="text-white font-semibold text-sm sm:text-base leading-tight text-left mb-3 line-clamp-2">
                  {video.title}
                </h3>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {/* View Products (Category) Button */}
                  {video.categoryid && (
                    <button
                      onClick={(e) => handleViewCategory(e, video.categoryid)}
                      className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-theme backdrop-blur-sm border border-white/30 text-white text-xs py-2 px-3 rounded-md transition-all duration-300 hover:border-theme"
                    >
                      <FaLayerGroup size={12} />
                      <span>View Products</span>
                       <FaArrowRight size={10} />
                    </button>
                  )}

                  {/* View Product Button - uses productslug if available, else productid for backwards compatibility */}
                  {(video.productslug || video.productid) && (
                    <button
                      onClick={(e) => handleViewProduct(e, video.productslug || video.productid)}
                      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-theme text-black hover:text-white text-xs py-2 px-3 rounded-md font-medium transition-all duration-300"
                    >
                      <span>View Product</span>
                     
                    </button>
                  )}

                  {/* Show message if no category or product linked */}
                  {/* {!video.categoryid && !video.productid && (
                    <div className="text-white/50 text-[10px] text-center py-1">
                      No product linked
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- View More / View Less Button --- */}
      {shouldShowButton && (
        <div className="mt-8">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-theme text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-theme/90 transition-all"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default VideoSection;