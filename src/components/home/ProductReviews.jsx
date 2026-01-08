// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, X } from "lucide-react";

// const ProductReviews = ({ id }) => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const fetchReviews = async () => {
//     try {
//       const res = await axiosInstance.get(`/product_reviews/product/${id}`);
//       const list = res.data.body || [];

//       // ✅ Only keep published reviews
//       setReviews(list.filter((r) => r.ispublished === true));
//     } catch (error) {
//       console.error("Failed to fetch product reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchReviews();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-10 text-[#7F1637] font-semibold">
//         Loading reviews...
//       </div>
//     );
//   }

//   if (!reviews.length) {
//     return (
//       <div className="flex justify-center items-center py-10 text-[#7F1637]/70 font-medium">
//         No reviews yet. Be the first to share your experience!
//       </div>
//     );
//   }

//   return (
//     <section className="w-full rounded-2xl shadow-md p-8 mt-12">
//       <h2 className="text-2xl font-extrabold text-[#7F1637] mb-6 border-b pb-2">
//         Customer Reviews
//       </h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {reviews.map((review, index) => (
//           <motion.div
//             key={review.id || index}
//             className="bg-secondary/15 rounded-xl shadow-md border backdrop-blur-sm border-[#f6eb9d] p-6 hover:shadow-xl transition-all duration-200"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             {/* Rating */}
//             <div className="flex items-center gap-1 mb-3">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star
//                   key={i}
//                   size={18}
//                   className={
//                     i < review.rating
//                       ? "text-secondary fill-secondary"
//                       : "text-secondary"
//                   }
//                 />
//               ))}
//             </div>

//             {/* Message */}
//             <p className="text-[#7F1637] font-medium mb-4 leading-relaxed">
//               {review.message}
//             </p>

//             {/* Images */}
//             {review.images && review.images.length > 0 && (
//               <div className="grid grid-cols-3 gap-2 mb-3">
//                 {review.images[0].map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={`review-img-${idx}`}
//                     className="w-full h-24 object-cover rounded-lg shadow-sm hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
//                     onClick={() => setSelectedImage(img)}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Date */}
//             <p className="text-xs text-[#7F1637]/60 text-right">
//               {new Date(review.createdat).toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               })}
//             </p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Image Modal */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-end z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="relative bg-white/5 rounded-xl overflow-hidden max-w-4xl w-full h-[80vh] mb-[2vh] flex justify-center items-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//             >
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
//               >
//                 <X size={22} />
//               </button>
//               <img
//                 src={selectedImage}
//                 alt="enlarged-view"
//                 className="w-full h-full object-contain"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default ProductReviews;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Calendar, MessageSquare } from "lucide-react";

const ProductReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/product_reviews/product/${id}`);
      const list = res.data.body || [];

      // ✅ Only keep published reviews
      setReviews(list.filter((r) => r.ispublished === true));
    } catch (error) {
      console.error("Failed to fetch product reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading reviews...</span>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {/* <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-gray-400" />
        </div> */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No reviews yet</h3>
        <p className="text-gray-500 max-w-md">
          Be the first to share your experience about this product!
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Star className="w-6 h-6 text-orange-500" />
          Customer Reviews
          <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </span>
        </h2>
        <p className="text-gray-500">What others are saying about this product</p>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id || index}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-200 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Rating and Date Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    strokeWidth={1.5}
                    className={`${i < review.rating
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                      }`}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">
                  {review.rating}.0
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(review.createdat).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="mb-5">
              <p className="text-gray-700 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                {review.message}
              </p>
            </div>

            {/* Images */}
            {review.images && review.images.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-2">
                  {review.images[0].map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={img}
                        alt={`review-img-${idx}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedImage(img)}
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
                {review.images[0].length > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    {review.images[0].length} photo{review.images[0].length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}

            {/* Decorative bottom border */}
            <div className="pt-4 border-t border-gray-100">
              <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[85vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Image */}
              <div className="w-full h-[70vh] flex items-center justify-center bg-gray-100">
                <img
                  src={selectedImage}
                  alt="enlarged-view"
                  className="max-w-full max-h-full object-contain p-4"
                />
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-sm">Customer review photo</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductReviews;