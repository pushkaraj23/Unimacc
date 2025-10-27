const AwardsSection = () => {
  const awards = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/3004/3004613.png",
      title: "Start-up of the Year 2022 – TiE Con Chennai",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Inc42_logo.svg/2560px-Inc42_logo.svg.png",
      title: "India’s Top 10 Fastest Growing D2C Brands",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3003/3003035.png",
      title: "FICCI - Best Ecommerce Startup of the Year 2021",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
      title: "Winners at the e4m D2C Revolution Awards 2022",
    },
  ];

  return (
    <section className="pb-24 px-6 sm:px-10 md:px-20 bg-mute relative overflow-hidden">
      {/* subtle background gradient blob */}
      {/* <div className="absolute -top-20 right-0 w-72 h-72 bg-theme/20 blur-3xl rounded-full opacity-30 animate-pulse"></div> */}
      {/* <div className="absolute -bottom-20 left-0 w-64 h-64 bg-theme/10 blur-3xl rounded-full opacity-20"></div> */}

      {/* Section Title */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary relative inline-block">
          Awards & Accolades
          <span className="block w-24 h-1 bg-theme mx-auto mt-2 rounded-full"></span>
        </h2>
        <p className="text-primary/60 mt-3 text-sm sm:text-base">
          Recognizing our journey of innovation, excellence, and trust.
        </p>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center relative z-10">
        {awards.map((award, index) => (
          <div
            key={index}
            className="group relative bg-white/90 border border-theme/30 hover:border-theme/80 rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-theme/30"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-theme/10 flex items-center justify-center rounded-full mb-4 group-hover:bg-theme/20 transition-all">
              <img
                src={award.img}
                alt={award.title}
                className="w-8 h-8 object-contain opacity-90 group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Title */}
            <p className="text-primary text-sm sm:text-base font-semibold leading-snug">
              {award.title}
            </p>

            {/* Glow border effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-theme/0 group-hover:border-theme/60 transition-all duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;
