import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CategoryListing = () => {
  const navigate = useNavigate();
  return (
    <div className="px-10 max-sm:px-6 grid grid-cols-2 max-sm:grid-cols-1 my-10 gap-3 min-h-[80vh]">
      <section className="h-full col-span-1 flex flex-col gap-3">
        {/* Card 1 */}
        <div className="w-full relative h-1/2 bg-gradient-to-br from-primary/20 to-primary/70 p-10 rounded-xl hover:shadow-lg hover:scale-[1.01] hover:cursor-pointer transition-all duration-200">
          <h1 className="text-4xl text-primary/60 font-light">
            Reflect{" "}
            <span className="text-primary font-extrabold">Perfection.</span>
          </h1>
          <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-mute my-1 font-medium hover:text-theme transition-all duration-200">
            View All
            <FaPlay className="text-sm" />
          </button>
          <img
            className="absolute bottom-2 right-2 h-3/4"
            src="/sample/mirror.png"
            alt="mirror-image"
          />
        </div>
        {/* Card 2 */}
        <div className="w-full relative h-1/2 bg-gradient-to-br from-primary/20 to-primary/70 p-10 rounded-xl hover:shadow-lg hover:scale-[1.01] hover:cursor-pointer transition-all duration-200">
          <h1 className="text-4xl text-primary/60 font-light">
            Reflect{" "}
            <span className="text-primary font-extrabold">Perfection.</span>
          </h1>
          <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-mute my-1 font-medium hover:text-theme transition-all duration-200">
            View All
            <FaPlay className="text-sm" />
          </button>
          <img
            className="absolute bottom-2 right-2 h-3/4"
            src="/sample/mirror.png"
            alt="mirror-image"
          />
        </div>
      </section>
      <section className="col-span-1 h-full flex flex-col gap-3">
        {/* Card 3 */}
        <div className="w-full relative h-1/2 bg-gradient-to-br from-primary/20 to-primary/70 px-8 pt-6 rounded-xl hover:shadow-lg hover:scale-[1.01] hover:cursor-pointer transition-all duration-200">
          <h1 className="text-4xl text-primary/60 font-light ml-auto w-3/4 text-right">
            Where Comfort{" "}
            <span className="text-primary font-extrabold">Flows.</span>
          </h1>
          <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-mute my-1 font-medium hover:text-theme transition-all duration-200 ml-auto">
            View All
            <FaPlay className="text-sm" />
          </button>
          <img
            className="absolute bottom-0 left-0 h-3/4"
            src="/sample/tap.png"
            alt="mirror-image"
          />
        </div>
        {/* Card 4 */}
        <div className="w-full relative h-1/2 bg-gradient-to-br from-primary/20 to-primary/70 px-8 pt-6 rounded-xl hover:shadow-lg hover:scale-[1.01] hover:cursor-pointer transition-all duration-200">
          <h1 className="text-4xl text-primary/60 font-light ml-auto w-3/4 text-right">
            Where Comfort{" "}
            <span className="text-primary font-extrabold">Flows.</span>
          </h1>
          <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-mute my-1 font-medium hover:text-theme transition-all duration-200 ml-auto">
            View All
            <FaPlay className="text-sm" />
          </button>
          <img
            className="absolute bottom-0 left-0 h-3/4"
            src="/sample/tap.png"
            alt="mirror-image"
          />
        </div>
      </section>
    </div>
  );
};

export default CategoryListing;
