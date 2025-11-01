import React, { useEffect } from "react";
import { FaExpand } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchPromotionalVideos } from "../../api/userApi";

const VideoSection = () => {
  // 🔹 Fetch videos using React Query (v5 syntax)
  const {
    data: videos = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["promotionalVideos"],
    queryFn: fetchPromotionalVideos,
  });

  // 🔹 Auto-play all videos once data is loaded
  useEffect(() => {
    if (!videos || videos.length === 0) return;
    videos.forEach((v) => {
      const videoEl = document.getElementById(`video-${v.id}`);
      if (videoEl) {
        videoEl.muted = true;
        videoEl.play().catch(() => {});
      }
    });
  }, [videos]);

  // 🔹 Handle Full Screen
  const handleFullScreen = (id) => {
    const video = document.getElementById(`video-${id}`);
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
    video.play();
  };

  // 🔹 Loading State
  if (isPending)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading videos...
      </div>
    );

  // 🔹 Error State
  if (isError)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-600">
        Failed to load promotional videos.
      </div>
    );

  // 🔹 Empty State
  if (!videos || videos.length === 0)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-600">
        No promotional videos found.
      </div>
    );

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
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white hover:cursor-pointer relative rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* --- Video Container (9:16 aspect) --- */}
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

              {/* --- Full Screen Button --- */}
              <button
                onClick={() => handleFullScreen(video.id)}
                className="absolute top-3 right-3 bg-mute text-primary p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-theme hover:text-white"
                title="Full Screen"
              >
                <FaExpand size={14} />
              </button>
            </div>

            {/* --- Title + Subtitle Overlay --- */}
            <div className="p-4 text-left w-full absolute bg-gradient-to-b from-black/0 to-black h-fit bottom-0">
              <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-white/80 mt-1">{video.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
