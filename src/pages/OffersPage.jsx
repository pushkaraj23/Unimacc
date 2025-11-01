import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDiscountById, fetchProducts } from "../api/userApi";
import ItemCard from "../components/shared/ItemCard";

const OffersPage = () => {
  const { id } = useParams(); // 🔹 e.g. /offers/5

  // 🔹 Fetch offer details
  const {
    data: offer,
    isPending: isOfferLoading,
    isError: isOfferError,
  } = useQuery({
    queryKey: ["offer", id],
    queryFn: () => fetchDiscountById(id),
    enabled: !!id,
  });

  // 🔹 Fetch all products
  const {
    data: products,
    isPending: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // 🔹 Filter products linked to this offer
  const filteredProducts =
    products?.filter(
      (p) =>
        Array.isArray(p.discounts_ids) && p.discounts_ids.includes(Number(id))
    ) || [];

  if (isOfferLoading || isProductsLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading offer details...
      </div>
    );
  }

  console.log(filteredProducts)

  if (isOfferError || isProductsError) {
    return (
      <div className="text-center text-red-600 py-10">
        Failed to load offer details.
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="text-center text-gray-600 py-10">
        Offer not found or inactive.
      </div>
    );
  }

  return (
    <section className="px-5 md:px-10 py-10 pt-24 md:pt-32">
      {/* --- Offer Title --- */}
      <div className="flex items-center justify-between border-b-2 border-primary/60 pb-2 mb-8">
        <h1 className="text-2xl sm:text-3xl font-medium text-primary">
          {offer.code || "Offer"}
        </h1>
        {offer.description && (
          <p className="text-primary/70 italic">{offer.description}</p>
        )}
      </div>

      {/* --- Offer Period --- */}
      <p className="text-sm text-gray-500 mb-6">
        Valid from{" "}
        <span className="font-medium text-primary">
          {new Date(offer.startdate).toLocaleDateString()}
        </span>{" "}
        to{" "}
        <span className="font-medium text-primary">
          {new Date(offer.enddate).toLocaleDateString()}
        </span>
      </p>

      {/* --- Products --- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {filteredProducts.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 py-10">
          No products available under this offer.
        </div>
      )}
    </section>
  );
};

export default OffersPage;
