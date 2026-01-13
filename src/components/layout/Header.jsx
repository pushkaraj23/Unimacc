// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { fetchCategories } from "../../api/userApi";
// import {
//   FaSearch,
//   FaHeart,
//   FaShoppingCart,
//   FaUserCircle,
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaSignOutAlt,
//   FaHandsHelping,
//   FaShareAlt,
//   FaBoxOpen,
//   FaUser,
// } from "react-icons/fa";
// import { MdCompareArrows } from "react-icons/md";

// const Header = () => {
//   const [showHeader, setShowHeader] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [compareCount, setCompareCount] = useState(0);
//   const [query, setQuery] = useState("");
//   const [profileOpen, setProfileOpen] = useState(false);

//   const navigate = useNavigate();
//   const profileRef = useRef(null);

//   const {
//     data: categories = [],
//     isLoading: isCategoriesLoading,
//     isError: isCategoriesError,
//   } = useQuery({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   const isLoggedIn = !!JSON.parse(localStorage.getItem("user"))?.userid;

//   const handleCategoryClick = (id) => {
//     setMenuOpen(false);
//     navigate(`/products?category=${encodeURIComponent(id)}`);
//   };

//   /* ---------- Scroll hide/show ---------- */
//   useEffect(() => {
//     const controlHeader = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY && currentScrollY > 80) {
//         setShowHeader(false);
//       } else {
//         setShowHeader(true);
//       }
//       setLastScrollY(currentScrollY);
//     };
//     window.addEventListener("scroll", controlHeader);
//     return () => window.removeEventListener("scroll", controlHeader);
//   }, [lastScrollY]);

//   const updateCounts = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     const compare = JSON.parse(localStorage.getItem("compare")) || [];

//     setCartCount(cart.reduce((sum, i) => sum + (i.quantity || 1), 0));
//     setWishlistCount(wishlist.length);
//     setCompareCount(compare.length);
//   };

//   useEffect(() => {
//     updateCounts();
//     window.addEventListener("storage", updateCounts);
//     window.addEventListener("localStorageUpdated", updateCounts);
//     return () => {
//       window.removeEventListener("storage", updateCounts);
//       window.removeEventListener("localStorageUpdated", updateCounts);
//     };
//   }, []);

//   /* ---------- Close profile on outside click ---------- */
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       const trimmed = query.trim();
//       if (trimmed) {
//         navigate(`/products?search=${encodeURIComponent(trimmed)}`);
//       }
//     }
//   };

//   /* ---------- Profile actions ---------- */
//   const handleProfileAction = async (action) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user?.userid) {
//       navigate("/profile");
//       setProfileOpen(false);
//       return;
//     }

//     switch (action) {
//       case "profile":
//         navigate("/profile");
//         break;
//       case "orders":
//         navigate("/profile");
//         setTimeout(() => {
//           window.scrollTo({
//             top: window.innerHeight * 0.5,
//             behavior: "smooth",
//           });
//         }, 500);
//         break;
//       case "wishlist":
//         navigate("/wishlist");
//         break;
//       case "refer":
//         if (navigator.share) {
//           await navigator.share({
//             title: "Check out Unimacc!",
//             text: "Explore premium bathroom fittings from Unimacc",
//             url: window.location.origin,
//           });
//         } else {
//           navigator.clipboard.writeText(window.location.origin);
//           alert("🔗 Link copied!");
//         }
//         break;
//       case "support":
//         window.scrollTo({
//           top: document.body.scrollHeight,
//           behavior: "smooth",
//         });
//         break;
//       case "signout":
//         localStorage.removeItem("user");
//         alert("👋 Signed out!");
//         navigate("/profile");
//         break;
//       default:
//         break;
//     }
//     setProfileOpen(false);
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <header
//         className={`fixed top-0 left-0 w-full bg-white border-b-2 py-3 max-sm:py-0 border-primary shadow-sm z-50 transition-transform duration-300 ${
//           showHeader ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <div className="flex items-center justify-between px-5 md:px-6 max-sm:py-3">
//           {/* Left */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden text-xl text-gray-700"
//             >
//               {menuOpen ? <FaTimes /> : <FaBars />}
//             </button>

//             <img
//               src="/logo.svg"
//               alt="Unimacc Logo"
//               className="h-8 cursor-pointer"
//               onClick={() => navigate("/")}
//             />
//           </div>

//           {/* ===== DESKTOP CATEGORY LIST ===== */}
//           <div className="hidden md:flex items-center gap-6">
//             <p
//               onClick={() => navigate("/products")}
//               className="font-medium text-primary/90 cursor-pointer text-sm hover:text-theme"
//             >
//               All
//             </p>
//             {!isCategoriesLoading &&
//               !isCategoriesError &&
//               Object.entries(categories).map(([parent, children]) => (
//                 <div key={parent} className="relative group">
//                   <span
//                     onClick={() => handleCategoryClick(children.id)}
//                     className="font-medium text-primary/90 cursor-pointer text-sm hover:text-theme"
//                   >
//                     {parent}
//                   </span>

//                   {/* Subcategory dropdown */}
//                   {children.children.length !== 0 && (
//                     <div className="absolute left-0 top-full -translate-y-2 p-3 mt-2 hidden group-hover:flex bg-white shadow-lg gap-2 rounded-md z-50">
//                       {children.children.map((child) => (
//                         <div
//                           key={child.id}
//                           onClick={() => handleCategoryClick(child.id)}
//                           className="p-4 text-sm min-w-32 rounded-lg text-primary/80 hover:bg-gray-100 w-fit cursor-pointer flex flex-col items-center gap-2"
//                         >
//                           <img
//                             src={child.imagepath}
//                             className="w-16 h-16 object-cover rounded-lg"
//                             alt={child.name}
//                           />
//                           <p className="text-xs text-center">{child.name}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </div>

//           {/* ===== SEARCH ===== */}
//           <div
//             className="flex items-center border border-gray-400 rounded-full px-4 py-2 
//             w-[28%] max-sm:w-2/5"
//           >
//             <FaSearch className="text-gray-500 mr-3" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
//             />
//           </div>

//           {/* ===== ICONS ===== */}
//           <div className="flex items-center space-x-6 max-sm:space-x-0 text-gray-700 text-xl relative">
//             <div className="hidden md:block relative">
//               <MdCompareArrows
//                 onClick={() => navigate("/compare")}
//                 className="cursor-pointer hover:text-orange-500"
//               />
//               {compareCount > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {compareCount}
//                 </span>
//               )}
//             </div>

//             <div className="hidden md:block relative">
//               <FaHeart
//                 onClick={() => navigate("/wishlist")}
//                 className="cursor-pointer hover:text-orange-500"
//               />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {wishlistCount}
//                 </span>
//               )}
//             </div>

//             <div className="hidden md:block relative">
//               <FaShoppingCart
//                 onClick={() => navigate("/cart")}
//                 className="cursor-pointer hover:text-orange-500"
//               />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </div>

//             {/* Profile */}
//             <div ref={profileRef} className="relative">
//               <FaUserCircle
//                 onClick={() => {
//                   if (!isLoggedIn) {
//                     navigate("/profile");
//                     return;
//                   }
//                   setProfileOpen((prev) => !prev);
//                 }}
//                 className="text-orange-500 cursor-pointer text-3xl md:text-2xl"
//               />

//               {isLoggedIn && profileOpen && (
//                 <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
//                   <button
//                     onClick={() => handleProfileAction("profile")}
//                     className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
//                   >
//                     <FaUser /> Profile
//                   </button>
//                   <button
//                     onClick={() => handleProfileAction("orders")}
//                     className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
//                   >
//                     <FaBoxOpen /> Orders
//                   </button>
//                   <button
//                     onClick={() => handleProfileAction("wishlist")}
//                     className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
//                   >
//                     <FaHeart /> Wishlist
//                   </button>
//                   <button
//                     onClick={() => handleProfileAction("refer")}
//                     className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
//                   >
//                     <FaShareAlt /> Refer
//                   </button>
//                   <button
//                     onClick={() => handleProfileAction("support")}
//                     className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
//                   >
//                     <FaHandsHelping /> Support
//                   </button>
//                   <button
//                     onClick={() => handleProfileAction("signout")}
//                     className="flex gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left"
//                   >
//                     <FaSignOutAlt /> Sign Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Drawer */}
//       <div
//         className={`fixed top-0 left-0 w-64 bg-white h-full shadow-lg z-40 transform transition-transform duration-300 pt-20 ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <h2 className="text-xl font-bold my-3 px-6">Categories</h2>
//         <ul className="text-gray-700">
//           <div
//             onClick={() => {
//               setMenuOpen(false);
//               navigate("/products");
//             }}
//             className="px-6 py-1 font-semibold text-primary bg-gray-50 cursor-pointer"
//           >
//             All
//           </div>
//           {isCategoriesLoading ? (
//             <li className="px-6 py-3 text-gray-400">Loading...</li>
//           ) : isCategoriesError ? (
//             <li className="px-6 py-3 text-red-500">Error loading</li>
//           ) : !categories || Object.keys(categories).length === 0 ? (
//             <li className="px-6 py-3 text-gray-400">No Categories</li>
//           ) : (
//             Object.entries(categories).map(([parent, children]) => (
//               <li key={parent} className="border-b last:border-b-0">
//                 <div
//                   onClick={() => handleCategoryClick(children.id)}
//                   className="px-6 py-3 font-semibold text-primary bg-gray-50 cursor-pointer"
//                 >
//                   {parent}
//                 </div>
//                 <ul>
//                   {children.children.map((child) => (
//                     <li
//                       key={child.id}
//                       onClick={() => handleCategoryClick(child.id)}
//                       className="pl-8 py-2 hover:bg-gray-100 cursor-pointer"
//                     >
//                       {child.name}
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       {/* Mobile Bottom Nav */}
//       <div className="fixed bottom-0 z-[60] left-0 w-full bg-white shadow-t flex justify-around items-center py-3 md:hidden border-t h-fit">
//         <div
//           onClick={() => navigate("/")}
//           className="text-center text-gray-700"
//         >
//           <FaHome className="mx-auto text-lg mb-1" size={22} />
//           <p className="text-xs">Home</p>
//         </div>

//         <div
//           onClick={() => navigate("/wishlist")}
//           className="text-center text-gray-700 relative"
//         >
//           <FaHeart className="mx-auto text-lg mb-1" size={22} />
//           {wishlistCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
//               {wishlistCount}
//             </span>
//           )}
//           <p className="text-xs">Wishlist</p>
//         </div>

//         <div
//           onClick={() => navigate("/cart")}
//           className="text-center text-gray-700 relative"
//         >
//           <FaShoppingCart className="mx-auto text-lg mb-1" size={22} />
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//           <p className="text-xs">Cart</p>
//         </div>

//         <div
//           onClick={() => navigate("/compare")}
//           className="text-center text-gray-700 relative cursor-pointer"
//         >
//           <MdCompareArrows className="mx-auto text-lg mb-1" size={22} />
//           {compareCount > 0 && (
//             <span className="absolute -top-2 right-0 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
//               {compareCount}
//             </span>
//           )}
//           <p className="text-xs">Compare</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../api/userApi";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
  FaHandsHelping,
  FaShareAlt,
  FaBoxOpen,
  FaUser,
} from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const isLoggedIn = !!JSON.parse(localStorage.getItem("user"))?.userid;

  const handleCategoryClick = (id) => {
    setMenuOpen(false);
    navigate(`/products?category=${encodeURIComponent(id)}`);
  };

  /* ---------- Scroll hide/show ---------- */
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const compare = JSON.parse(localStorage.getItem("compare")) || [];

    setCartCount(cart.reduce((sum, i) => sum + (i.quantity || 1), 0));
    setWishlistCount(wishlist.length);
    setCompareCount(compare.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("storage", updateCounts);
    window.addEventListener("localStorageUpdated", updateCounts);
    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("localStorageUpdated", updateCounts);
    };
  }, []);

  /* ---------- Close profile on outside click ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmed = query.trim();
      if (trimmed) {
        navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      }
    }
  };

  /* ---------- Profile actions ---------- */
  const handleProfileAction = async (action) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.userid) {
      navigate("/profile");
      setProfileOpen(false);
      return;
    }

    switch (action) {
      case "profile":
        navigate("/profile");
        break;
      case "orders":
        navigate("/profile");
        setTimeout(() => {
          window.scrollTo({
            top: window.innerHeight * 0.5,
            behavior: "smooth",
          });
        }, 500);
        break;
      case "wishlist":
        navigate("/wishlist");
        break;
      case "refer":
        if (navigator.share) {
          await navigator.share({
            title: "Check out Unimacc!",
            text: "Explore premium bathroom fittings from Unimacc",
            url: window.location.origin,
          });
        } else {
          navigator.clipboard.writeText(window.location.origin);
          alert("🔗 Link copied!");
        }
        break;
      case "support":
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        break;
      case "signout":
        localStorage.removeItem("user");
        alert("👋 Signed out!");
        navigate("/profile");
        break;
      default:
        break;
    }
    setProfileOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full bg-white border-b-2 py-3 max-sm:py-0 border-primary shadow-sm z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex items-center justify-between px-5 md:px-6 max-sm:py-3">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-xl text-gray-700"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <img
              src="/logo.svg"
              alt="Unimacc Logo"
              className="h-8 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* ===== DESKTOP CATEGORY LIST ===== */}
          <div className="hidden md:flex items-center gap-6">
            <p
              onClick={() => navigate("/products")}
              className="font-medium text-primary/90 cursor-pointer text-sm hover:text-theme"
            >
              All
            </p>
            {!isCategoriesLoading &&
              !isCategoriesError &&
              Object.entries(categories).map(([parent, children]) => (
                <div key={parent} className="relative group">
                  <span
                    onClick={() => handleCategoryClick(children.id)}
                    className="font-medium text-primary/90 cursor-pointer text-sm hover:text-theme"
                  >
                    {parent}
                  </span>

                  {/* Subcategory dropdown */}
                  {children.children.length !== 0 && (
                    <div className="absolute left-0 top-full -translate-y-2 p-3 mt-2 hidden group-hover:flex bg-white shadow-lg gap-2 rounded-md z-50">
                      {children.children.map((child) => (
                        <div
                          key={child.id}
                          onClick={() => handleCategoryClick(child.id)}
                          className="p-4 text-sm min-w-32 rounded-lg text-primary/80 hover:bg-gray-100 w-fit cursor-pointer flex flex-col items-center gap-2"
                        >
                          <img
                            src={child.imagepath}
                            className="w-16 h-16 object-cover rounded-lg"
                            alt={child.name}
                          />
                          <p className="text-xs text-center">{child.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            <div
              className="font-medium text-primary/90 cursor-pointer text-sm hover:text-theme"
              onClick={() => navigate("/offers")}
            >
              offers
            </div>
          </div>

          {/* ===== SEARCH ===== */}
          <div
            className="flex items-center border border-gray-400 rounded-full px-4 py-2 
            w-[28%] max-sm:w-2/5"
          >
            <FaSearch className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* ===== ICONS ===== */}
          <div className="flex items-center space-x-6 max-sm:space-x-0 text-gray-700 text-xl relative">
            <div className="hidden md:block relative">
              <MdCompareArrows
                onClick={() => navigate("/compare")}
                className="cursor-pointer hover:text-orange-500"
              />
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </div>

            <div className="hidden md:block relative">
              <FaHeart
                onClick={() => navigate("/wishlist")}
                className="cursor-pointer hover:text-orange-500"
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>

            <div className="hidden md:block relative">
              <FaShoppingCart
                onClick={() => navigate("/cart")}
                className="cursor-pointer hover:text-orange-500"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <FaUserCircle
                onClick={() => {
                  if (!isLoggedIn) {
                    navigate("/profile");
                    return;
                  }
                  setProfileOpen((prev) => !prev);
                }}
                className="text-orange-500 cursor-pointer text-3xl md:text-2xl"
              />

              {isLoggedIn && profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => handleProfileAction("profile")}
                    className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <FaUser /> Profile
                  </button>
                  <button
                    onClick={() => handleProfileAction("orders")}
                    className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <FaBoxOpen /> Orders
                  </button>
                  <button
                    onClick={() => handleProfileAction("wishlist")}
                    className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <FaHeart /> Wishlist
                  </button>
                  <button
                    onClick={() => handleProfileAction("refer")}
                    className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <FaShareAlt /> Refer
                  </button>
                  <button
                    onClick={() => handleProfileAction("support")}
                    className="flex gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <FaHandsHelping /> Support
                  </button>
                  <button
                    onClick={() => handleProfileAction("signout")}
                    className="flex gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white h-full shadow-lg z-40 transform transition-transform duration-300 pt-20 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <h2 className="text-xl font-bold my-3 px-6">Categories</h2>
        <ul className="text-gray-700">
          <div
            onClick={() => {
              setMenuOpen(false);
              navigate("/products");
            }}
            className="px-6 py-1 font-semibold text-primary bg-gray-50 cursor-pointer"
          >
            All
          </div>
          {isCategoriesLoading ? (
            <li className="px-6 py-3 text-gray-400">Loading...</li>
          ) : isCategoriesError ? (
            <li className="px-6 py-3 text-red-500">Error loading</li>
          ) : !categories || Object.keys(categories).length === 0 ? (
            <li className="px-6 py-3 text-gray-400">No Categories</li>
          ) : (
            Object.entries(categories).map(([parent, children]) => (
              <li key={parent} className="border-b last:border-b-0">
                <div
                  onClick={() => handleCategoryClick(children.id)}
                  className="px-6 py-3 font-semibold text-primary bg-gray-50 cursor-pointer"
                >
                  {parent}
                </div>
                <ul>
                  {children.children.map((child) => (
                    <li
                      key={child.id}
                      onClick={() => handleCategoryClick(child.id)}
                      className="pl-8 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 z-[60] left-0 w-full bg-white shadow-t flex justify-around items-center py-3 md:hidden border-t h-fit">
        <div
          onClick={() => navigate("/")}
          className="text-center text-gray-700"
        >
          <FaHome className="mx-auto text-lg mb-1" size={22} />
          <p className="text-xs">Home</p>
        </div>

        <div
          onClick={() => navigate("/wishlist")}
          className="text-center text-gray-700 relative"
        >
          <FaHeart className="mx-auto text-lg mb-1" size={22} />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <p className="text-xs">Wishlist</p>
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="text-center text-gray-700 relative"
        >
          <FaShoppingCart className="mx-auto text-lg mb-1" size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <p className="text-xs">Cart</p>
        </div>

        <div
          onClick={() => navigate("/compare")}
          className="text-center text-gray-700 relative cursor-pointer"
        >
          <MdCompareArrows className="mx-auto text-lg mb-1" size={22} />
          {compareCount > 0 && (
            <span className="absolute -top-2 right-0 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {compareCount}
            </span>
          )}
          <p className="text-xs">Compare</p>
        </div>
      </div>
    </>
  );
};

export default Header;

