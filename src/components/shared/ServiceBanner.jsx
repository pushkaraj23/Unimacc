import { FaTruck, FaHandHoldingUsd, FaBoxOpen } from "react-icons/fa";

const ServiceBanner = () => {
  return (
    <section className="bg-gradient-to-br from-mute to-theme text-primary shadow-md py-4 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-6 text-sm sm:text-base font-medium text-center">
        {/* COD */}
        <div className="flex items-center gap-3">
          <FaHandHoldingUsd className="text-primary text-xl" />
          <span>Free COD Available</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center gap-3">
          <FaTruck className="text-primary text-xl" />
          <span>Free Shipping Above ₹1198</span>
        </div>

        {/* Return */}
        <div className="flex items-center gap-3">
          <FaBoxOpen className="text-primary text-xl" />
          <span>Easy 7-Day Return</span>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;
