import { FaPlay } from "react-icons/fa";

const AdBanners = () => {
  return (
    <div className="px-10 grid grid-cols-5 my-10 gap-3">
      {/* Card 1 */}
      <div className="col-span-3 bg-gradient-to-br from-primary/20 to-primary/70 p-12 rounded-xl min-h-[80vh] flex flex-col justify-evenly">
        <h1 className="text-5xl text-primary/60 mb-3 font-light">
          Catch the <span className="font-extrabold text-primary">Hottest</span>{" "}
          deals in <span className="font-extrabold text-primary">Basin</span>{" "}
          Category.
        </h1>
        <img
          className="ml-auto w-3/4 "
          src="/sample/basin.png"
          alt="basin-image"
        />
        <button className="px-8 py-3 shadow-xl w-fit bg-theme text-primary font-semibold hover:bg-mute hover:text-theme transition-colors duration-300">
          Shop Now
        </button>
      </div>
      <section className="col-span-2 h-full flex flex-col gap-3">
        {/* Card 2 */}
        <div className="w-full relative h-3/5 bg-gradient-to-br from-primary/20 to-primary/70 p-10 rounded-xl">
          <h1 className="text-4xl text-primary/60 font-light">
            Reflect{" "}
            <span className="text-primary font-extrabold">Perfection.</span>
          </h1>
          <button className="flex items-center gap-2 text-mute my-1 font-medium hover:text-theme transition-all duration-200">
            View All
            <FaPlay className="text-sm" />
          </button>
          <img
            className="absolute bottom-2 right-2 h-3/4"
            src="/sample/mirror.png"
            alt="mirror-image"
          />
        </div>
        <div className="w-full relative h-2/5 bg-gradient-to-br from-primary/20 to-primary/70 px-8 pt-6 rounded-xl">
          <h1 className="text-4xl text-primary/60 font-light ml-auto w-3/4 text-right">
            Where Comfort{" "}
            <span className="text-primary font-extrabold">Flows.</span>
          </h1>
          <button className="flex items-center gap-2 text-mute my-1 font-medium hover:text-theme transition-all duration-200 ml-auto">
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

export default AdBanners;
