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
    <div className="px-10 grid grid-cols-5 my-10 gap-3 max-sm:gap-0 max-sm:grid-cols-1 max-sm:px-6">
      {/* --- Card 1 (Main Banner) --- */}
      <div
        className="col-span-3 bg-gradient-to-br group from-primary/20 to-primary/70 p-12 max-sm:p-8 rounded-xl min-h-[80vh] flex flex-col justify-evenly max-sm:mb-4 relative overflow-hidden cursor-pointer"
        onClick={() => navigate(`/offers/${getBanner(0).offer_id}`)}
      >
        {getBanner(0).image && (
          <img
            src={getBanner(0).image}
            alt={getBanner(0).title}
            className="absolute inset-0 w-full group-hover:brightness-75 transition-all duration-300 h-full object-cover rounded-xl"
          />
        )}
      </div>

      {/* --- Right Section --- */}
      <section className="col-span-2 h-full max-sm:h-fit flex flex-col gap-3 max-sm:gap-4">
        {/* --- Card 2 --- */}
        <div
          className="w-full relative h-3/5 bg-gradient-to-br group from-primary/20 to-primary/70 p-10 max-sm:p-8 max-sm:h-[30vh] rounded-xl overflow-hidden cursor-pointer"
          onClick={() => navigate(`/offers/${getBanner(1).offer_id}`)}
        >
          {getBanner(1).image && (
            <img
              src={getBanner(1).image}
              alt={getBanner(1).title}
              className="absolute inset-0 w-full group-hover:brightness-75 transition-all duration-300 h-full object-cover rounded-xl"
            />
          )}
        </div>

        {/* --- Card 3 --- */}
        <div
          className="w-full relative group h-2/5 bg-gradient-to-br from-primary/20 to-primary/70 px-8 max-sm:px-6 max-sm:h-[20vh] pt-6 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => navigate(`/offers/${getBanner(2).offer_id}`)}
        >
          {getBanner(2).image && (
            <img
              src={getBanner(2).image}
              alt={getBanner(2).title}
              className="absolute group-hover:brightness-75 transition-all duration-300 inset-0 w-full h-full object-cover rounded-xl"
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default AdBanners;
