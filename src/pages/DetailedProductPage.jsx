import { useParams, useNavigate } from "react-router-dom";
import data from "../data.json";
import { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import RecommendedProducts from "../components/product/RecommendedProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const DetailedProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const selected = data.find((item) => item.id === parseInt(id));
    setProduct(selected);

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some((item) => item.id === parseInt(id)));

    const cartlist = JSON.parse(localStorage.getItem("cart")) || [];
    setIsAdded(cartlist.some((item) => item.id === parseInt(id)));
  }, [id]);

  const handleAddToCart = (placeorder) => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = existingCart.filter((item) => item.id !== product.id);
      alert("🗑️ Product removed from cart!");
      setIsAdded(false);
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
      alert("🛒 Product added to cart!");
      setIsAdded(true);
    }

    if (placeorder) navigate("/cart");

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

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

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <>
      <div className="flex flex-col pt-24 lg:flex-row gap-8 px-5 sm:px-8 md:px-10 lg:px-6 lg:pt-32 bg-mute min-h-screen">
        {/* LEFT SIDEBAR (Hidden on mobile) */}
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

          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Latest Products
            </h3>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((p) => (
                <div key={p} className="flex gap-3 items-center">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <p className="text-sm text-gray-400">Bathroom Series</p>
                    <h4 className="font-medium text-sm">Rain Shower Head</h4>
                    <p className="font-semibold text-sm text-primary">₹2,499</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN SECTION */}
        <main className="flex flex-col lg:flex-row gap-8 w-full lg:w-3/4">
          {/* Product Image Section */}
          <div className="w-full lg:w-2/3">
            <Swiper
              style={{
                "--swiper-navigation-color": "#000",
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="rounded-lg overflow-hidden"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${product.title}-${index}`}
                    className="w-full h-[40vh] sm:h-[55vh] md:h-[65vh] object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Thumbs]}
              className="mt-3"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-14 sm:w-16 h-14 sm:h-16 object-cover rounded-md border border-gray-200 hover:border-theme transition-all duration-200 cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-3 lg:w-1/3">
            <p className="text-sm text-primary/70 font-medium">
              {product.category} /{" "}
              <span className="text-theme">{product.subCategory}</span>
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold">
              {product.title}
            </h2>

            <div className="flex items-center gap-3 mt-1">
              <p className="text-2xl font-bold text-black">₹{product.price}</p>
              <p className="text-gray-400 line-through text-lg">
                ₹{product.originalPrice}
              </p>
              {product.isDiscountActive && (
                <span className="bg-theme text-white px-2 py-1 rounded-md text-sm font-medium">
                  {product.discountPercent}% off
                </span>
              )}
            </div>

            {/* Colors */}
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Available Colors</p>
              <div className="flex gap-2 flex-wrap">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`color-${i}`}
                    className="w-10 sm:w-12 h-10 sm:h-12 object-cover border rounded-md cursor-pointer hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-sm font-semibold mb-1">Description</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 mt-5">
              <button
                onClick={handleAddToWishlist}
                className={`flex items-center justify-center gap-2 border font-medium border-primary/75 px-4 py-2 rounded-md text-sm transition-all ${
                  isWishlisted
                    ? "bg-theme text-white shadow-md"
                    : "hover:text-theme hover:shadow-md"
                }`}
              >
                <FaHeart /> {isWishlisted ? "Wishlisted" : "Save"}
              </button>

              <button
                onClick={() => handleAddToCart(false)}
                className={`flex items-center justify-center gap-2 border border-primary/75 font-medium px-4 py-2 rounded-md text-sm transition-all ${
                  isAdded
                    ? "text-theme shadow-lg"
                    : "hover:text-theme hover:shadow-md"
                }`}
              >
                <FaShoppingCart /> {isAdded ? "Already Added" : "Add to Cart"}
              </button>

              <button
                onClick={() => handleAddToCart(true)}
                className="w-full sm:w-auto bg-primary text-white py-3 px-6 rounded-md hover:bg-theme transition hover:shadow-md font-medium"
              >
                Place Order
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Ad & Recommended Products (Visible on Mobile) */}
      <div className="block lg:hidden px-5 mt-16">
        <div className="relative w-full h-72 overflow-hidden rounded-lg mb-8">
          <img
            src="https://images.unsplash.com/photo-1693841114632-bc1c2760bbfd?ixlib=rb-4.1.0&auto=format&fit=crop&w=774&q=80"
            alt="Ad Banner"
            className="rounded-md w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 text-white text-sm">
            <h3 className="font-semibold">More than water</h3>
            <p>It’s a rejuvenating downpour for your senses</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <RecommendedProducts />
      </div>
    </>
  );
};

export default DetailedProductPage;
