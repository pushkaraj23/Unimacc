import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { fetchProductById } from "../api/userApi";
import RecommendedProducts from "../components/product/RecommendedProducts";

const DetailedProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // ✅ Fetch product using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  const product = data;

  // ✅ Update wishlist/cart state from localStorage
  useEffect(() => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some((item) => item.id === product.id));

    const cartlist = JSON.parse(localStorage.getItem("cart")) || [];
    setIsAdded(cartlist.some((item) => item.id === product.id));
  }, [product]);

  // ✅ Handle Add to Cart
  const handleAddToCart = (placeorder) => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingIndex !== -1) {
      if (!placeorder) {
        updatedCart = existingCart.filter((item) => item.id !== product.id);
        alert("🗑️ Product removed from cart!");
        setIsAdded(false);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("localStorageUpdated"));
      }
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
        },
      ];
      alert("🛒 Product added to cart!");
      setIsAdded(true);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("localStorageUpdated"));
    }

    if (placeorder) navigate("/cart");
  };

  // ✅ Handle Wishlist
  const handleAddToWishlist = () => {
    if (!product) return;

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingIndex = existingWishlist.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex !== -1) {
      const updated = existingWishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(false);
      alert("💔 Removed from wishlist!");
    } else {
      existingWishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      setIsWishlisted(true);
      alert("💖 Added to wishlist!");
    }
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // ✅ Loading & Error States
  if (isLoading) return <p className="text-center py-10">Loading product...</p>;
  if (isError || !product)
    return (
      <p className="text-center py-10 text-red-600">Failed to load product.</p>
    );

  // ✅ Image sources (handle both main + variant images)
  const allImages = [
    ...(product.stocktable?.[0]?.images || []),
  ];

  return (
    <>
      <div className="flex flex-col pt-24 lg:flex-row gap-8 px-5 sm:px-8 md:px-10 lg:px-6 lg:pt-32 bg-mute min-h-screen">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:flex flex-col gap-6 w-1/4">
          <div className="relative w-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1693841114632-bc1c2760bbfd?ixlib=rb-4.1.0&auto=format&fit=crop&w=774&q=80"
              alt="Ad Banner"
              className="rounded-md w-full h-64 object-cover"
            />
            <div className="absolute bottom-3 left-3 text-white text-sm">
              <h3 className="font-semibold">More than water</h3>
              <p>It’s a rejuvenating downpour for your senses</p>
            </div>
          </div>
        </aside>

        {/* MAIN PRODUCT SECTION */}
        <main className="flex flex-col lg:flex-row gap-8 w-full lg:w-3/4">
          {/* PRODUCT IMAGES */}
          <div className="w-full lg:w-2/3">
            <Swiper
              style={{ "--swiper-navigation-color": "#000" }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : undefined}
              modules={[Navigation, Thumbs]}
              className="rounded-lg overflow-hidden"
            >
              {allImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${product.name}-${index}`}
                    className="w-full h-[45vh] sm:h-[60vh] md:h-[65vh] object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Thumbs]}
              className="mt-3"
            >
              {allImages.map((img, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-14 sm:w-16 h-14 sm:h-16 object-cover rounded-md border border-gray-200 hover:border-theme cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="flex flex-col gap-3 lg:w-1/3">
            <p className="text-sm text-primary/70 font-medium">
              {product.category}{" "}
              {product.subcategory && (
                <>
                  / <span className="text-theme">{product.subcategory}</span>
                </>
              )}
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mt-1">
              <p className="text-2xl font-bold text-black">
                ₹{product.sellingprice}
              </p>
              <p className="text-gray-400 line-through text-lg">
                ₹{product.mrp}
              </p>
              {parseFloat(product.mrp) > parseFloat(product.sellingprice) && (
                <span className="bg-theme text-white px-2 py-1 rounded-md text-sm font-medium">
                  {Math.round(
                    ((product.mrp - product.sellingprice) / product.mrp) * 100
                  )}
                  % off
                </span>
              )}
            </div>

            {/* COLOR OPTIONS */}
            {product.stocktable?.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Available Colors</p>
                <div className="flex gap-2 flex-wrap">
                  {product.stocktable.map((stock, i) => (
                    <img
                      key={i}
                      src={stock.color}
                      alt={`color-${i}`}
                      className="w-10 sm:w-12 h-10 sm:h-12 object-cover border rounded-md cursor-pointer hover:scale-105 transition"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="mt-4">
              <p className="text-sm font-semibold mb-1">Description</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-2 mt-5">
              <button
                onClick={() => handleAddToCart(true)}
                className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-theme transition hover:shadow-md font-medium"
              >
                Place Order
              </button>
              <div className="w-full flex justify-between gap-2">
                <button
                  onClick={handleAddToWishlist}
                  className={`flex items-center w-2/5 justify-center gap-2 border font-medium border-primary/75 px-4 py-3 rounded-md text-sm transition-all ${
                    isWishlisted
                      ? "bg-theme text-white shadow-md"
                      : "hover:text-theme hover:shadow-md"
                  }`}
                >
                  <FaHeart /> {isWishlisted ? "Wishlisted" : "Save"}
                </button>

                <button
                  onClick={() => handleAddToCart(false)}
                  className={`flex items-center justify-center gap-2 border w-3/5 border-primary/75 font-medium px-4 py-3 rounded-md text-sm transition-all ${
                    isAdded
                      ? "text-theme shadow-lg"
                      : "hover:text-theme hover:shadow-md"
                  }`}
                >
                  <FaShoppingCart /> {isAdded ? "Already Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Recommended Products */}
      <div className="mb-10">
        <RecommendedProducts id={id} />
      </div>
    </>
  );
};

export default DetailedProductPage;
