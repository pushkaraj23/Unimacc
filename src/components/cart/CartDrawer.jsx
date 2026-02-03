import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { fetchRecommendedProducts } from "../../api/userApi";

const CART_STORAGE_KEY = "cart";

const CartDrawer = () => {
  const navigate = useNavigate();
  const { isCartDrawerOpen, closeCartDrawer } = useCartDrawer();
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    setCart(saved);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("localStorageUpdated", loadCart);
    window.addEventListener("storage", loadCart);
    return () => {
      window.removeEventListener("localStorageUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.sellingprice || 0) * (item.quantity || 1),
    0
  );
  const savings = cart.reduce((acc, item) => {
    const mrp = parseFloat(item.mrp || 0);
    const sell = parseFloat(item.sellingprice || 0);
    const qty = item.quantity || 1;
    return acc + Math.max(0, mrp - sell) * qty;
  }, 0);
  const estimatedTotal = subtotal;
  const cartCount = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);

  const updateQuantity = (productId, variantId, delta) => {
    const updatedCart = cart.map((item) => {
      const match =
        item.id === productId &&
        (variantId != null
          ? item.stocktable?.[0]?.id === variantId
          : true);
      if (!match) return item;
      const maxStock = item.stocktable?.[0]?.quantity ?? 99;
      const currentQty = item.quantity || 1;
      let newQty = currentQty + delta;
      if (newQty < 1) newQty = 1;
      if (newQty > maxStock) newQty = maxStock;
      return { ...item, quantity: newQty };
    });
    setCart(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const removeItem = (productId, variantId) => {
    const updatedCart = cart.filter((item) => {
      if (item.id !== productId) return true;
      if (variantId != null && item.stocktable?.[0]?.id !== variantId)
        return true;
      return false;
    });
    setCart(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const handleCheckout = () => {
    closeCartDrawer();
    navigate("/checkout");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeCartDrawer();
  };

  if (!isCartDrawerOpen) return null;

  return (
    <>
      <div
        role="presentation"
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300"
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col rounded-l-2xl overflow-hidden transition-transform duration-300 ease-out ${
          isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-bold text-primary">
            YOUR CART ({cartCount})
          </h2>
          <button
            type="button"
            onClick={closeCartDrawer}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            aria-label="Close cart"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {cart.length === 0 ? (
            <div className="px-5 py-10 text-center text-gray-500">
              <p className="mb-4">Your cart is empty.</p>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  navigate("/products");
                }}
                className="text-theme font-medium hover:underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="px-5 py-4 space-y-4">
                {cart.map((item) => {
                  const variantId = item.stocktable?.[0]?.id;
                  const image =
                    item.stocktable?.[0]?.color ||
                    item.stocktable?.[0]?.images?.[0] ||
                    item.thumbnailimage ||
                    "https://cdn-icons-png.flaticon.com/512/679/679821.png";
                  const maxStock = item.stocktable?.[0]?.quantity || 99;

                  return (
                    <div
                      key={`${item.id}-${variantId ?? "n"}`}
                      className="flex gap-3 pb-4 border-b border-gray-100 last:border-0"
                    >
                      <img
                        src={image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover shrink-0 border border-gray-100 cursor-pointer"
                        onClick={() => {
                          closeCartDrawer();
                          navigate(`/products/${item.id}`);
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm font-medium text-primary line-clamp-2 cursor-pointer hover:text-theme"
                          onClick={() => {
                            closeCartDrawer();
                            navigate(`/products/${item.id}`);
                          }}
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-primary mt-1">
                          ₹{Number(item.sellingprice).toLocaleString()}
                          {item.mrp && (
                            <span className="text-gray-400 line-through ml-1 text-xs">
                              ₹{Number(item.mrp).toLocaleString()}
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border rounded-full overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, variantId, -1)
                              }
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 text-sm font-medium min-w-[1.5rem] text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, variantId, 1)
                              }
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id, variantId)}
                            className="text-red-500 hover:text-red-600 p-1"
                            aria-label="Remove item"
                          >
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Offers */}
              <div className="px-5 py-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-primary mb-3">
                  Other offers you can apply
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-primary">
                      Save more with coupons
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      +1 more offers
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeCartDrawer();
                      navigate("/offers");
                    }}
                    className="text-sm font-medium text-theme hover:underline shrink-0"
                  >
                    View all coupons →
                  </button>
                </div>
              </div>

              {/* Related products */}
              {cart.length > 0 && (
                <CartDrawerRelated productId={cart[0].id} onNavigate={closeCartDrawer} />
              )}
            </>
          )}
        </div>

        {/* Footer: total + checkout */}
        {cart.length > 0 && (
          <div className="shrink-0 border-t border-gray-200 bg-white px-5 py-4">
            {savings > 0 && (
              <p className="text-sm text-green-600 font-medium mb-1">
                You saved ₹{savings.toLocaleString()}!
              </p>
            )}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                Estimated total
              </span>
              <span className="text-lg font-bold text-primary">
                ₹{estimatedTotal.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Checkout
            </button>
            <button
              type="button"
              onClick={() => {
                closeCartDrawer();
                navigate("/cart");
              }}
              className="w-full mt-2 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-gray-50"
            >
              View full cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

function CartDrawerRelated({ productId, onNavigate }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("offers");

  const { data: recommended = [], isLoading } = useQuery({
    queryKey: ["cartDrawerRecommended", productId],
    queryFn: () => fetchRecommendedProducts(productId),
    enabled: !!productId,
  });

  const products = recommended.slice(0, 3);

  if (isLoading || products.length === 0) return null;

  return (
    <div className="px-5 py-4 border-t border-gray-100">
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setActiveTab("offers")}
          className={`text-sm font-medium px-3 py-1.5 rounded-full ${
            activeTab === "offers"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Best offers
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bonus")}
          className={`text-sm font-medium px-3 py-1.5 rounded-full ${
            activeTab === "bonus"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Bonus Buys
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {products.map((product) => {
          const img =
            product.stocktable?.[0]?.images?.[0] ||
            product.imagepath?.[0] ||
            "https://cdn-icons-png.flaticon.com/512/679/679821.png";
          const discount =
            product.discountpercent > 0 ? `${product.discountpercent}% OFF` : null;
          return (
            <div
              key={product.id}
              onClick={() => {
                onNavigate();
                navigate(`/products/${product.id}`);
              }}
              className="shrink-0 w-28 cursor-pointer group"
            >
              <div className="relative rounded-lg overflow-hidden border border-gray-100">
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-24 object-cover group-hover:opacity-90"
                />
                {discount && (
                  <span className="absolute top-1 left-1 bg-theme text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {discount}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-primary mt-1 line-clamp-2">
                {product.name}
              </p>
              <p className="text-xs font-semibold text-theme">
                ₹{Number(product.sellingprice || 0).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CartDrawer;
