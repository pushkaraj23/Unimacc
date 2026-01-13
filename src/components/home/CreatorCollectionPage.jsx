// import React from "react";
// import { FaTimes, FaEye, FaHeart, FaPlay } from "react-icons/fa";

// const CreatorCollectionModal = ({ creator, onClose }) => {
//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       ></div>

//       {/* Modal Content */}
//       <div className="relative min-h-screen flex items-center justify-center p-4">
//         <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//           {/* Modal Header */}
//           <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-r from-theme to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
//                   {creator.influencerName?.charAt(0) || '?'}
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900">
//                     {creator.influencerName}'s Collection
//                   </h2>
//                   <p className="text-gray-600 mt-1">{creator.description}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//               >
//                 <FaTimes className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Stats Bar */}
//             <div className="flex items-center gap-8 mt-6">
//               <div className="flex items-center gap-2">
//                 <FaEye className="w-5 h-5 text-theme" />
//                 <span className="text-lg font-semibold">{creator.views}</span>
//                 <span className="text-gray-600">Total Views</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaHeart className="w-5 h-5 text-red-500" />
//                 <span className="text-lg font-semibold">{creator.likes}</span>
//                 <span className="text-gray-600">Likes</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-semibold text-yellow-500">★ {creator.rating}</span>
//                 <span className="text-gray-600">Rating</span>
//               </div>
//             </div>
//           </div>

//           {/* Modal Body - All Creator Videos */}
//           <div className="p-6 overflow-y-auto max-h-[60vh]">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {creator.videos?.map((creatorVideo) => (
//                 <div
//                   key={creatorVideo.id}
//                   className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
//                 >
//                   <div className="relative aspect-video bg-gray-900">
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
//                         <FaPlay className="w-6 h-6 text-white" />
//                       </div>
//                     </div>
//                     <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
//                       {creatorVideo.duration}
//                     </div>
//                   </div>
//                   <div className="p-5">
//                     <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
//                       {creatorVideo.title}
//                     </h3>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <FaEye className="w-4 h-4" />
//                         <span className="text-sm">{creatorVideo.views}</span>
//                       </div>
//                       <button className="px-4 py-2 bg-theme text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
//                         Watch Video
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* No Videos Message */}
//             {(!creator.videos || creator.videos.length === 0) && (
//               <div className="text-center py-12">
//                 <div className="text-5xl mb-4">📹</div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">No Videos Available</h3>
//                 <p className="text-gray-600">This influencer hasn't uploaded additional videos yet.</p>
//               </div>
//             )}
//           </div>

//           {/* Modal Footer */}
//           <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-6">
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 transition-colors"
//               >
//                 Close Collection
//               </button>
//               <div className="flex items-center gap-4">
//                 <span className="text-gray-600">
//                   {creator.videos?.length || 0} videos in collection
//                 </span>
//                 <button className="px-6 py-3 bg-gradient-to-r from-theme to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all">
//                   Follow {creator.influencerName?.split(' ')[0]}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatorCollectionModal;


// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaEye, FaHeart, FaPlay, FaShare, FaDownload, FaBookmark, FaGlobe } from "react-icons/fa";

// const CreatorCollectionPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { creator } = location.state || {};

//   // If no creator data, show error
//   if (!creator) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
//         <div className="text-center">
//           <div className="text-6xl mb-4">😕</div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Creator Not Found</h1>
//           <p className="text-gray-600 mb-8">The creator you're looking for doesn't exist or the data is unavailable.</p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-3 bg-gradient-to-r from-theme to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-theme/10 via-white to-orange-500/10">
//         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

//         <div className="relative max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           {/* Back Button */}
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all mb-8 group"
//           >
//             <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//             <span className="font-medium">Back to Influencers</span>
//           </button>

//           {/* Creator Header */}
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
//             {/* Creator Avatar */}
//             <div className="relative">
//               <div className="w-32 h-32 rounded-full bg-gradient-to-r from-theme to-orange-500 flex items-center justify-center text-white font-bold text-4xl shadow-2xl">
//                 {creator.influencerName?.charAt(0) || '?'}
//               </div>
//               <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
//                 <span className="text-white font-bold">✓</span>
//               </div>
//             </div>

//             {/* Creator Info */}
//             <div className="flex-1">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
//                     {creator.influencerName}
//                   </h1>
//                   <p className="text-gray-600 text-lg mb-4">{creator.description}</p>

//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     <span className="px-3 py-1 bg-theme/10 text-theme rounded-full text-sm font-medium">
//                       {creator.category}
//                     </span>
//                     <span className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-sm font-medium">
//                       Verified Creator
//                     </span>
//                     <span className="px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full text-sm font-medium">
//                       Top Rated
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Videos Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

//         {/* Videos Grid */}
//         {creator.videos && creator.videos.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {creator.videos.map((video) => (
//               <div
//                 key={video.id}
//                 className="
//     group bg-white rounded-2xl overflow-hidden
//     border border-gray-200
//     shadow-md hover:shadow-2xl
//     transition-all duration-300
//     flex flex-col
//     h-[420px]
//   "
//               >

//                 {/* Video Thumbnail */}
//                 <div className="relative h-[55%] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
//                   {/* Play Overlay */}
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition">
//                       <FaPlay className="w-7 h-7 text-white ml-1" />
//                     </div>
//                   </div>

//                   {/* Duration */}
//                   <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
//                     {video.duration}
//                   </div>

//                   {/* Badge */}
//                   <div className="absolute top-3 left-3 bg-gradient-to-r from-theme to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
//                     Premium
//                   </div>
//                 </div>


//                 {/* Video Info */}
//                 <div className="p-5 flex flex-col justify-between flex-1">
//                   <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
//                     {video.title}
//                   </h3>

//                   <div className="mt-4 flex items-center justify-between">
//                     {/* Stats */}
//                     <div className="flex items-center gap-3 text-gray-600">
//                       <div className="flex items-center gap-1 text-sm">
//                         <FaEye className="w-4 h-4" />
//                         {video.views}
//                       </div>
//                       <div className="flex text-yellow-400 text-xs">
//                         ★★★★★
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-2">
//                       <button className="p-2 rounded-lg hover:bg-gray-100 transition">
//                         <FaBookmark className="w-4 h-4 text-gray-600" />
//                       </button>
//                       <button className="p-2 rounded-lg hover:bg-gray-100 transition">
//                         <FaDownload className="w-4 h-4 text-gray-600" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* CTA */}
//                   <button className="mt-4 w-full py-2 bg-gradient-to-r from-theme to-orange-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition">
//                     Watch Now
//                   </button>
//                 </div>

//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🎬</div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No Videos Yet</h3>
//             <p className="text-gray-600 mb-8">This influencer hasn't uploaded any videos yet.</p>
//             <button
//               onClick={() => navigate('/')}
//               className="px-6 py-3 bg-gradient-to-r from-theme to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
//             >
//               Explore Other Creators
//             </button>
//           </div>
//         )}

//         {/* Featured Product */}
//         <div className="mt-16 bg-gradient-to-r from-theme/5 to-orange-500/5 rounded-3xl p-8">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Featured Product</h3>
//               <h4 className="text-xl font-semibold text-theme mb-2">{creator.productName}</h4>
//               <p className="text-gray-600 mb-6">{creator.description}</p>
//               <button className="px-6 py-3 bg-gradient-to-r from-theme to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all">
//                 Shop This Product
//               </button>
//             </div>
//             <div className="w-full md:w-96 h-64 bg-gradient-to-r from-gray-900 to-black rounded-2xl flex items-center justify-center">
//               <div className="text-center text-white">
//                 <div className="text-4xl mb-2">🚿</div>
//                 <p className="text-lg font-medium">Product Preview</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatorCollectionPage;


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import VideoCard from "./VideoCard";

// const CreatorCollectionPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { creator } = location.state || {};
//   const [playAll, setPlayAll] = useState(true);

//   if (!creator) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <button onClick={() => navigate("/")}>Back Home</button>
//       </div>
//     );
//   }

//   const handleOpenCollection = () => {
//     // already on collection page → optional future use
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* HERO */}
//       <div className="relative bg-gradient-to-r from-theme/10 via-white to-orange-500/10">
//         <div className="max-w-7xl mx-auto px-6 py-12">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2  mt-10 px-4 py-3 bg-gray-200 rounded-xl shadow mb-8"
//           >
//             <FaArrowLeft />

//           </button>

//           <div className="flex items-center gap-6">
//             <div className="w-28 h-28 rounded-full bg-gradient-to-r from-theme to-orange-500 flex items-center justify-center text-white text-4xl font-bold">
//               {creator.influencerName?.charAt(0)}
//             </div>

//             <div>
//               <h1 className="text-4xl font-bold">{creator.influencerName}</h1>
//               <p className="text-gray-600 mt-2">{creator.description}</p>

//               <div className="flex gap-2 mt-4">
//                 <span className="px-3 py-1 bg-theme/10 text-theme rounded-full text-sm">
//                   {creator.category}
//                 </span>
//                 <span className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-sm">
//                   Verified
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* VIDEOS */}
//       <div className="max-w-7xl mx-auto px-6 py-14">


//         {creator.videos?.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {creator.videos.map((video) => (
//               <VideoCard
//                 key={video.id}
//                 video={video}
//                 isPlayingAll={playAll}
//                 onOpenCollection={handleOpenCollection}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <h3 className="text-2xl font-bold">No Videos Yet</h3>
//           </div>
//         )}
//       </div>

//       {/* FEATURED PRODUCT */}
//       {/* <div className="max-w-7xl mx-auto px-6 pb-20">
//         <div className="bg-gradient-to-r from-theme/5 to-orange-500/5 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h3 className="text-2xl font-bold mb-3">Featured Product</h3>
//             <h4 className="text-xl font-semibold text-theme mb-2">
//               {creator.productName}
//             </h4>
//             <p className="text-gray-600 mb-6">{creator.description}</p>
//             <button className="px-6 py-3 bg-gradient-to-r from-theme to-orange-500 text-white rounded-xl">
//               Shop This Product
//             </button>
//           </div>

//           <div className="w-full md:w-96 h-64 bg-black rounded-2xl flex items-center justify-center text-white text-lg">
//             Product Preview
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default CreatorCollectionPage;



import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlay, FaPause, FaHeart, FaShare, FaBookmark, FaEye, FaExpand, FaVolumeMute, FaVolumeUp, FaChevronRight } from "react-icons/fa";

const CreatorCollectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { creator } = location.state || {};
  const [playAll, setPlayAll] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Redirect if no creator data
  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-3xl">👤</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Creator Not Found</h2>
          <p className="text-gray-500 mb-6">The creator you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-theme to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-theme/5 via-white to-orange-500/5"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-theme/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-theme/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-md hover:shadow-lg text-gray-700 hover:text-theme transition-all duration-300 mb-8 group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Creators</span>
          </button>

          {/* Creator Profile Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-10 border border-white/50">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-theme to-orange-500 flex items-center justify-center text-white text-5xl md:text-6xl font-bold shadow-2xl ring-4 ring-white">
                  {creator.influencerName?.charAt(0) || '?'}
                </div>
                {/* Verified Badge */}
                {/* <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div> */}
              </div>

              {/* Creator Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {creator.influencerName}
                </h1>

                <p className="text-gray-600 text-lg mb-4 max-w-2xl">
                  {creator.description || "Creating amazing content with premium products."}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-theme/10 to-theme/20 text-theme rounded-full text-sm font-semibold">
                    {creator.category || "Lifestyle"}
                  </span>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                    ✓ Verified Creator
                  </span>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 rounded-full text-sm font-semibold">
                    🔥 Trending
                  </span>
                </div>

                {/* Stats */}
                {/* <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.videos?.length || 0}</div>
                    <div className="text-sm text-gray-500">Videos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.views}</div>
                    <div className="text-sm text-gray-500">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{creator.likes}</div>
                    <div className="text-sm text-gray-500">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-2xl font-bold text-gray-900">{creator.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                </div> */}
              </div>

              {/* Action Buttons */}
              {/* <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-theme to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <FaHeart className="w-4 h-4" />
                  Follow
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-theme hover:text-theme transition-all duration-300">
                  <FaShare className="w-4 h-4" />
                  Share
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Video Collection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Video Collection</h2>
            <p className="text-gray-500 mt-1">{creator.videos?.length || 0} videos from {creator.influencerName}</p>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-theme/30 transition-all text-gray-600 hover:text-theme"
            >
              {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
              <span className="text-sm font-medium">{isMuted ? "Unmute" : "Mute"}</span>
            </button>
            {/* <button
              onClick={() => setPlayAll(!playAll)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-theme to-orange-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {playAll ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
              <span className="text-sm font-medium">{playAll ? "Pause All" : "Play All"}</span>
            </button> */}
          </div>
        </div>

        {/* Videos Grid */}
        {creator.videos?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {creator.videos.map((video, index) => (
              <CollectionVideoCard
                key={video.id || index}
                video={{
                  ...video,
                  influencerName: creator.influencerName,
                  videourl: video.videourl || creator.videourl,
                  thumbnail: video.thumbnail || creator.thumbnail,
                }}
                isPlayingAll={playAll}
                isMuted={isMuted}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Videos Yet</h3>
            <p className="text-gray-500">This creator hasn't uploaded any videos yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Simplified Video Card for Collection Page
const CollectionVideoCard = ({ video, isPlayingAll, isMuted }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(isPlayingAll);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlayingAll) {
        videoRef.current.play().catch(() => { });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isPlayingAll, isMuted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => { });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullScreen = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Duration Badge */}
      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
        {video.duration || "0:00"}
      </div>

      {/* Video */}
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5 ml-1" />}
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={handleFullScreen}
          className={`absolute bottom-20 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <FaExpand className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-lg truncate mb-1">
          {video.title || video.productName}
        </h3>
        <div className="flex items-center gap-4 text-sm text-white/80">
          <span className="flex items-center gap-1">
            <FaEye className="w-3 h-3" /> {video.views}
          </span>
          <span className="flex items-center gap-1">
            <FaHeart className="w-3 h-3 text-red-400" /> {video.likes}
          </span>
        </div>
        <div className="p-2">
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-gradient-to-r hover:from-theme hover:to-orange-500 hover:border-transparent transition-all duration-300 group/btn"
          >
            <span>View Product</span>
            <FaChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorCollectionPage;