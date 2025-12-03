import React, { useEffect, useState } from "react";
import { FaExpand } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchPromotionalVideos } from "../../api/userApi";

const VideoSection = () => {
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
    <section className="py-12 px-5 sm:px-8 md:px-10 text-center">
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
            className="bg-white hover:cursor-pointer relative rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* Video Container */}
            <div className="relative group w-full aspect-[9/16]">
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

              <button
                onClick={() => handleFullScreen(video.id)}
                className="absolute top-3 right-3 bg-mute text-primary p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-theme hover:text-white"
                title="Full Screen"
              >
                <FaExpand size={14} />
              </button>
            </div>

            {/* Title Overlay */}
            <div className="p-4 text-left w-full absolute bg-gradient-to-b from-black/0 pt-20 to-black h-fit bottom-0">
              <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-white/80 mt-1">{video.subtitle}</p>
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
