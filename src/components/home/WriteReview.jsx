// import React, { useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import { motion } from "framer-motion";
// import { Star } from "lucide-react";

// const WriteReview = ({ productId }) => {
//   const [message, setMessage] = useState("");
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [images, setImages] = useState([]);
//   const [submitting, setSubmitting] = useState(false);

//   // ─── Image Selection and Preview ──────────────────────────────
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setImages(previews);
//   };

//   // ─── Upload Images Helper ────────────────────────────────────
//   const uploadImages = async (images) => {
//     if (!images?.length) return [];
//     const formData = new FormData();
//     for (const [index, image] of images.entries()) {
//       const file = image.file || image;
//       formData.append("files", file, file.name || `image_${index}.jpg`);
//     }
//     const response = await axiosInstance.post("/uploadfile/multiple", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data.files || [];
//   };

//   // ─── Submit Review ────────────────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!productId) return alert("Invalid product ID.");
//     if (!rating) return alert("Please select a rating.");
//     if (!message.trim()) return alert("Please write your review.");

//     setSubmitting(true);
//     try {
//       const uploadedImages = await uploadImages(images);
//       await axiosInstance.post("/product_reviews", {
//         productid: Number(productId),
//         message: message.trim(),
//         rating,
//         isPublished: false,
//         images: uploadedImages,
//       });

//       alert("✅ Thank you! Your review has been submitted for approval.");
//       setMessage("");
//       setImages([]);
//       setRating(0);
//     } catch (error) {
//       console.error(error);
//       alert("❌ Failed to submit review. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8"
//     >
//       <h2 className="text-2xl font-bold text-[#7F1637] mb-4">Write a Review</h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* ⭐ Rating */}
//         <div className="flex items-center gap-2 mb-3">
//           {Array.from({ length: 5 }).map((_, i) => {
//             const index = i + 1;
//             return (
//               <Star
//                 key={index}
//                 size={28}
//                 className={`cursor-pointer transition-all ${
//                   index <= (hoverRating || rating)
//                     ? "fill-secondary text-secondary"
//                     : "text-primary/20"
//                 }`}
//                 onMouseEnter={() => setHoverRating(index)}
//                 onMouseLeave={() => setHoverRating(0)}
//                 onClick={() => setRating(index)}
//               />
//             );
//           })}
//           {rating > 0 && (
//             <span className="ml-2 text-sm text-[#7F1637]/80 font-medium">
//               {rating} / 5
//             </span>
//           )}
//         </div>

//         {/* 💬 Message */}
//         <textarea
//           placeholder="Share your experience..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           rows="4"
//           className="w-full px-4 py-3 placeholder-[#7F1637]/50 rounded-lg bg-[#F6EB9D] text-amber-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#a67856]/40 resize-none"
//         />

//         {/* 📸 Image Upload */}
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageChange}
//           className="block w-full text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-[#7F1637]/15 file:text-[#7F1637]"
//         />

//         {images.length > 0 && (
//           <div className="grid grid-cols-3 gap-3 mt-3">
//             {images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img.preview}
//                 alt="preview"
//                 className="w-full h-24 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform"
//               />
//             ))}
//           </div>
//         )}

//         {/* ✅ Submit */}
//         <button
//           type="submit"
//           disabled={submitting}
//           className={`w-full py-3 font-bold text-white rounded-lg transition ${
//             submitting
//               ? "bg-[#83582E]/40 cursor-not-allowed"
//               : "bg-[#7F1637] hover:bg-[#d6285f]"
//           }`}
//         >
//           {submitting ? "Submitting..." : "Submit Review"}
//         </button>
//       </form>
//     </motion.div>
//   );
// };

// export default WriteReview;


import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";
import { Star, Upload, Camera, X, Loader } from "lucide-react";

const WriteReview = ({ productId }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // ─── Image Selection and Preview ──────────────────────────────
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));
    setImages(previews);
  };

  // ─── Remove Image ─────────────────────────────────────────────
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // ─── Upload Images Helper ────────────────────────────────────
  const uploadImages = async (images) => {
    if (!images?.length) return [];
    const formData = new FormData();
    for (const [index, image] of images.entries()) {
      const file = image.file || image;
      formData.append("files", file, file.name || `image_${index}.jpg`);
    }
    const response = await axiosInstance.post("/uploadfile/multiple", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.files || [];
  };

  // ─── Submit Review ────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId) return alert("Invalid product ID.");
    if (!rating) return alert("Please select a rating.");
    if (!message.trim()) return alert("Please write your review.");

    setSubmitting(true);
    try {
      const uploadedImages = await uploadImages(images);
      await axiosInstance.post("/product_reviews", {
        productid: Number(productId),
        message: message.trim(),
        rating,
        isPublished: true,
        images: uploadedImages,
      });

      alert("✅ Thank you! Your review has been submitted for approval.");
      setMessage("");
      setImages([]);
      setRating(0);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Write a Review</h2>
        <p className="text-gray-500 text-sm">Share your experience...</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ⭐ Rating */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Rate this product
          </label>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const index = i + 1;
              return (
                <motion.button
                  key={index}
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1"
                  onMouseEnter={() => setHoverRating(index)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(index)}
                >
                  <Star
                    size={34}
                    strokeWidth={1.5}
                    className={`transition-all duration-200 ${
                      index <= (hoverRating || rating)
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                </motion.button>
              );
            })}
            {rating > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-4 px-3 py-1 bg-orange-100 rounded-full"
              >
                <span className="text-sm font-bold text-orange-700">
                  {rating} / 5
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* 💬 Message */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Your Review
          </label>
          <div className="relative">
            <textarea
              placeholder="Share your experience..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 resize-none transition-colors"
            />
            <div className="absolute bottom-3 right-3">
              <span className={`text-xs ${message.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                {message.length}/500
              </span>
            </div>
          </div>
        </div>

        {/* 📸 Image Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Add Images (Optional)
          </label>
          
          <div className="space-y-4">
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Upload className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-orange-700">
                    Click to upload images
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG or GIF • Max 5MB each
                  </p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {images.map((img) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={img.preview}
                        alt="preview"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* ✅ Submit */}
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={submitting ? {} : { scale: 1.02 }}
          whileTap={submitting ? {} : { scale: 0.98 }}
          className={`w-full py-3 font-bold text-white rounded-lg transition-all ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-200"
          }`}
        >
          {submitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Submitting...
            </div>
          ) : (
            "Submit Review"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default WriteReview;