import { useParams } from "react-router-dom";
import data from "../data.json";
import { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import RecommendedProducts from "../components/product/RecommendedProducts";

const DetailedProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selected = data.find((item) => item.id === parseInt(id));
    setProduct(selected);
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-mute h-screen overflow-y-hidden pt-32">
        {/* LEFT SIDEBAR */}
        <aside className="md:w-1/4 w-full flex flex-col gap-6">
          {/* Banner */}
          <div className="relative w-full h-1/2 overflow-hidden rounded-lg">
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

          {/* Latest Products */}
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
                    <p className="text-sm text-gray-400">Cotton T Shirt</p>
                    <h4 className="font-medium text-sm">
                      Basic Slim Fit T-Shirt
                    </h4>
                    <p className="font-semibold text-sm">$199</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN PRODUCT SECTION */}
        <main className="md:w-3/4 w-full flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <div className="w-full lg:w-2/3">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[70vh] rounded-lg mb-3"
            />
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-3 lg:w-1/3">
            <p className="text-sm text-gray-500">
              {product.category} &gt; {product.subCategory}
            </p>
            <h2 className="text-2xl font-semibold">{product.title}</h2>

            {/* Price Section */}
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-black">
                {product.price} Rs
              </p>
              <p className="text-gray-400 line-through text-lg">
                {product.originalPrice} Rs
              </p>
              {product.isDiscountActive && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                  {product.discountPercent}% off
                </span>
              )}
            </div>

            {/* Color Options */}
            <div className="mt-2">
              <p className="text-sm font-medium mb-2">Color</p>
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`color-${i}`}
                    className="w-12 h-12 object-cover border rounded-md cursor-pointer hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-sm font-semibold mb-1">Description</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Crafted from high-grade rust-resistant steel, it ensures
                long-lasting shine and strength even in humid environments. The
                sleek chrome finish complements any modern bathroom decor while
                providing a sturdy hold for towels, robes, or accessories.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-5">
              <button className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm">
                <FaHeart /> Save
              </button>
              <button className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>

            <button className="bg-black text-white py-3 mt-4 rounded-md hover:bg-gray-800 transition font-medium">
              Place Order
            </button>
          </div>
        </main>
      </div>
      <div className="my-10">
        <RecommendedProducts />
      </div>
    </>
  );
};

export default DetailedProductPage;
