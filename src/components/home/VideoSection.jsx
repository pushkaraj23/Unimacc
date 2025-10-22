import { useState } from "react";
import { FaPlay, FaPause, FaExpand } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VideoSection = () => {
  const navigate = useNavigate();

  const videos = [
    {
      id: 1,
      title: "Unimacc Luxury Shower Series",
      subtitle: "Experience premium water flow like never before.",
      src: "https://www.pexels.com/download/video/29324085/",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1680098056989-7045096b603b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FuZGxlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700",
    },
    {
      id: 2,
      title: "Modern Kitchen Faucet Installation",
      subtitle: "Quick guide to setting up your Unimacc faucet.",
      src: "https://www.pexels.com/download/video/33931079/",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661962637716-e29cb0ac15c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVsaWNvcHRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700",
    },
    {
      id: 3,
      title: "How Unimacc Ensures Quality",
      subtitle: "A look inside our premium manufacturing process.",
      src: "https://www.pexels.com/download/video/34251923/",
      thumbnail:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742",
    },
  ];

  const [playingVideo, setPlayingVideo] = useState(null);

  const togglePlay = (id) => {
    const video = document.getElementById(`video-${id}`);
    if (!video) return;

    if (video.paused) {
      videos.forEach((v) => {
        const other = document.getElementById(`video-${v.id}`);
        if (other && v.id !== id) other.pause();
      });
      video.play();
      setPlayingVideo(id);
    } else {
      video.pause();
      setPlayingVideo(null);
    }
  };

  const handleFullScreen = (id) => {
    const video = document.getElementById(`video-${id}`);
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
      video.play();
      setPlayingVideo(id);
    }
  };

  return (
    <section className="py-12 px-5 sm:px-8 md:px-10 text-center">
      {/* Section Header */}
      <div className="border-b-2 border-primary/60 py-2 mb-8 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl text-primary font-medium">
          Watch Our Videos
        </h1>
        <button
          onClick={() => navigate("/videos")}
          className="flex items-center gap-2 text-primary font-medium hover:text-theme transition-all duration-200"
        >
          View All
          <FaPlay className="text-xs sm:text-sm" />
        </button>
      </div>

      {/* Grid of Video Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative group">
              <video
                id={`video-${video.id}`}
                src={video.src}
                poster={video.thumbnail}
                className="w-full h-56 object-cover rounded-t-md transition-transform duration-300 group-hover:scale-[1.02]"
              ></video>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Play / Pause Button */}
              <button
                onClick={() => togglePlay(video.id)}
                className="absolute inset-0 flex opacity-0 group-hover:opacity-100 items-center justify-center transition-transform duration-300 group-hover:scale-110"
              >
                {playingVideo === video.id ? (
                  <FaPause className="text-theme text-3xl sm:text-4xl drop-shadow-lg" />
                ) : (
                  <FaPlay className="text-theme text-3xl sm:text-4xl drop-shadow-lg" />
                )}
              </button>

              {/* Full Screen Button (top-right) */}
              <button
                onClick={() => handleFullScreen(video.id)}
                className="absolute top-3 right-3 bg-white/90 text-primary p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-theme hover:text-white"
                title="Full Screen"
              >
                <FaExpand size={14} />
              </button>
            </div>

            {/* Title + Subtitle */}
            <div className="p-4 text-left">
              <h3 className="text-lg font-semibold text-primary leading-snug line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-primary/70 mt-1">{video.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
