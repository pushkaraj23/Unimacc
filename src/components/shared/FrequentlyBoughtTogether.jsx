import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedProducts } from "../../api/userApi";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartDrawer } from "../../context/CartDrawerContext";

const FrequentlyBoughtTogether = ({ id }) => {
  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["frequentlyBoughtTogether", id],
    queryFn: () => fetchRecommendedProducts(id),
    enabled: !!id,
  });

  if (isLoading) return null;
  if (isError || data.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold mb-4 text-primary">
        Frequently Bought Together
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.slice(0, 4).map((product) => (
          <FBTCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FrequentlyBoughtTogether;

/* ================================================= */
/* 🔹 CARD COMPONENT                                 */
/* ================================================= */

const FBTCard = ({ product }) => {
  const navigate = useNavigate();
  const { openCartDrawer } = useCartDrawer();
  const [isInCart, setIsInCart] = useState(false);

  const { id, slug, name, sellingprice, imagepath = [], stocktable } = product;

  const image =
    stocktable?.[0]?.images?.[0] ||
    imagepath?.[0] ||
    "https://cdn-icons-png.flaticon.com/512/679/679821.png";

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setIsInCart(cart.some((item) => item.id === id));
  }, [id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === id);

    let updatedCart;
    if (exists) {
      updatedCart = cart.filter((item) => item.id !== id);
      setIsInCart(false);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      setIsInCart(true);
      openCartDrawer();
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  return (
    <div
      onClick={() => navigate(`/products/${slug || id}`)}
      className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />

      <h3 className="text-sm font-medium text-primary leading-snug truncate">
        {name}
      </h3>

      <div className="flex justify-between items-center mt-2">
        <span className="font-semibold text-theme">
          ₹{Number(sellingprice).toLocaleString()}
        </span>

        <button
          onClick={handleAddToCart}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition ${
            isInCart
              ? "bg-theme text-white border-theme"
              : "border-gray-300 hover:bg-theme hover:text-white"
          }`}
        >
          <FaShoppingCart size={12} />
          {isInCart ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
};
