// import React, { useState, useRef, useEffect } from "react";
// import { FaExpand, FaPlay, FaPause, FaHeart, FaEye, FaChevronRight } from "react-icons/fa";

// const VideoCard = ({ video, isPlayingAll, onOpenCollection }) => {
//   const [activeVideo, setActiveVideo] = useState(false);
//   const videoRef = useRef(null);

//   // Handle video play/pause
//   useEffect(() => {
//     if (videoRef.current) {
//       if (isPlayingAll) {
//         videoRef.current.muted = true;
//         videoRef.current.loop = true;
//         videoRef.current.play().catch(() => {});
//       } else {
//         videoRef.current.pause();
//       }
//     }
//   }, [isPlayingAll]);

//   // Fullscreen with contain fit
//   const handleFullScreen = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handleChange = () => {
//       const isFull =
//         document.fullscreenElement === video ||
//         document.webkitFullscreenElement === video ||
//         document.msFullscreenElement === video;

//       if (isFull) {
//         video.style.objectFit = "contain";
//         video.style.backgroundColor = "black";
//       } else {
//         video.style.objectFit = "cover";
//         video.style.backgroundColor = "transparent";
//       }
//     };

//     document.addEventListener("fullscreenchange", handleChange);
//     document.addEventListener("webkitfullscreenchange", handleChange);
//     document.addEventListener("msfullscreenchange", handleChange);

//     if (video.requestFullscreen) video.requestFullscreen();
//     else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
//     else if (video.msRequestFullscreen) video.msRequestFullscreen();

//     video.play();
//   };

//   return (
//     <div
//       className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
//       onMouseEnter={() => setActiveVideo(true)}
//       onMouseLeave={() => setActiveVideo(false)}
//     >
//       {/* Premium Badge */}
//       <div className="absolute top-4 left-4 z-20">
//         <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-theme to-orange-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
//           <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
//           Premium
//         </span>
//       </div>

//       {/* Duration Badge */}
//       <div className="absolute top-4 right-4 z-20 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
//         {video.duration}
//       </div>

//       {/* Video Container */}
//       <div className="relative aspect-[9/16] overflow-hidden">
//         <video
//           ref={videoRef}
//           src={video.videourl}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//           poster={video.thumbnail}
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

//         {/* Interactive Overlay */}
//         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-theme/20 via-transparent to-transparent"></div>

//         {/* Fullscreen Button */}
//         <button
//           onClick={handleFullScreen}
//           className="absolute bottom-20 right-4 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-theme hover:text-white hover:scale-110"
//           title="Full Screen"
//         >
//           <FaExpand className="w-4 h-4" />
//         </button>
        
//       </div>

//       {/* Content Overlay */}
//       <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//         {/* Influencer & Product Info */}
//         <div className="flex items-start gap-3 mb-4">
//           <div className="w-12 h-12 rounded-full bg-gradient-to-r from-theme to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
//             {video.influencerName?.charAt(0) || '?'}
//           </div>
//           <div className="flex-1">
//             <h3 className="text-xl font-bold leading-tight mb-1">
//               {video.influencerName }
//             </h3>
//             <p className="text-white/90 text-sm font-medium">
//               {video.productName}
//             </p>
//           </div>
//         </div>

//         {/* Stats & Rating */}
//         <div className="flex items-center justify-between mb-5">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-1.5 text-sm">
//               <FaEye className="w-3.5 h-3.5 text-white/70" />
//               <span className="font-medium">{video.views}</span>
//             </div>
//             <div className="flex items-center gap-1.5 text-sm">
//               <FaHeart className="w-3.5 h-3.5 text-white/70" />
//               <span className="font-medium">{video.likes}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-1">
//             {[...Array(5)].map((_, i) => (
//               <span
//                 key={i}
//                 className={`text-sm ${i < Math.floor(video.rating) ? 'text-yellow-400' : 'text-white/30'}`}
//               >
//                 ★
//               </span>
//             ))}
//             <span className="text-xs text-white/70 ml-1">{video.rating}</span>
//           </div>
//         </div>

//         {/* Action Button - Opens creator collection */}
//         <button
//           onClick={() => onOpenCollection(video)}
//           className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/30 hover:border-theme hover:from-theme hover:to-orange-500 transition-all duration-300 group/btn"
//         >
//           <span>View {video.influencerName?.split(' ')[0]}'s Collection</span>
//           <FaChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
//         </button>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 border-2 border-transparent group-hover:border-theme/30 rounded-2xl transition-all duration-300 pointer-events-none"></div>
//     </div>
//   );
// };

// export default VideoCard;

import React, { useState, useRef, useEffect } from "react";
import { FaExpand, FaPlay, FaPause, FaHeart, FaEye, FaChevronRight, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const VideoCard = ({ 
  video, 
  isPlayingAll, 
  isMuted = true, 
  onOpenCollection, 
  showCollectionButton = true,
  compact = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(isMuted);
  const [isPlaying, setIsPlaying] = useState(isPlayingAll);
  const videoRef = useRef(null);

  // Sync with parent play state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      setIsVideoMuted(isMuted);
      
      if (isPlayingAll) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isPlayingAll, isMuted]);

  // Toggle individual video play/pause
  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle individual video mute
  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Fullscreen handler
  const handleFullScreen = (e) => {
    e.stopPropagation();
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }

    videoElement.muted = false;
    setIsVideoMuted(false);
    videoElement.play();
  };

  // Get display name (use title for nested videos, influencerName for main)
  const displayName = video.influencerName || video.title || "Creator";
  const displayProduct = video.productName || video.title || "Product";

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${compact ? 'aspect-[9/14]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Badge */}
      {/* <div className="absolute top-4 left-4 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-theme to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          Premium
        </span>
      </div> */}

      {/* Duration Badge */}
      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
        {video.duration || "0:00"}
      </div>

      {/* Video Container */}
      <div className="relative aspect-[9/16] overflow-hidden bg-gray-900">
        <video
          ref={videoRef}
          src={video.videourl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          poster={video.thumbnail}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-theme/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Video Controls - Appear on Hover */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110"
          >
            {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5 ml-1" />}
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-24 right-4 flex flex-col gap-2 z-20">
          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            className={`w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {isVideoMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
          </button>
          
          {/* Fullscreen */}
          <button
            onClick={handleFullScreen}
            className={`w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 delay-75 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <FaExpand className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        {/* Influencer & Product Info */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-theme to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white/20 flex-shrink-0">
            {displayName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold leading-tight truncate">
              {displayName}
            </h3>
            <p className="text-white/80 text-sm font-medium truncate">
              {displayProduct}
            </p>
          </div>
        </div>

        {/* Stats & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <FaEye className="w-3.5 h-3.5 text-white/60" />
              <span className="font-medium">{video.views || "0"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <FaHeart className="w-3.5 h-3.5 text-red-400" />
              <span className="font-medium">{video.likes || "0"}</span>
            </div>
          </div>
          
          {/* Rating Stars */}
          {video.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${i < Math.floor(video.rating) ? 'text-yellow-400' : 'text-white/30'}`}
                >
                  ★
                </span>
              ))}
              <span className="text-xs text-white/70 ml-1">{video.rating}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        {showCollectionButton && onOpenCollection && (
          <button
            onClick={() => onOpenCollection(video)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-gradient-to-r hover:from-theme hover:to-orange-500 hover:border-transparent transition-all duration-300 group/btn"
          >
            <span>View {displayName.split(' ')[0]}'s Collection</span>
            <FaChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-theme/40 rounded-2xl transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default VideoCard;