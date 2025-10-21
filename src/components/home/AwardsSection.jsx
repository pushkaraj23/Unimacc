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
    <section className="py-12 px-4 sm:px-8 md:px-16 text-center">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-8">
        Awards & Accolades
      </h2>

      {/* Awards Row */}
      <div className="flex flex-wrap justify-center pb-5 gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
        {awards.map((award, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-[#F8F6ED] rounded-full px-5 py-3 min-w-[260px] sm:min-w-[300px] shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={award.img}
              alt={award.title}
              className="w-10 h-10 object-contain rounded-full"
            />
            <p className="text-sm sm:text-base font-medium text-primary/90 text-left">
              {award.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;
