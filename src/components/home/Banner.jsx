import React from "react";

const Banner = () => {
  return (
    <div className="relative">
      <section className="relative w-full bg-primary min-h-[30vh] my-16 px-16 flex items-center overflow-hidden">
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
        <div className="w-[40vw] h-[40vw] absolute bg-theme rounded-full -right-5 top-12" />
      </section>
      <img src="/sample/banner-item.png" className="absolute h-[40vh] right-8 -top-[5vh]" alt="sample-product" />
    </div>
  );
};

export default Banner;
