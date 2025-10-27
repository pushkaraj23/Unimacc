import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/products")} className="relative hover:cursor-pointer">
      <section className="relative w-full bg-primary min-h-[30vh] max-sm:min-h-[65vh] my-16 px-16 flex items-center overflow-hidden max-sm:items-start max-sm:py-16">
        <div>
          <h2 className="text-mute/50 uppercase font-light text-2xl">
            Upgrade Your Bathroom.
          </h2>
          <h1 className="text-mute font-extrabold text-6xl">
            Get Up to 25% Off.
          </h1>
          <p className="text-theme font-medium text-lg w-full text-right">
            Style. Function. Quality.
          </p>
        </div>
        {/* Orange Oval */}
        <div className="w-[40vw] h-[40vw] max-sm:w-[100vw] max-sm:h-[100vw] absolute bg-theme rounded-full -right-5 top-16 max-sm:top-[70%]" />
      </section>
      <img
        src="/sample/banner-item.png"
        className="absolute h-[40vh] right-8 max-sm:right-0 -top-[5vh] max-sm:top-[50%]"
        alt="sample-product"
      />
    </div>
  );
};

export default Banner;
