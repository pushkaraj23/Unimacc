import React from "react";

const marketplaces = [
  {
    name: "Amazon",
    logo: "/amazon.png",
    url: "https://www.amazon.in/stores/UNIMACC/page/EDA81712-9FDE-477B-B27A-32F02B3C25A2",
  },
  {
    name: "Flipkart",
    logo: "/flipkart.png",
    url: "https://www.flipkart.com/unimacc-sss-shower-head-bathroom-overhead-shower-3-round-9-arm/p/itm173dbc10d0c86",
  },
  {
    name: "Meesho",
    logo: "/meesho.png",
    url: "https://www.meesho.com/OrganizersandStorage?ms=2",
  },
];

const FindUsOn = ({
  title = "Find us on",
  subtitle = "Available on leading marketplaces",
}) => {
  return (
    <section className="w-full py-14 mb-16 px-6 md:px-10">
      {/* Heading */}
      <div className="text-center mb-3">
        <h3 className="text-2xl text-primary/70 font-light">{title}</h3>
      </div>

      {/* Marketplace Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {marketplaces.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center justify-center
              w-44 h-24
              bg-white border border-primary/20
              rounded-xl shadow-sm
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
            "
          >
            <img
              src={item.logo}
              alt={item.name}
              className="
                h-12 object-contain
                grayscale opacity-70
                transition-all duration-300
                group-hover:grayscale-0 group-hover:opacity-100
              "
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default FindUsOn;
