import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductCollections,
  fetchCategoryNameById,
} from "../../api/userApi";
import { useState, useEffect } from "react";

const CategoryListing = () => {
  const navigate = useNavigate();

  // 🧩 Fetch product collections
  const {
    data: collections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productCollections"],
    queryFn: fetchProductCollections,
  });

  const [categoryNames, setCategoryNames] = useState({});

  // 🔁 Fetch category names for each collection
  useEffect(() => {
    const loadCategories = async () => {
      if (!collections?.length) return;

      const results = {};
      for (const c of collections) {
        if (c.subcategoryid) {
          const name = await fetchCategoryNameById(c.subcategoryid);
          results[c.subcategoryid] = name;
        }
      }
      setCategoryNames(results);
    };

    loadCategories();
  }, [collections]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-primary/70 text-lg">
        Loading categories...
      </div>
    );
  }

  if (isError || !collections?.length) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-red-500 text-lg">
        Failed to load collections.
      </div>
    );
  }

  return (
    <div className="px-10 max-sm:px-6 grid grid-cols-2 max-sm:grid-cols-1 my-10 gap-3">
      {collections.slice(0, 4).map((item, idx) => {
        const categoryName = categoryNames[item.subcategoryid] || "Products";
        const even = idx % 2 === 0;

        return (
          <div
            key={item.id}
            onClick={() =>
              navigate(`/products?category=${encodeURIComponent(categoryName)}`)
            }
            className={`relative rounded-xl overflow-hidden 
              hover:shadow-lg hover:scale-[1.01] hover:cursor-pointer transition-all duration-300`}
          >
            <img
              src={item.image_url}
              alt={item.name}
              className={`object-cover w-full h-full`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryListing;
