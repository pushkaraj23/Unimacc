// import { useEffect, useState } from "react";
// import { getDiscounts } from "../api/userApi";

// const DiscountCards = () => {
//   const [discounts, setDiscounts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getDiscounts();
//       setDiscounts(res.body);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 min-h-screen sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {discounts.map((item) => (
//         <div
//           key={item.id}
//           className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border"
//         >
//           {/* IMAGE */}
//           <div className="relative h-48 w-full">
//             <img

//               alt={item.code}
//               className="h-full w-full object-cover"
//             />

//             {item.isactive && (
//               <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
//                 Active
//               </span>
//             )}
//           </div>

//           {/* CONTENT */}
//           <div className="p-5">
//             <h3 className="text-lg font-bold text-gray-800">
//               {item.code}
//             </h3>

//             <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//               {item.description}
//             </p>

//             {/* DISCOUNT */}
//             {item.value && (
//               <p className="mt-3 text-primary font-semibold">
//                 {item.value}
//                 {item.discountby === "Percentage" ? "% OFF" : " OFF"}
//               </p>
//             )}

//             {/* DATE */}
//             <p className="text-xs text-gray-400 mt-2">
//               Valid:{" "}
//               {new Date(item.startdate).toLocaleDateString()} –{" "}
//               {new Date(item.enddate).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DiscountCards;


// import { useEffect, useState } from "react";
// import { getDiscounts } from "../api/userApi";
// import { FiCopy, FiCalendar, FiTag, FiClock } from "react-icons/fi";
// import { IoCheckmarkCircle, IoGift } from "react-icons/io5";

// const DiscountCards = () => {
//   const [discounts, setDiscounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [copiedCode, setCopiedCode] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getDiscounts();
//         setDiscounts(res.body);
//       } catch (error) {
//         console.error("Error fetching discounts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCopyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     setCopiedCode(code);
//     setTimeout(() => setCopiedCode(null), 2000);
//   };

//   const getStatusColor = (item) => {
//     const isExpired = new Date(item.enddate) < new Date();
//     const isActive = item.isactive && !isExpired;

//     if (isExpired) return "bg-gray-100 text-gray-600 border-gray-300";
//     if (isActive) return "bg-green-50 text-green-700 border-green-200";
//     return "bg-yellow-50 text-yellow-700 border-yellow-200";
//   };

//   const getStatusText = (item) => {
//     const isExpired = new Date(item.enddate) < new Date();
//     const isActive = item.isactive && !isExpired;

//     if (isExpired) return "Expired";
//     if (isActive) return "Active";
//     return "Upcoming";
//   };

//   const getTimeRemaining = (endDate) => {
//     const end = new Date(endDate);
//     const now = new Date();
//     const diffTime = end - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays < 0) return "Expired";
//     if (diffDays === 0) return "Ends today";
//     if (diffDays === 1) return "1 day left";
//     if (diffDays <= 7) return `${diffDays} days left`;
//     if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks left`;
//     return `${Math.floor(diffDays / 30)} months left`;
//   };

//   const getDiscountBadgeColor = (type) => {
//     switch (type) {
//       case "Percentage": return "from-pink-500 to-rose-500";
//       case "Fixed": return "from-blue-500 to-cyan-500";
//       default: return "from-purple-500 to-indigo-500";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-6">
//               <IoGift className="w-10 h-10 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               Exclusive Offers
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Discover amazing discounts and special promotions
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
//                 <div className="h-56 bg-gradient-to-r from-gray-200 to-gray-300" />
//                 <div className="p-6 space-y-4">
//                   <div className="h-4 bg-gray-200 rounded w-1/3" />
//                   <div className="h-6 bg-gray-200 rounded w-2/3" />
//                   <div className="h-4 bg-gray-200 rounded w-full" />
//                   <div className="h-4 bg-gray-200 rounded w-4/5" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center  h-5 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-6 shadow-lg">
//             {/* <IoGift className="w-10 h-10 text-white" /> */}
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Exclusive Offers
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover amazing discounts and special promotions just for you
//           </p>
//         </div>


//         {/* Discount Cards Grid */}
//         <div div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" >
//           {
//             discounts.map((item) => {
//               const isExpired = new Date(item.enddate) < new Date();
//               const daysLeft = Math.ceil((new Date(item.enddate) - new Date()) / (1000 * 60 * 60 * 24));

//               return (
//                 <div
//                   key={item.id}
//                   className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isExpired ? 'opacity-80' : ''}`}
//                 >
//                   {/* Image Section */}
//                   <div className="relative h-56 overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-90" />
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-center">
//                         {item.value ? (
//                           <div className="mb-2">
//                             <span className="text-6xl font-bold text-white">
//                               {item.value}
//                             </span>
//                             <span className="text-3xl font-bold text-white ml-1">
//                               {item.discountby === "Percentage" ? "%" : "$"}
//                             </span>
//                           </div>
//                         ) : (
//                           <IoGift className="w-20 h-20 text-white opacity-80" />
//                         )}
//                         <p className="text-white text-lg font-semibold mt-2">
//                           {item.value ? "DISCOUNT" : "SPECIAL OFFER"}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Status Badge */}
//                     <div className="absolute top-4 left-4">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item)}`}>
//                         {getStatusText(item)}
//                       </span>
//                     </div>

//                     {/* Time Badge */}
//                     <div className="absolute top-4 right-4">
//                       <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
//                         <FiClock className="w-3 h-3 mr-1" />
//                         {getTimeRemaining(item.enddate)}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div className="p-6">
//                     {/* Title and Copy Button */}
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900">
//                           {item.code}
//                         </h3>
//                         <div className="flex items-center mt-1">
//                           <FiTag className="w-4 h-4 text-gray-400 mr-1" />
//                           <span className="text-sm text-gray-500">Discount Code</span>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => handleCopyCode(item.code)}
//                         className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all ${copiedCode === item.code
//                           ? 'bg-green-100 text-green-700 border border-green-200'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
//                           }`}
//                       >
//                         {copiedCode === item.code ? (
//                           <>
//                             <IoCheckmarkCircle className="w-4 h-4 mr-2" />
//                             Copied!
//                           </>
//                         ) : (
//                           <>
//                             <FiCopy className="w-4 h-4 mr-2" />
//                             Copy Code
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     {/* Description */}
//                     <p className="text-gray-600 mb-6 line-clamp-2">
//                       {item.description}
//                     </p>

//                     {/* Discount Details */}
//                     <div className="space-y-4">
//                       {/* Validity Period */}
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <div className="flex items-center mb-2">
//                           <FiCalendar className="w-4 h-4 text-gray-500 mr-2" />
//                           <span className="text-sm font-medium text-gray-700">Validity Period</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="text-xs text-gray-500">From</p>
//                             <p className="text-sm font-semibold text-gray-900">
//                               {new Date(item.startdate).toLocaleDateString('en-US', {
//                                 month: 'short',
//                                 day: 'numeric',
//                                 year: 'numeric'
//                               })}
//                             </p>
//                           </div>
//                           <div className="text-gray-300 mx-2">→</div>
//                           <div className="text-right">
//                             <p className="text-xs text-gray-500">To</p>
//                             <p className={`text-sm font-semibold ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
//                               {new Date(item.enddate).toLocaleDateString('en-US', {
//                                 month: 'short',
//                                 day: 'numeric',
//                                 year: 'numeric'
//                               })}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Progress Bar for Active Offers */}
//                       {!isExpired && daysLeft > 0 && daysLeft <= 30 && (
//                         <div className="pt-2">
//                           <div className="flex justify-between text-xs text-gray-500 mb-1">
//                             <span>Time remaining</span>
//                             <span>{daysLeft} days</span>
//                           </div>
//                           <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <div
//                               className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
//                               style={{
//                                 width: `${Math.max(5, 100 - (daysLeft / 30) * 100)}%`
//                               }}
//                             />
//                           </div>
//                         </div>
//                       )}

                     
//                     </div>

//                     {/* Terms & Conditions */}
//                     <div className="mt-6 pt-4 border-t border-gray-100">
//                       <p className="text-xs text-gray-500">
//                         Terms apply. Cannot be combined with other offers.
//                       </p>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 hover:opacity-100 ${isExpired ? 'border-red-200' : 'border-primary/20'
//                     }`} />
//                 </div>
//               );
//             })
//           }
//         </div >

//         {/* Empty State */}
//         {
//           discounts.length === 0 && !loading && (
//             <div className="text-center py-20">
//               <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
//                 <IoGift className="w-12 h-12 text-gray-400" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                 No Offers Available
//               </h3>
//               <p className="text-gray-600 max-w-md mx-auto mb-8">
//                 We're currently preparing new offers for you. Check back soon for amazing discounts!
//               </p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition"
//               >
//                 Refresh Offers
//               </button>
//             </div>
//           )
//         }
//       </div >
//     </div >
//   );
// };

// export default DiscountCards;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDiscounts } from "../api/userApi";
import { FiCopy, FiCalendar, FiTag, FiClock } from "react-icons/fi";
import { IoCheckmarkCircle, IoGift } from "react-icons/io5";

const DiscountCards = () => {
  const navigate = useNavigate();

  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDiscounts();

        // ✅ Only active & not expired offers
        const activeOffers = res.body.filter(
          (item) =>
            item.isactive === true &&
            new Date(item.enddate) >= new Date()
        );

        setDiscounts(activeOffers);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getTimeRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours} hrs left`;

    const days = Math.floor(hours / 24);
    return `${days} days left`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading offers...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mt-12 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Exclusive Offers
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing discounts just for you
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {discounts.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/offers/${item.id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                {item.imageurl ? (
                  <img
                    src={item.imageurl}
                    alt={item.code}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    {item.value ? (
                      <div className="text-center">
                        <span className="text-6xl font-bold text-white">
                          {item.value}
                        </span>
                        <span className="text-3xl font-bold text-white ml-1">
                          {item.discountby === "Percentage" ? "%" : "₹"}
                        </span>
                        <p className="text-white text-lg font-semibold mt-2">
                          DISCOUNT
                        </p>
                      </div>
                    ) : (
                      <IoGift className="w-20 h-20 text-white opacity-80" />
                    )}
                  </div>
                )}

                {/* Active Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    Active
                  </span>
                </div>

                {/* Time Left */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                    <FiClock className="w-3 h-3 mr-1" />
                    {getTimeRemaining(item.enddate)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.code}
                    </h3>
                    <div className="flex items-center mt-1">
                      <FiTag className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        Discount Code
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCode(item.code);
                    }}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      copiedCode === item.code
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                    }`}
                  >
                    {copiedCode === item.code ? (
                      <>
                        <IoCheckmarkCircle className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  {new Date(item.startdate).toLocaleDateString()} –{" "}
                  {new Date(item.enddate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {discounts.length === 0 && (
          <div className="text-center py-20">
            <IoGift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Active Offers
            </h3>
            <p className="text-gray-600">
              Please check back later for new deals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCards;
