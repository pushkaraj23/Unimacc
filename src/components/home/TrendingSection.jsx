import { FaPlay } from "react-icons/fa";
import ItemCard from "../shared/ItemCard";
import products from "../../data.json"

const TrendingSection = () => {
  return (
    <div className="px-10 mt-20 mb-20">
      {/* --- Header Section --- */}
      <section className="border-b-2 border-primary/60 py-2 mb-5 flex pr-2 justify-between items-center">
        <h1 className="text-3xl text-primary font-normal">Trending Products</h1>
        <div className="flex gap-5">
          {/* {["85% off", "65% off", "50% off"].map((deal, i) => (
            <button
              key={i}
              className="px-5 py-3 hover:bg-theme/90 bg-theme/10 text-primary font-medium transition-all duration-200 rounded-lg hover:font-semibold"
            >
              {deal}
            </button>
          ))} */}
          <button className="flex items-center gap-2 text-primary font-medium hover:text-theme transition-all duration-200">
            View All
            <FaPlay className="text-sm" />
          </button>
        </div>
      </section>
      <section className="grid grid-cols-5 gap-4 mt-8 gap-y-6">
        {products.map((item, index) => (
          <ItemCard key={index} {...item} />
        ))}
      </section>
    </div>
  );
};

export default TrendingSection;
