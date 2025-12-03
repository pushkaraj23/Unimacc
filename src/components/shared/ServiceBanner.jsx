import { FaTruck, FaHandHoldingUsd, FaBoxOpen } from "react-icons/fa";

const ServiceBanner = () => {
  const services = [
    {
      icon: <FaHandHoldingUsd className="text-white text-2xl sm:text-3xl" />,
      text: "Free COD Available",
    },
    {
      icon: <FaBoxOpen className="text-white text-2xl sm:text-3xl" />,
      text: "Easy 7-Day Return",
    },
    {
      icon: <FaTruck className="text-white text-2xl sm:text-3xl" />,
      text: "Fast Delivery Across India",
    },
    {
      icon: <FaHandHoldingUsd className="text-white text-2xl sm:text-3xl" />,
      text: "Secure Payment Gateway",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-theme to-mute text-primary py-4 shadow-inner">
      <div className="flex whitespace-nowrap animate-scroll">
        {/* Duplicate the content for seamless looping */}
        {[...Array(2)].map((_, loopIndex) => (
          <div key={loopIndex} className="flex items-center justify-center">
            {services.map((service, index) => (
              <div
                key={index + "-" + loopIndex}
                className="flex items-center gap-3 mx-8 sm:mx-16 text-sm sm:text-base font-medium"
              >
                {service.icon}
                <span className="text-primary` whitespace-nowrap">
                  {service.text}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient Fade on sides */}
      <div className="absolute top-0 left-0 w-32 max-sm:w-16 h-full bg-gradient-to-r from-mute via-mute/80 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 max-sm:w-16 h-full bg-gradient-to-l from-mute via-mute/80 to-transparent pointer-events-none"></div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 25s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
};

export default ServiceBanner;
