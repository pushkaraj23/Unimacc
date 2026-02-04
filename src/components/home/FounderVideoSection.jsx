import { useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import { FOUNDER_VIDEOS } from "../../config/founderVideos";
import {
  getEmbedUrl,
  getThumbnailUrl,
  getVideoType,
} from "../../utils/videoUrlHelpers";

const FounderVideoSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!FOUNDER_VIDEOS?.length) return null;

  return (
    <section className="py-20 px-0 bg-gradient-to-b from-white to-[#faf9f7]">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 px-5 sm:px-8">
        <p className="text-theme font-semibold text-sm uppercase tracking-widest mb-3">
          Trusted by Thousands
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
          Hear From Our Founder
        </h2>
        <p className="text-primary/70 text-base sm:text-lg max-w-2xl mx-auto">
          Get to know the passion and values behind Unimacc. Our founder shares
          the story, vision, and commitment to quality that drives everything we
          do.
        </p>
      </div>

      {/* Video Grid - full width, no gaps */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {FOUNDER_VIDEOS.map((video) => {
            const isDirect = getVideoType(video.videoUrl) === "direct";
            const thumbnail = getThumbnailUrl(
              video.videoUrl,
              video.thumbnailUrl
            );

            return (
              <div
                key={video.id}
                className="group relative w-full aspect-[9/16] cursor-pointer overflow-hidden"
                onClick={() => setActiveVideo(video)}
              >
                {/* Continuous playing video (direct/MP4) or thumbnail (YouTube/Vimeo) */}
                {isDirect ? (
                  <video
                    src={video.videoUrl}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-label={video.title}
                  />
                ) : (
                  <img
                    src={thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/640x360/263243/ffffff?text=Video";
                    }}
                  />
                )}
                {/* Dark gradient overlay for title readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300 group-hover:bg-theme group-hover:text-white">
                    <FaPlay className="w-8 h-8 ml-1.5 text-theme group-hover:text-white transition-colors" />
                  </div>
                </div>
                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg sm:text-xl leading-tight drop-shadow-lg">
                    {video.title}
                  </h3>
                </div>
                {/* Duration Badge */}
                {video.duration && (
                  <span className="absolute top-4 right-4 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                    {video.duration}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          <div
            className={`relative w-full rounded-xl overflow-hidden shadow-2xl bg-black ${
              getVideoType(activeVideo.videoUrl) === "direct"
                ? "max-w-[min(90vw,360px)] aspect-[9/16]"
                : "max-w-4xl aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {getVideoType(activeVideo.videoUrl) === "direct" ? (
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={getEmbedUrl(activeVideo.videoUrl)}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default FounderVideoSection;
