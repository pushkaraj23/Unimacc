import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { fetchProductById, fetchProducts } from "../api/userApi";
import RecommendedProducts from "../components/product/RecommendedProducts";

const DetailedProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // ✅ Fetch product
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  const [tempMessage, setTempMessage] = useState("");
  const showTempMessage = (msg) => {
    setTempMessage(msg);
    setTimeout(() => setTempMessage(""), 3000);
  };

  const product = data;

  const {
    data: allProducts,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchProducts,
  });

  // ✅ Filter only featured products
  const featuredProducts =
    allProducts?.filter((p) => p.isfeatured === true) || [];

  // ✅ Initialize selected variant (first one)
  // ✅ Reset Swiper + Variant when product changes
  useEffect(() => {
    if (product?.stocktable?.length > 0) {
      setSelectedVariant(product.stocktable[0]);
    }
  }, [id, product]); // runs every time you navigate to a new product

  // ✅ Wishlist / Cart status
  useEffect(() => {
    if (!product || !selectedVariant) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isInWishlist = wishlist.some(
      (item) =>
        item.id === product.id &&
        item.stocktable?.[0]?.id === selectedVariant.id
    );
    setIsWishlisted(isInWishlist);

    const cartlist = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cartlist.some(
      (item) =>
        item.id === product.id &&
        item.stocktable?.[0]?.id === selectedVariant.id
    );
    setIsAdded(isInCart);
  }, [product, selectedVariant]);

  // ✅ Handle Add to Cart
  const handleAddToCart = (placeorder) => {
    if (!product || !selectedVariant) return;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if this exact variant already exists
    const existingIndex = existingCart.findIndex(
      (item) =>
        item.id === product.id &&
        item.stocktable?.[0]?.id === selectedVariant.id
    );

    let updatedCart;

    // Prepare product with only the selected variant
    const productToStore = {
      ...product,
      stocktable: [selectedVariant],
    };

    if (existingIndex !== -1) {
      // Variant already in cart → remove it if not placing order
      if (!placeorder) {
        updatedCart = existingCart.filter(
          (item) =>
            !(
              item.id === product.id &&
              item.stocktable?.[0]?.id === selectedVariant.id
            )
        );
        showTempMessage("🗑️ Variant removed from cart");
        setIsAdded(false);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("localStorageUpdated"));
      }
    } else {
      // Add new variant
      updatedCart = [...existingCart, productToStore];
      showTempMessage("🛒 Variant added to cart!");
      setIsAdded(true);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("localStorageUpdated"));
    }

    if (placeorder) navigate("/cart");
  };

  // ✅ Handle Wishlist
  const handleAddToWishlist = () => {
    if (!product || !selectedVariant) return;

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if this variant already exists
    const existingIndex = existingWishlist.findIndex(
      (item) =>
        item.id === product.id &&
        item.stocktable?.[0]?.id === selectedVariant.id
    );

    const productToStore = {
      ...product,
      stocktable: [selectedVariant],
    };

    if (existingIndex !== -1) {
      // Remove that exact variant only
      const updated = existingWishlist.filter(
        (item) =>
          !(
            item.id === product.id &&
            item.stocktable?.[0]?.id === selectedVariant.id
          )
      );
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(false);
      showTempMessage("💔 Removed from wishlist!");
    } else {
      // Add that specific variant
      existingWishlist.push(productToStore);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      setIsWishlisted(true);
      showTempMessage("💖 Added to wishlist!");
    }

    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // ✅ Handle Variant Change
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setThumbsSwiper(null); // reset thumbnails to avoid stale refs
  };

  // ✅ Image list from selected variant
  const allImages = selectedVariant?.images?.length
    ? selectedVariant.images
    : product?.imagepath || [];

  // ✅ Loading and Error States
  if (isLoading)
    return (
      <p className="text-center py-10 text-primary/70">Loading product...</p>
    );

  if (isError || !product)
    return (
      <p className="text-center py-10 text-red-600">Failed to load product.</p>
    );

  return (
    <>
      <div className="grid grid-cols-7 items-start pt-24 md:pt-20 md:mt-2 max-sm:grid-cols-1 gap-5 px-5 lg:px-6 bg-mute pb-8">
        {/* LEFT AD SECTION */}
        <aside className="hidden lg:flex sticky top-5 flex-col gap-6 col-span-2">
          <article className="relative w-full overflow-hidden rounded-lg">
            <img
              src="/sample/products_banner.png"
              alt="Ad Banner"
              className="rounded-md w-full h-auto"
            />
          </article>
          <div className="relative h-[53vh] w-full">
            {/* Scrollable content */}
            <article className="overflow-y-scroll space-y-2 no-scrollbar h-full pb-8">
              {isLoadingProducts && (
                <div className="w-full h-full flex justify-center items-center"></div>
              )}
              {featuredProducts.map((item, index) => (
                <div
                  onClick={() => navigate(`/products/${item.id}`)}
                  key={index}
                  className="w-full bg-white/80 shadow-sm hover:cursor-pointer rounded-lg p-2 flex gap-2 items-center"
                >
                  <img
                    src={item.thumbnailimage}
                    className="h-16 min-w-16 max-w-16 rounded-lg"
                    alt={item.name}
                  />
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {item.name}
                    </p>
                    <p className="text-xs font-semibold text-theme mt-1">
                      ₹{item.sellingprice}
                    </p>
                  </div>
                </div>
              ))}
            </article>

            {/* Fixed gradient overlay (does NOT scroll) */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-mute to-mute/0" />
          </div>
        </aside>

        {/* MAIN SECTION */}
        <main className="flex flex-col items-center lg:sticky top-5 col-span-3 lg:flex-row gap-4 w-full">
          {/* PRODUCT IMAGES */}
          <div className="relative w-full h-auto rounded-lg flex items-center justify-center overflow-hidden border">
            <img
              src={allImages[activeImageIndex]}
              alt="product"
              className="w-full h-full object-contain object-top transition-all duration-300"
            />

            {/* Prev Button */}
            {allImages.length > 1 && (
              <button
                onClick={() =>
                  setActiveImageIndex(
                    activeImageIndex === 0
                      ? allImages.length - 1
                      : activeImageIndex - 1
                  )
                }
                className="absolute left-3 top-1/2 w-10 h-10 -translate-y-1/2 bg-black/50 text-white text-2xl rounded-full"
              >
                ‹
              </button>
            )}

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                onClick={() =>
                  setActiveImageIndex(
                    activeImageIndex === allImages.length - 1
                      ? 0
                      : activeImageIndex + 1
                  )
                }
                className="absolute right-3 top-1/2 w-10 h-10 -translate-y-1/2 bg-black/50 text-white text-2xl rounded-full"
              >
                ›
              </button>
            )}
          </div>
          {/* THUMBNAIL IMAGES */}
          <div className="flex md:flex-col gap-2 mt-3 overflow-x-auto no-scrollbar">
            {allImages.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImageIndex(index)}
                className={`
        w-14 sm:w-16 h-14 sm:h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-300 
        ${
          activeImageIndex === index
            ? "border-theme brightness-100" // selected
            : "border-gray-300 brightness-50 hover:brightness-75 hover:border-theme" // unselected
        }
      `}
                alt={`thumb-${index}`}
              />
            ))}
          </div>
        </main>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-3 col-span-2 max-sm:col-span-3 sticky top-5">
          <p className="text-sm text-primary/70 font-medium">
            {product.category}
            {product.subcategory && (
              <>
                {" / "}
                <span className="text-theme">{product.subcategory}</span>
              </>
            )}
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold">{product.name}</h2>

          <div className="flex items-center gap-3 mt-1">
            <p className="text-2xl font-bold text-black">
              ₹{product.sellingprice}
            </p>
            <p className="text-gray-400 line-through text-lg">₹{product.mrp}</p>
            {parseFloat(product.mrp) > parseFloat(product.sellingprice) && (
              <span className="bg-theme text-white px-2 py-1 rounded-md text-sm font-medium">
                {Math.round(
                  ((product.mrp - product.sellingprice) / product.mrp) * 100
                )}
                % off
              </span>
            )}
          </div>

          {/* VARIANT COLORS */}
          {product.stocktable?.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Available Colors</p>
              <div className="flex gap-2 flex-wrap">
                {product.stocktable.map((variant, i) => (
                  <img
                    key={i}
                    src={variant.color}
                    alt={`color-${i}`}
                    className={`w-10 sm:w-12 h-10 sm:h-12 object-cover border-2 rounded-md cursor-pointer transition 
                        ${
                          selectedVariant?.id === variant.id
                            ? "border-theme scale-110"
                            : "border-gray-300 hover:border-theme/70"
                        }`}
                    onClick={() => handleVariantSelect(variant)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          <div className="mt-4">
            <p className="text-sm font-semibold mb-1">Description</p>

            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
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
        {tempMessage && (
          <div className="fixed top-28 right-5 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg opacity-90 animate-fade z-50">
            {tempMessage}
          </div>
        )}
      </div>

      {/* Recommended Products */}
      <div className="mb-10">
        <RecommendedProducts id={id} />
      </div>
    </>
  );
};

export default DetailedProductPage;
