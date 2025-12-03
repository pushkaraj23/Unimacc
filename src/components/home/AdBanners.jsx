import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPromotions } from "../../api/userApi";

const AdBanners = () => {
  const navigate = useNavigate();

  // 🔹 Fetch promotions using React Query (v5 syntax)
  const {
    data: promotions,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["promotions"],
    queryFn: fetchPromotions,
  });

  // 🔹 Loading and error states
  if (isPending)
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        Loading banners...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-[50vh] text-red-500">
        Failed to load promotions.
      </div>
    );

  // 🔹 Ensure valid data (first 3 active promotions)
  const banners = (promotions || [])
    .filter((p) => p.is_active)
    .slice(0, 3)
    .map((promo) => ({
      ...promo,
      image: JSON.parse(promo.banner_images || "[]")[0] || "",
    }));

  // Defensive: fallback if not enough banners
  const getBanner = (index) => banners[index] || {};

  return (
    <div className="grid grid-cols-3 gap-5 px-5 max-sm:grid-cols-1 my-12">
      {/* --- Card 1 (Main Banner) --- */}
      <div
        className="col-span-2 max-sm:col-span-1 flex flex-col justify-center"
        // onClick={() => navigate(`/offers/${getBanner(0).offer_id}`)}
        onClick={() => navigate("/products")}
      >
        {getBanner(0).image && (
          <img
            src={getBanner(0).image}
            alt={getBanner(0).title}
            className="rounded-3xl"
          />
        )}
      </div>
      {/* --- Right Section --- */}
      <section className="flex flex-col justify-center gap-5 col-span-1">
        {/* --- Card 2 --- */}
        <div
          className=""
          onClick={() => navigate(`/products`)}
        >
          {getBanner(1).image && (
            <img
              src={getBanner(1).image}
              alt={getBanner(1).title}
              className="rounded-3xl"
            />
          )}
        </div>

        {/* --- Card 3 --- */}
        <div
          className=""
          // onClick={() => navigate(`/offers/${getBanner(2).offer_id}`)}
          onClick={() => navigate("/products")}
        >
          {getBanner(2).image && (
            <img
              src={getBanner(2).image}
              alt={getBanner(2).title}
              className="rounded-3xl"
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default AdBanners;
