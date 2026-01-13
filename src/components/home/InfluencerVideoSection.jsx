// // import React, { useEffect, useState, useRef } from "react";
// // import { FaExpand, FaPlay, FaPause } from "react-icons/fa";
// // import { useQuery } from "@tanstack/react-query";

// // // Mock API function - replace with your actual API call
// // const fetchInfluencerVideos = async () => {
// //   // Simulating API delay
// //   await new Promise(resolve => setTimeout(resolve, 1000));

// //   return [
// //     {
// //       id: 1,
// //       videourl: "/videos/influ.mp4",
// //       // thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
// //       influencerName: "Alex Reynolds",
// //       productName: "HydroRain Shower",
// //       views: "2.1M",
// //       likes: "145K",
// //     },
// //     {
// //       id: 2,
// //       videourl: "/videos/influ.mp4",
// //       // thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
// //       influencerName: "Sarah Chen",
// //       productName: "SmartFlow Faucet",
// //       views: "3.4M",
// //       likes: "210K",
// //     },
// //     {
// //       id: 3,
// //       videourl: "/videos/influ.mp4",
// //       // thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
// //       influencerName: "Mike Thompson",
// //       productName: "Luxury Rainfall",
// //       views: "1.8M",
// //       likes: "98K",
// //     },
// //     {
// //       id: 4,
// //       videourl: "/videos/influ.mp4",
// //       // thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
// //       influencerName: "Emma Rodriguez",
// //       productName: "Eco Shower Head",
// //       views: "4.2M",
// //       likes: "312K",
// //     },
// //     {
// //       id: 5,
// //       videourl: "/videos/influ.mp4",
// //       // thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",      influencerName: "David Kim",
// //       productName: "Smart Shower Pro",
// //       views: "1.5M",
// //       likes: "89K",
// //     },
// //     {
// //       id: 6,
// //       videourl: "/videos/influ.mp4",
// //       // thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
// //       influencerName: "Lisa Wang",
// //       productName: "Rainfall Deluxe",
// //       views: "2.8M",
// //       likes: "156K",
// //     },
// //     {
// //       id: 7,
// //       videourl: "/videos/influ.mp4",
// //       // thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
// //       influencerName: "James Wilson",
// //       productName: "UltraFlow System",
// //       views: "3.2M",
// //       likes: "234K",
// //     },
// //     {
// //       id: 8,
// //       videourl: "/videos/influ.mp4",
// //       // thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
// //       influencerName: "Sophia Martinez",
// //       productName: "Eco Pro Max",
// //       views: "5.1M",
// //       likes: "412K",
// //     },
// //   ];
// // };

// // const InfluencerVideoSection = () => {
// //   const {
// //     data: videos = [],
// //     isPending,
// //     isError,
// //   } = useQuery({
// //     queryKey: ["influencerVideos"],
// //     queryFn: fetchInfluencerVideos,
// //   });

// //   const [showAll, setShowAll] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// //   const [isPlayingAll, setIsPlayingAll] = useState(true);
// //   const videoRefs = useRef({});

// //   // 🔹 Detect screen size
// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth < 768);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   // 🔹 Auto-play all videos
// //   useEffect(() => {
// //     if (!videos?.length) return;

// //     const playVideos = async () => {
// //       if (isPlayingAll) {
// //         videos.forEach((v) => {
// //           const el = videoRefs.current[`video-${v.id}`];
// //           if (el) {
// //             el.muted = true;
// //             el.loop = true;
// //             el.play().catch(() => { });
// //           }
// //         });
// //       } else {
// //         videos.forEach((v) => {
// //           const el = videoRefs.current[`video-${v.id}`];
// //           if (el) {
// //             el.pause();
// //           }
// //         });
// //       }
// //     };

// //     playVideos();
// //   }, [videos, isPlayingAll]);

// //   // 🔹 Fullscreen with contain fit
// //   const handleFullScreen = (id) => {
// //     const video = videoRefs.current[`video-${id}`];
// //     if (!video) return;

// //     const handleChange = () => {
// //       const isFull =
// //         document.fullscreenElement === video ||
// //         document.webkitFullscreenElement === video ||
// //         document.msFullscreenElement === video;

// //       if (isFull) {
// //         video.style.objectFit = "contain";
// //         video.style.backgroundColor = "black";
// //       } else {
// //         video.style.objectFit = "cover";
// //         video.style.backgroundColor = "transparent";
// //       }
// //     };

// //     document.addEventListener("fullscreenchange", handleChange);
// //     document.addEventListener("webkitfullscreenchange", handleChange);
// //     document.addEventListener("msfullscreenchange", handleChange);

// //     if (video.requestFullscreen) video.requestFullscreen();
// //     else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
// //     else if (video.msRequestFullscreen) video.msRequestFullscreen();

// //     video.play();
// //   };

// //   // 🔹 Toggle all videos play/pause
// //   const toggleAllVideos = () => {
// //     setIsPlayingAll(!isPlayingAll);
// //   };

// //   // 🔹 Loading & Error States
// //   if (isPending)
// //     return (
// //       <div className="flex justify-center items-center h-[60vh] text-gray-500">
// //         Loading influencer videos...
// //       </div>
// //     );

// //   if (isError)
// //     return (
// //       <div className="flex justify-center items-center h-[60vh] text-red-600">
// //         Failed to load influencer videos.
// //       </div>
// //     );

// //   if (!videos?.length)
// //     return (
// //       <div className="flex justify-center items-center h-[60vh] text-gray-600">
// //         No influencer videos found.
// //       </div>
// //     );

// //   // 🔹 Determine how many videos to show before "View More"
// //   const limit = isMobile ? 4 : videos.length > 5 ? 5 : videos.length;
// //   const visibleVideos = showAll ? videos : videos.slice(0, limit);
// //   const shouldShowButton = videos.length > limit;

// //   return (
// //     <section className="py-16 px-5 sm:px-8 md:px-10 text-center">
// //       {/* --- Section Header --- */}
// //       <div className="border-b-2 border-primary/60 py-2 mb-8 flex justify-between items-center">
// //         <h1 className="text-2xl sm:text-3xl text-primary font-medium">
// //           Influencer Showcase
// //         </h1>

// //       </div>

// //       {/* --- Grid of Videos --- */}
// //       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
// //         {visibleVideos.map((video) => (
// //           <div
// //             key={video.id}
// //             className="bg-white hover:cursor-pointer relative rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
// //           >
// //             {/* Video Container */}
// //             <div className="relative group w-full aspect-[9/16]">
// //               <video
// //                 ref={el => videoRefs.current[`video-${video.id}`] = el}
// //                 src={video.videourl}
// //                 autoPlay
// //                 muted
// //                 loop
// //                 playsInline
// //                 className="absolute inset-0 w-full h-full object-cover rounded-t-md transition-transform duration-300 group-hover:scale-[1.02]"
// //                 onClick={() => handleFullScreen(video.id)}
// //                 poster={video.thumbnail}
// //               ></video>

// //               {/* Fullscreen Button */}
// //               <button
// //                 onClick={() => handleFullScreen(video.id)}
// //                 className="absolute top-3 right-3 bg-mute text-primary p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-theme hover:text-white"
// //                 title="Full Screen"
// //               >
// //                 <FaExpand size={14} />
// //               </button>


// //             </div>

// //             {/* Content Overlay - Only Influencer & Product Name */}
// //             <div className="p-4 text-left w-full absolute bg-gradient-to-b from-transparent via-black/60 to-black/90 pt-20 h-fit bottom-0">
// //               {/* Influencer Name */}
// //               {/* Influencer Name */}
// //               <div className="flex items-center gap-2 mb-1">
// //                 <div className="w-8 h-8 bg-theme rounded-full flex items-center justify-center text-white text-xs font-bold">
// //                   {video.influencerName?.charAt(0) || '?'}
// //                 </div>
// //                 <h3 className="text-lg font-semibold text-white leading-snug line-clamp-1">
// //                   {video.influencerName || 'Unknown Influencer'}
// //                 </h3>
// //               </div>

// //               {/* Product Name */}
// //               <p className="text-sm text-white/90 font-medium line-clamp-1">
// //                 {video.productName}
// //               </p>

// //               {/* Stats - Minimal */}
// //               <div className="flex items-center gap-3 mt-2 text-xs text-white/80">
// //                 <span>👁️ {video.views}</span>
// //                 <span>❤️ {video.likes}</span>
// //               </div>
// //               <div className="mt-3">
// //                 <button
// //                   className="
// //       flex items-center gap-2 px-4 py-2 text-xs font-medium
// //       text-white
// //       bg-white/10 backdrop-blur-md
// //       border border-white/30
// //       rounded-full
// //       transition-all duration-300
// //       hover:bg-orange-500 hover:border-orange-500 hover:text-white
// //     "
// //                 >
// //                   See more collection of {video.influencerName}
// //                 </button>
// //               </div>

// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* --- View More / View Less Button --- */}
// //       {shouldShowButton && (
// //         <div className="mt-8">
// //           <button
// //             onClick={() => setShowAll((prev) => !prev)}
// //             className="bg-theme text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-theme/90 transition-all"
// //           >
// //             {showAll ? "View Less" : "View More"}
// //           </button>
// //         </div>
// //       )}

// //       {/* --- Auto-play Status --- */}
// //       <div className="mt-4 text-sm text-gray-600">

// //         <p className="text-xs text-gray-500 mt-1">
// //           Click on any video for fullscreen mode
// //         </p>
// //       </div>
// //     </section>
// //   );
// // };

// // export default InfluencerVideoSection;


// // import React, { useEffect, useState, useRef } from "react";
// // import { FaExpand, FaPlay, FaPause, FaHeart, FaEye, FaChevronRight } from "react-icons/fa";
// // import { useQuery } from "@tanstack/react-query";

// // // Mock API function
// // const fetchInfluencerVideos = async () => {
// //   await new Promise(resolve => setTimeout(resolve, 800));

// //   return [
// //     {
// //       id: 1,
// //       videourl: "/videos/influ.mp4",
// //       thumbnail: "/images/influencers/alex.jpg",
// //       influencerName: "Alex Reynolds",
// //       productName: "HydroRain Luxury Shower System",
// //       views: "2.1M",
// //       likes: "145K",
// //       rating: 4.9,
// //       category: "Premium Bath",
// //       duration: "1:45"
// //     },
// //     {
// //       id: 2,
// //       videourl: "/videos/influ.mp4",
// //       thumbnail: "/images/influencers/sarah.jpg",
// //       influencerName: "Sarah Chen",
// //       productName: "SmartFlow Digital Faucet",
// //       views: "3.4M",
// //       likes: "210K",
// //       rating: 4.8,
// //       category: "Smart Home",
// //       duration: "2:15"
// //     },
// //     {
// //       id: 3,
// //       videourl: "/videos/influ.mp4",
// //       thumbnail: "/images/influencers/mike.jpg",
// //       influencerName: "Mike Thompson",
// //       productName: "Luxury Rainfall Collection",
// //       views: "1.8M",
// //       likes: "98K",
// //       rating: 5.0,
// //       category: "Spa Experience",
// //       duration: "1:30"
// //     },
// //     {
// //       id: 4,
// //       videourl: "/videos/influ.mp4",
// //       thumbnail: "/images/influencers/emma.jpg",
// //       influencerName: "Emma Rodriguez",
// //       productName: "Eco Pro Shower Head",
// //       views: "4.2M",
// //       likes: "312K",
// //       rating: 4.7,
// //       category: "Sustainable",
// //       duration: "2:45"
// //     },
// //     {
// //       id: 5,
// //       videourl: "/videos/influ.mp4",
// //       thumbnail: "/images/influencers/david.jpg",
// //       influencerName: "David Kim",
// //       productName: "Smart Shower Pro",
// //       views: "1.5M",
// //       likes: "89K",
// //       rating: 4.6,
// //       category: "Technology",
// //       duration: "1:55"
// //     },
// //     {
// //       id: 6,
// //       videourl: "/videos/influ.mp4",
// //       thumbnail: "/images/influencers/lisa.jpg",
// //       influencerName: "Lisa Wang",
// //       productName: "Rainfall Deluxe Edition",
// //       views: "2.8M",
// //       likes: "156K",
// //       rating: 4.9,
// //       category: "Luxury",
// //       duration: "2:10"
// //     },
// //     {
// //       id: 7,
// //       videourl: "/videos/influ.mp4",
// //       thumbnail: "/images/influencers/james.jpg",
// //       influencerName: "James Wilson",
// //       productName: "UltraFlow System",
// //       views: "3.2M",
// //       likes: "234K",
// //       rating: 4.8,
// //       category: "Professional",
// //       duration: "2:25"
// //     },
// //     {
// //       id: 8,
// //       videourl: "/videos/influ.mp4",
// //       thumbnail: "/images/influencers/sophia.jpg",
// //       influencerName: "Sophia Martinez",
// //       productName: "Eco Pro Max Collection",
// //       views: "5.1M",
// //       likes: "412K",
// //       rating: 5.0,
// //       category: "Premium Eco",
// //       duration: "3:15"
// //     },
// //   ];
// // };

// // const InfluencerVideoSection = () => {
// //   const {
// //     data: videos = [],
// //     isPending,
// //     isError,
// //   } = useQuery({
// //     queryKey: ["influencerVideos"],
// //     queryFn: fetchInfluencerVideos,
// //   });

// //   const [showAll, setShowAll] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// //   const [isPlayingAll, setIsPlayingAll] = useState(true);
// //   const [activeVideo, setActiveVideo] = useState(null);
// //   const videoRefs = useRef({});

// //   // Detect screen size
// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth < 768);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   // Auto-play all videos
// //   useEffect(() => {
// //     if (!videos?.length) return;

// //     const playVideos = async () => {
// //       if (isPlayingAll) {
// //         videos.forEach((v) => {
// //           const el = videoRefs.current[`video-${v.id}`];
// //           if (el) {
// //             el.muted = true;
// //             el.loop = true;
// //             el.play().catch(() => { });
// //           }
// //         });
// //       } else {
// //         videos.forEach((v) => {
// //           const el = videoRefs.current[`video-${v.id}`];
// //           if (el) {
// //             el.pause();
// //           }
// //         });
// //       }
// //     };

// //     playVideos();
// //   }, [videos, isPlayingAll]);

// //   // Fullscreen with contain fit
// //   const handleFullScreen = (id) => {
// //     const video = videoRefs.current[`video-${id}`];
// //     if (!video) return;

// //     const handleChange = () => {
// //       const isFull =
// //         document.fullscreenElement === video ||
// //         document.webkitFullscreenElement === video ||
// //         document.msFullscreenElement === video;

// //       if (isFull) {
// //         video.style.objectFit = "contain";
// //         video.style.backgroundColor = "black";
// //       } else {
// //         video.style.objectFit = "cover";
// //         video.style.backgroundColor = "transparent";
// //       }
// //     };

// //     document.addEventListener("fullscreenchange", handleChange);
// //     document.addEventListener("webkitfullscreenchange", handleChange);
// //     document.addEventListener("msfullscreenchange", handleChange);

// //     if (video.requestFullscreen) video.requestFullscreen();
// //     else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
// //     else if (video.msRequestFullscreen) video.msRequestFullscreen();

// //     video.play();
// //   };

// //   // Toggle all videos play/pause
// //   const toggleAllVideos = () => {
// //     setIsPlayingAll(!isPlayingAll);
// //   };

// //   // Loading & Error States
// //   if (isPending)
// //     return (
// //       <div className="min-h-screen flex justify-center items-center">
// //         <div className="text-center">
// //           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme mb-4"></div>
// //           <p className="text-gray-600 font-medium">Loading premium content...</p>
// //         </div>
// //       </div>
// //     );

// //   if (isError)
// //     return (
// //       <div className="min-h-screen flex justify-center items-center">
// //         <div className="text-center">
// //           <div className="text-red-500 text-4xl mb-4">⚠️</div>
// //           <p className="text-gray-800 font-medium">Content temporarily unavailable</p>
// //           <p className="text-gray-600 mt-2">Please try again later</p>
// //         </div>
// //       </div>
// //     );

// //   // Determine how many videos to show
// //   const limit = isMobile ? 4 : 4;
// //   const visibleVideos = showAll ? videos : videos.slice(0, limit);
// //   const shouldShowButton = videos.length > limit;

// //   return (
// //     <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
// //       {/* Background decorative elements */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-theme/5 to-orange-500/5 rounded-full blur-3xl"></div>
// //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/5 to-theme/5 rounded-full blur-3xl"></div>
// //       </div>

// //       {/* Main Container */}
// //       <div className="relative max-w-7xl mx-auto">
// //         {/* Premium Header */}
// //         <div className="text-center mb-12">
// //           <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
// //             Curated by
// //             <span className="relative inline-block mx-3">
// //               <span className="relative z-10 text-theme">Top Influencers</span>
// //             </span>
// //           </h1>
// //         </div>

// //         {/* Video Grid */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
// //           {visibleVideos.map((video, index) => (
// //             <div
// //               key={video.id}
// //               className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
// //               onMouseEnter={() => setActiveVideo(video.id)}
// //               onMouseLeave={() => setActiveVideo(null)}
// //             >
// //               {/* Premium Badge */}
// //               <div className="absolute top-4 left-4 z-20">
// //                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-theme to-orange-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
// //                   <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
// //                   Premium
// //                 </span>
// //               </div>

// //               {/* Duration Badge */}
// //               <div className="absolute top-4 right-4 z-20 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
// //                 {video.duration}
// //               </div>

// //               {/* Video Container */}
// //               <div className="relative aspect-[9/16] overflow-hidden">
// //                 <video
// //                   ref={el => videoRefs.current[`video-${video.id}`] = el}
// //                   src={video.videourl}
// //                   autoPlay
// //                   muted
// //                   loop
// //                   playsInline
// //                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //                   poster={video.thumbnail}
// //                 />

// //                 {/* Gradient Overlay */}
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

// //                 {/* Interactive Overlay */}
// //                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-theme/20 via-transparent to-transparent"></div>

// //                 {/* Fullscreen Button */}
// //                 <button
// //                   onClick={() => handleFullScreen(video.id)}
// //                   className="absolute bottom-20 right-4 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-theme hover:text-white hover:scale-110"
// //                   title="Full Screen"
// //                 >
// //                   <FaExpand className="w-4 h-4" />
// //                 </button>

// //                 {/* Play/Pause Indicator */}
// //                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
// //                   <div className={`w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 ${activeVideo === video.id ? 'scale-100' : ''}`}>
// //                     <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center ${isPlayingAll ? 'bg-green-500' : 'bg-red-500'}`}>
// //                       {isPlayingAll ? (
// //                         <FaPause className="w-5 h-5 text-white" />
// //                       ) : (
// //                         <FaPlay className="w-5 h-5 text-white ml-1" />
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Content Overlay */}
// //               <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
// //                 {/* Category Tag */}
// //                 <div className="mb-3">
// //                   <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20">
// //                     {video.category}
// //                   </span>
// //                 </div>

// //                 {/* Influencer & Product Info */}
// //                 <div className="flex items-start gap-3 mb-4">
// //                   <div className="w-12 h-12 rounded-full bg-gradient-to-r from-theme to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
// //                     {video.influencerName?.charAt(0) || '?'}
// //                   </div>
// //                   <div className="flex-1">
// //                     <h3 className="text-xl font-bold leading-tight mb-1">
// //                       {video.influencerName || 'Unknown Influencer'}
// //                     </h3>
// //                     <p className="text-white/90 text-sm font-medium">
// //                       {video.productName}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Stats & Rating */}
// //                 <div className="flex items-center justify-between mb-5">
// //                   <div className="flex items-center gap-4">
// //                     <div className="flex items-center gap-1.5 text-sm">
// //                       <FaEye className="w-3.5 h-3.5 text-white/70" />
// //                       <span className="font-medium">{video.views}</span>
// //                     </div>
// //                     <div className="flex items-center gap-1.5 text-sm">
// //                       <FaHeart className="w-3.5 h-3.5 text-white/70" />
// //                       <span className="font-medium">{video.likes}</span>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     {[...Array(5)].map((_, i) => (
// //                       <span
// //                         key={i}
// //                         className={`text-sm ${i < Math.floor(video.rating) ? 'text-yellow-400' : 'text-white/30'}`}
// //                       >
// //                         ★
// //                       </span>
// //                     ))}
// //                     <span className="text-xs text-white/70 ml-1">{video.rating}</span>
// //                   </div>
// //                 </div>

// //                 {/* Action Button */}
// //                 <button
// //                   className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/30 hover:border-theme hover:from-theme hover:to-orange-500 transition-all duration-300 group/btn"
// //                 >
// //                   <span>View {video.influencerName?.split(' ')[0]}'s Collection</span>
// //                   <FaChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
// //                 </button>
// //               </div>

// //               {/* Hover Effect Border */}
// //               <div className="absolute inset-0 border-2 border-transparent group-hover:border-theme/30 rounded-2xl transition-all duration-300 pointer-events-none"></div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* View More Button */}
// //         {shouldShowButton && (
// //           <div className="text-center">
// //             <button
// //               onClick={() => setShowAll((prev) => !prev)}
// //               className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-theme to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
// //             >
// //               <span>{showAll ? 'Show Less Creators' : 'Discover More Creators'}</span>
// //               <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
// //                 </svg>
// //               </span>
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default InfluencerVideoSection;


// import React, { useEffect, useState, useRef } from "react";
// import { FaExpand, FaPlay, FaPause, FaHeart, FaEye, FaChevronRight, FaTimes, FaChevronLeft, FaChevronDown } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";

// // Mock API function
// const fetchInfluencerVideos = async () => {
//   await new Promise(resolve => setTimeout(resolve, 800));

//   return [
//     {
//       id: 1,
//       videourl: "/videos/influ.mp4",
//       thumbnail: "/images/influencers/alex.jpg",
//       influencerName: "Alex Reynolds",
//       productName: "HydroRain Luxury Shower System",
//       views: "2.1M",
//       likes: "145K",
//       rating: 4.9,
//       category: "Premium Bath",
//       duration: "1:45",
//       description: "Experience the ultimate luxury shower with smart temperature control and 7 different spray patterns.",
//       videos: [
//         { id: 101, title: "Installation Guide", duration: "3:20", views: "450K" },
//         { id: 102, title: "Smart Features Demo", duration: "2:45", views: "680K" },
//         { id: 103, title: "Water Saving Mode", duration: "1:55", views: "320K" },
//         { id: 104, title: "Night Light Feature", duration: "2:10", views: "550K" },
//       ]
//     },
//     {
//       id: 2,
//       videourl: "/videos/influ.mp4",
//       thumbnail: "/images/influencers/sarah.jpg",
//       influencerName: "Sarah Chen",
//       productName: "SmartFlow Digital Faucet",
//       views: "3.4M",
//       likes: "210K",
//       rating: 4.8,
//       category: "Smart Home",
//       duration: "2:15",
//       description: "Voice-activated digital faucet with precise temperature control and water usage tracking.",
//       videos: [
//         { id: 201, title: "Voice Commands Tutorial", duration: "4:15", views: "920K" },
//         { id: 202, title: "Installation Walkthrough", duration: "3:40", views: "750K" },
//         { id: 203, title: "App Integration Guide", duration: "2:55", views: "610K" },
//       ]
//     },
//     {
//       id: 3,
//       videourl: "/videos/influ.mp4",
//       thumbnail: "/images/influencers/mike.jpg",
//       influencerName: "Mike Thompson",
//       productName: "Luxury Rainfall Collection",
//       views: "1.8M",
//       likes: "98K",
//       rating: 5.0,
//       category: "Spa Experience",
//       duration: "1:30",
//       description: "Transform your bathroom into a spa with our rainfall shower system featuring massage jets.",
//       videos: [
//         { id: 301, title: "Spa Mode Demo", duration: "3:05", views: "420K" },
//         { id: 302, title: "Installation Tips", duration: "4:20", views: "380K" },
//         { id: 303, title: "Maintenance Guide", duration: "2:45", views: "290K" },
//         { id: 304, title: "Massage Feature", duration: "2:15", views: "510K" },
//         { id: 305, title: "Water Pressure Test", duration: "1:50", views: "330K" },
//       ]
//     },
//     {
//       id: 4,
//       videourl: "/videos/influ.mp4",
//       thumbnail: "/images/influencers/emma.jpg",
//       influencerName: "Emma Rodriguez",
//       productName: "Eco Pro Shower Head",
//       views: "4.2M",
//       likes: "312K",
//       rating: 4.7,
//       category: "Sustainable",
//       duration: "2:45",
//       description: "Eco-friendly shower head that saves 40% water without compromising on pressure.",
//       videos: [
//         { id: 401, title: "Water Saving Test", duration: "3:30", views: "1.2M" },
//         { id: 402, title: "Installation Guide", duration: "2:45", views: "850K" },
//         { id: 403, title: "Eco Mode Demo", duration: "2:10", views: "690K" },
//       ]
//     },
//     {
//       id: 5,
//       videourl: "/videos/influ.mp4",
//       thumbnail: "/images/influencers/david.jpg",
//       influencerName: "David Kim",
//       productName: "Smart Shower Pro",
//       views: "1.5M",
//       likes: "89K",
//       rating: 4.6,
//       category: "Technology",
//       duration: "1:55",
//       description: "Next-gen smart shower system with AI temperature learning and voice control.",
//       videos: [
//         { id: 501, title: "AI Setup Guide", duration: "4:45", views: "580K" },
//         { id: 502, title: "App Configuration", duration: "3:20", views: "420K" },
//         { id: 503, title: "Smart Features", duration: "2:55", views: "370K" },
//       ]
//     },
//     {
//       id: 6,
//       videourl: "/videos/influ.mp4",
//       thumbnail: "/images/influencers/lisa.jpg",
//       influencerName: "Lisa Wang",
//       productName: "Rainfall Deluxe Edition",
//       views: "2.8M",
//       likes: "156K",
//       rating: 4.9,
//       category: "Luxury",
//       duration: "2:10",
//       description: "Premium rainfall shower with chromotherapy lighting and Bluetooth speaker integration.",
//       videos: [
//         { id: 601, title: "Light Therapy Demo", duration: "3:15", views: "720K" },
//         { id: 602, title: "Speaker Setup", duration: "2:40", views: "490K" },
//         { id: 603, title: "Premium Features", duration: "3:55", views: "610K" },
//         { id: 604, title: "Cleaning Guide", duration: "2:25", views: "380K" },
//       ]
//     },
//     {
//       id: 7,
//       videourl: "/videos/influ.mp4",
//       thumbnail: "/images/influencers/james.jpg",
//       influencerName: "James Wilson",
//       productName: "UltraFlow System",
//       views: "3.2M",
//       likes: "234K",
//       rating: 4.8,
//       category: "Professional",
//       duration: "2:25",
//       description: "Professional-grade shower system used in luxury hotels and resorts worldwide.",
//       videos: [
//         { id: 701, title: "Professional Installation", duration: "5:20", views: "890K" },
//         { id: 702, title: "Commercial Features", duration: "3:45", views: "620K" },
//         { id: 703, title: "Maintenance Tips", duration: "4:10", views: "540K" },
//       ]
//     },
//     {
//       id: 8,
//       videourl: "/videos/influ.mp4",
//       thumbnail: "/images/influencers/sophia.jpg",
//       influencerName: "Sophia Martinez",
//       productName: "Eco Pro Max Collection",
//       views: "5.1M",
//       likes: "412K",
//       rating: 5.0,
//       category: "Premium Eco",
//       duration: "3:15",
//       description: "Our most advanced eco-friendly system with zero compromise on luxury experience.",
//       videos: [
//         { id: 801, title: "Complete Setup Guide", duration: "6:15", views: "1.5M" },
//         { id: 802, title: "All Eco Modes", duration: "4:30", views: "920K" },
//         { id: 803, title: "Sustainability Features", duration: "3:45", views: "780K" },
//         { id: 804, title: "Comparison Test", duration: "5:20", views: "1.1M" },
//       ]
//     },
//   ];
// };

// const InfluencerVideoSection = () => {
//   const {
//     data: videos = [],
//     isPending,
//     isError,
//   } = useQuery({
//     queryKey: ["influencerVideos"],
//     queryFn: fetchInfluencerVideos,
//   });

//   const [showAll, setShowAll] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isPlayingAll, setIsPlayingAll] = useState(true);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [selectedCreator, setSelectedCreator] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const videoRefs = useRef({});

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto-play all videos
//   useEffect(() => {
//     if (!videos?.length) return;

//     const playVideos = async () => {
//       if (isPlayingAll) {
//         videos.forEach((v) => {
//           const el = videoRefs.current[`video-${v.id}`];
//           if (el) {
//             el.muted = true;
//             el.loop = true;
//             el.play().catch(() => { });
//           }
//         });
//       } else {
//         videos.forEach((v) => {
//           const el = videoRefs.current[`video-${v.id}`];
//           if (el) {
//             el.pause();
//           }
//         });
//       }
//     };

//     playVideos();
//   }, [videos, isPlayingAll]);

//   // Fullscreen with contain fit
//   const handleFullScreen = (id) => {
//     const video = videoRefs.current[`video-${id}`];
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

//   // Open creator collection modal
//   const openCreatorCollection = (creator) => {
//     setSelectedCreator(creator);
//     setIsModalOpen(true);
//     setIsPlayingAll(false); // Pause all videos when modal opens
//     document.body.style.overflow = 'hidden'; // Prevent background scrolling
//   };

//   // Close creator collection modal
//   const closeCreatorCollection = () => {
//     setIsModalOpen(false);
//     setSelectedCreator(null);
//     setIsPlayingAll(true); // Resume auto-play when modal closes
//     document.body.style.overflow = 'auto'; // Restore scrolling
//   };

//   // Toggle all videos play/pause
//   const toggleAllVideos = () => {
//     setIsPlayingAll(!isPlayingAll);
//   };

//   // Loading & Error States
//   if (isPending)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading premium content...</p>
//         </div>
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="text-center">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <p className="text-gray-800 font-medium">Content temporarily unavailable</p>
//           <p className="text-gray-600 mt-2">Please try again later</p>
//         </div>
//       </div>
//     );

//   // Determine how many videos to show
//   const limit = isMobile ? 4 : 4;
//   const visibleVideos = showAll ? videos : videos.slice(0, limit);
//   const shouldShowButton = videos.length > limit;

//   return (
//     <>
//       <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
//         {/* Background decorative elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-theme/5 to-orange-500/5 rounded-full blur-3xl"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/5 to-theme/5 rounded-full blur-3xl"></div>
//         </div>

//         {/* Main Container */}
//         <div className="relative max-w-7xl mx-auto">
//           {/* Premium Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Curated by
//               <span className="relative inline-block mx-3">
//                 <span className="relative z-10 text-theme">Top Influencers</span>
//               </span>
//             </h1>
//           </div>

//           {/* Video Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {visibleVideos.map((video) => (
//               <div
//                 key={video.id}
//                 className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
//                 onMouseEnter={() => setActiveVideo(video.id)}
//                 onMouseLeave={() => setActiveVideo(null)}
//               >
//                 {/* Premium Badge */}
//                 <div className="absolute top-4 left-4 z-20">
//                   <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-theme to-orange-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
//                     <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
//                     Premium
//                   </span>
//                 </div>

//                 {/* Duration Badge */}
//                 <div className="absolute top-4 right-4 z-20 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
//                   {video.duration}
//                 </div>

//                 {/* Video Container */}
//                 <div className="relative aspect-[9/16] overflow-hidden">
//                   <video
//                     ref={el => videoRefs.current[`video-${video.id}`] = el}
//                     src={video.videourl}
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     poster={video.thumbnail}
//                   />

//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

//                   {/* Interactive Overlay */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-theme/20 via-transparent to-transparent"></div>

//                   {/* Fullscreen Button */}
//                   <button
//                     onClick={() => handleFullScreen(video.id)}
//                     className="absolute bottom-20 right-4 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-theme hover:text-white hover:scale-110"
//                     title="Full Screen"
//                   >
//                     <FaExpand className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Content Overlay */}
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   {/* Influencer & Product Info */}
//                   <div className="flex items-start gap-3 mb-4">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-r from-theme to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                       {video.influencerName?.charAt(0) || '?'}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-bold leading-tight mb-1">
//                         {video.influencerName || 'Unknown Influencer'}
//                       </h3>
//                       <p className="text-white/90 text-sm font-medium">
//                         {video.productName}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Stats & Rating */}
//                   <div className="flex items-center justify-between mb-5">
//                     <div className="flex items-center gap-4">
//                       <div className="flex items-center gap-1.5 text-sm">
//                         <FaEye className="w-3.5 h-3.5 text-white/70" />
//                         <span className="font-medium">{video.views}</span>
//                       </div>
//                       <div className="flex items-center gap-1.5 text-sm">
//                         <FaHeart className="w-3.5 h-3.5 text-white/70" />
//                         <span className="font-medium">{video.likes}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <span
//                           key={i}
//                           className={`text-sm ${i < Math.floor(video.rating) ? 'text-yellow-400' : 'text-white/30'}`}
//                         >
//                           ★
//                         </span>
//                       ))}
//                       <span className="text-xs text-white/70 ml-1">{video.rating}</span>
//                     </div>
//                   </div>

//                   {/* Action Button - Opens creator collection */}
//                   <button
//                     onClick={() => openCreatorCollection(video)}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/30 hover:border-theme hover:from-theme hover:to-orange-500 transition-all duration-300 group/btn"
//                   >
//                     <span>View {video.influencerName?.split(' ')[0]}'s Collection</span>
//                     <FaChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
//                   </button>
//                 </div>

//                 {/* Hover Effect Border */}
//                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-theme/30 rounded-2xl transition-all duration-300 pointer-events-none"></div>
//               </div>
//             ))}
//           </div>

//           {/* View More Button */}
//           {shouldShowButton && (
//             <div className="text-center">
//               <button
//                 onClick={() => setShowAll((prev) => !prev)}
//                 className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-theme to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
//               >
//                 <span>{showAll ? 'Show Less Creators' : 'Discover More Creators'}</span>
//                 <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//                   </svg>
//                 </span>
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Creator Collection Modal */}
//       {isModalOpen && selectedCreator && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           {/* Backdrop */}
//           <div 
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
//             onClick={closeCreatorCollection}
//           ></div>

//           {/* Modal Content */}
//           <div className="relative min-h-screen flex items-center justify-center p-4">
//             <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//               {/* Modal Header */}
//               <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 rounded-full bg-gradient-to-r from-theme to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
//                       {selectedCreator.influencerName?.charAt(0) || '?'}
//                     </div>
//                     <div>
//                       <h2 className="text-3xl font-bold text-gray-900">
//                         {selectedCreator.influencerName}'s Collection
//                       </h2>
//                       <p className="text-gray-600 mt-1">{selectedCreator.description}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={closeCreatorCollection}
//                     className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//                   >
//                     <FaTimes className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>

//                 {/* Stats Bar */}
//                 <div className="flex items-center gap-8 mt-6">
//                   <div className="flex items-center gap-2">
//                     <FaEye className="w-5 h-5 text-theme" />
//                     <span className="text-lg font-semibold">{selectedCreator.views}</span>
//                     <span className="text-gray-600">Total Views</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FaHeart className="w-5 h-5 text-red-500" />
//                     <span className="text-lg font-semibold">{selectedCreator.likes}</span>
//                     <span className="text-gray-600">Likes</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-semibold text-yellow-500">★ {selectedCreator.rating}</span>
//                     <span className="text-gray-600">Rating</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Body - All Creator Videos */}
//               <div className="p-6 overflow-y-auto max-h-[60vh]">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {selectedCreator.videos?.map((creatorVideo) => (
//                     <div
//                       key={creatorVideo.id}
//                       className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
//                     >
//                       <div className="relative aspect-video bg-gray-900">
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
//                             <FaPlay className="w-6 h-6 text-white" />
//                           </div>
//                         </div>
//                         <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
//                           {creatorVideo.duration}
//                         </div>
//                       </div>
//                       <div className="p-5">
//                         <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
//                           {creatorVideo.title}
//                         </h3>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2 text-gray-600">
//                             <FaEye className="w-4 h-4" />
//                             <span className="text-sm">{creatorVideo.views}</span>
//                           </div>
//                           <button className="px-4 py-2 bg-theme text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
//                             Watch Video
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* No Videos Message */}
//                 {(!selectedCreator.videos || selectedCreator.videos.length === 0) && (
//                   <div className="text-center py-12">
//                     <div className="text-5xl mb-4">📹</div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">No Videos Available</h3>
//                     <p className="text-gray-600">This influencer hasn't uploaded additional videos yet.</p>
//                   </div>
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-6">
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={closeCreatorCollection}
//                     className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 transition-colors"
//                   >
//                     Close Collection
//                   </button>
//                   <div className="flex items-center gap-4">
//                     <span className="text-gray-600">
//                       {selectedCreator.videos?.length || 0} videos in collection
//                     </span>
//                     <button className="px-6 py-3 bg-gradient-to-r from-theme to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all">
//                       Follow {selectedCreator.influencerName?.split(' ')[0]}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default InfluencerVideoSection;


// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import VideoCard from "./VideoCard";
// import CreatorCollectionModal from "./CreatorCollectionModal";
// import { fetchInfluencerVideos } from "./influencerApi";

// const InfluencerVideoSection = () => {
//   const {
//     data: videos = [],
//     isPending,
//     isError,
//   } = useQuery({
//     queryKey: ["influencerVideos"],
//     queryFn: fetchInfluencerVideos,
//   });

//   const [showAll, setShowAll] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isPlayingAll, setIsPlayingAll] = useState(true);
//   const [selectedCreator, setSelectedCreator] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Determine how many videos to show
//   const limit = isMobile ? 4 : 4;
//   const visibleVideos = showAll ? videos : videos.slice(0, limit);
//   const shouldShowButton = videos.length > limit;

//   // Open creator collection modal
//   const openCreatorCollection = (creator) => {
//     setSelectedCreator(creator);
//     setIsModalOpen(true);
//     setIsPlayingAll(false);
//     document.body.style.overflow = 'hidden';
//   };

//   // Close creator collection modal
//   const closeCreatorCollection = () => {
//     setIsModalOpen(false);
//     setSelectedCreator(null);
//     setIsPlayingAll(true);
//     document.body.style.overflow = 'auto';
//   };

//   // Loading & Error States
//   if (isPending)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading premium content...</p>
//         </div>
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="text-center">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <p className="text-gray-800 font-medium">Content temporarily unavailable</p>
//           <p className="text-gray-600 mt-2">Please try again later</p>
//         </div>
//       </div>
//     );

//   return (
//     <>
//       <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
//         {/* Background decorative elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-theme/5 to-orange-500/5 rounded-full blur-3xl"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/5 to-theme/5 rounded-full blur-3xl"></div>
//         </div>

//         {/* Main Container */}
//         <div className="relative max-w-7xl mx-auto">
//           {/* Premium Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Curated by
//               <span className="relative inline-block mx-3">
//                 <span className="relative z-10 text-theme">Top Influencers</span>
//               </span>
//             </h1>
//           </div>

//           {/* Video Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {visibleVideos.map((video) => (
//               <VideoCard
//                 key={video.id}
//                 video={video}
//                 isPlayingAll={isPlayingAll}
//                 onOpenCollection={openCreatorCollection}
//               />
//             ))}
//           </div>

//           {/* View More Button */}
//           {shouldShowButton && (
//             <div className="text-center">
//               <button
//                 onClick={() => setShowAll((prev) => !prev)}
//                 className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-theme to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
//               >
//                 <span>{showAll ? 'Show Less Creators' : 'Discover More Creators'}</span>
//                 <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//                   </svg>
//                 </span>
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Creator Collection Modal */}
//       {isModalOpen && selectedCreator && (
//         <CreatorCollectionModal
//           creator={selectedCreator}
//           onClose={closeCreatorCollection}
//         />
//       )}
//     </>
//   );
// };

// export default InfluencerVideoSection;

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import VideoCard from "./VideoCard";
// import { fetchInfluencerVideos } from ".//influencerApi";

// const InfluencerVideoSection = () => {
//   const {
//     data: videos = [],
//     isPending,
//     isError,
//   } = useQuery({
//     queryKey: ["influencerVideos"],
//     queryFn: fetchInfluencerVideos,
//   });

//   const navigate = useNavigate();
//   const [showAll, setShowAll] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isPlayingAll, setIsPlayingAll] = useState(true);

//   // Navigate to creator collection page
//   const openCreatorCollection = (creator) => {
//     setIsPlayingAll(false); // Pause videos when navigating away

//     // Navigate to creator collection page with creator data
//     navigate(`/creator/${creator.id}`, {
//       state: { creator }
//     });
//   };

//   // Determine how many videos to show
//   const limit = isMobile ? 4 : 4;
//   const visibleVideos = showAll ? videos : videos.slice(0, limit);
//   const shouldShowButton = videos.length > limit;

//   // Loading & Error States
//   if (isPending)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading premium content...</p>
//         </div>
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="text-center">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <p className="text-gray-800 font-medium">Content temporarily unavailable</p>
//           <p className="text-gray-600 mt-2">Please try again later</p>
//         </div>
//       </div>
//     );

//   return (
//     <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-theme/5 to-orange-500/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/5 to-theme/5 rounded-full blur-3xl"></div>
//       </div>

//       {/* Main Container */}
//       <div className="relative max-w-7xl mx-auto">
//         {/* Premium Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//             Curated by
//             <span className="relative inline-block mx-3">
//               <span className="relative z-10 text-theme">Top Influencers</span>
//             </span>
//           </h1>
//         </div>

//         {/* Video Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {visibleVideos.map((video) => (
//             <VideoCard
//               key={video.id}
//               video={video}
//               isPlayingAll={isPlayingAll}
//               onOpenCollection={openCreatorCollection}
//             />
//           ))}
//         </div>

//         {/* View More Button */}
//         {shouldShowButton && (
//           <div className="text-center">
//             <button
//               onClick={() => setShowAll((prev) => !prev)}
//               className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-theme to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
//             >
//               <span>{showAll ? 'Show Less Creators' : 'Discover More Creators'}</span>
//               <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//                 </svg>
//               </span>
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default InfluencerVideoSection;

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";
import { fetchInfluencerVideos } from "./influencerApi";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const InfluencerVideoSection = () => {
  const {
    data: videos = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["influencerVideos"],
    queryFn: fetchInfluencerVideos,
  });

  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigate to creator collection page
  const openCreatorCollection = (creator) => {
    setIsPlayingAll(false);
    navigate(`/creator/${creator.id}`, {
      state: { creator }
    });
  };

  // Determine how many videos to show
  const limit = isMobile ? 4 : 4;
  const visibleVideos = showAll ? videos : videos.slice(0, limit);
  const shouldShowButton = videos.length > limit;

  // Loading State with Skeleton
  if (isPending) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mx-auto"></div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-gray-200 rounded-2xl animate-pulse">
                <div className="h-full w-full flex flex-col justify-end p-6">
                  <div className="h-12 w-12 bg-gray-300 rounded-full mb-3"></div>
                  <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">⚠️</span>
          </div>
          <p className="text-gray-800 font-semibold text-xl">Content temporarily unavailable</p>
          <p className="text-gray-500 mt-2">Please try again later</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-theme text-white rounded-full hover:bg-theme/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-theme/10 to-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-theme/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-theme/5 to-transparent rounded-full"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
           Curated by 
            <span className="relative inline-block mx-3">
              <span className="relative z-10 bg-gradient-to-r from-theme to-orange-500 bg-clip-text text-transparent">
               Industry-Leading Influencer
              </span>

            </span>
          </h1>

         
        </div>

        {/* Controls Bar */}
        {/* <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-theme/30 transition-all duration-300 text-gray-600 hover:text-theme"
          >
            {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
            <span className="text-sm font-medium hidden sm:inline">{isMuted ? "Unmute" : "Mute"}</span>
          </button>

          <button
            onClick={() => setIsPlayingAll(!isPlayingAll)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-theme to-orange-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {isPlayingAll ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
            <span className="text-sm font-medium hidden sm:inline">{isPlayingAll ? "Pause All" : "Play All"}</span>
          </button>
        </div> */}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visibleVideos.map((video, index) => (
            <VideoCard
              key={`${video.id}-${index}`}
              video={video}
              isPlayingAll={isPlayingAll}
              isMuted={isMuted}
              onOpenCollection={openCreatorCollection}
              showCollectionButton={true}
            />
          ))}
        </div>

        {/* View More Button */}
        {shouldShowButton && (
          <div className="text-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gray-100 border-2 border-gray-200 text-gray-800 font-semibold rounded-full shadow-sm hover:shadow-lg hover:border-theme hover:text-theme transition-all duration-300 group"
            >
              <span>{showAll ? 'Show Less Creators' : 'Discover More Creators'}</span>
              <span className={`w-8 h-8 bg-gray-100 group-hover:bg-theme/10 rounded-full flex items-center justify-center transition-all duration-500 ${showAll ? 'rotate-180' : ''}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfluencerVideoSection;