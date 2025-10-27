import { useState } from "react";
import { Mail } from "lucide-react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

const Footer = () => {
  const [hovered, setHovered] = useState("");

  const socialIcons = [
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebookF /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "github", icon: <FaGithub /> },
  ];

  return (
    <footer className="w-full relative pt-12 px-10 max-sm:px-6 bg-[#e2e1e1] font-urbanist z-40">
      {/* Newsletter Section */}
      <section className="bg-gradient-to-tl from-primary to-theme w-full rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between py-6 px-8 lg:text-left">
        <h1 className="text-white text-4xl leading-snug font-normal">
          Stay Up to Date With Our Latest Offers
        </h1>
        <div className="w-full lg:w-[30vw] mt-6 lg:mt-0">
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full">
            <Mail className="text-gray-400 h-4 lg:h-5" />
            <input
              type="text"
              placeholder="Enter Your Email Address..."
              className="bg-transparent outline-none text-[3vw] py-[1.5vw] lg:py-0 lg:text-[1vw] text-black/60 ml-2 w-full placeholder-gray-400"
            />
          </div>
          <button className="w-full bg-white rounded-full py-[3vw] lg:py-[.5vw] text-[3.3vw] lg:text-[1.1vw] font-semibold mt-4 hover:bg-gray-100 transition">
            Subscribe to Newsletter
          </button>
        </div>
      </section>

      {/* Main Footer Links */}
      <section className="w-full flex flex-col lg:flex-row justify-between items-center mt-10 max-sm:mt-[34vw] border-b border-black/30 pb-10 lg:text-left px-5 max-sm:px-0">
        <div className="w-full lg:w-[23vw] mb-6 lg:mb-0 max-sm:px-2">
          <img src="/logo.svg" className="h-16" alt="logo" />
          <p className="text-primary/60 mt-3">
            We have products that suit your style and which you’re proud to own.
            From bathroom to kitchen essentials.
          </p>

          {/* Social Icons */}
          <div className="flex lg:justify-start mt-6 space-x-4 text-white">
            {socialIcons.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered("")}
                className={`p-3 rounded-full cursor-pointer transition ${
                  hovered === item.name
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                <div className="text-lg lg:text-xl">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="grid grid-cols-2 lg:flex lg:space-x-16 text-primary/60 gap-8 tracking-wide max-sm:w-full max-sm:px-3">
          <div>
            <h3 className="uppercase font-semibold text-primary mb-1">
              Company
            </h3>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">About</p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">Features</p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">Works</p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">Career</p>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-primary mb-1">
              Help
            </h3>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">
              Customer Support
            </p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">
              Delivery Details
            </p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">
              Terms & Conditions
            </p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">
              Privacy Policy
            </p>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-primary mb-1">
              FAQ
            </h3>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">Account</p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">
              Manage Deliveries
            </p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">Orders</p>
            <p className="hover:cursor-pointer hover:underline text-sm mb-1">Payments</p>
          </div>
        </div>
      </section>

      {/* Payment Icons */}
      <section className="w-full p-4 max-sm:pb-24">
        <div className="flex justify-center space-x-4 max-sm:space-x-2 max-sm:mt-4 text-primary/80 mb-3 text-4xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaPaypal />
          <FaApplePay />
          <FaGooglePay />
        </div>
        <p className="text-[3vw] lg:text-[.9vw] font-medium text-center text-black/50 mt-1">
          Shop.co © 2000-2025, All Rights Reserved
        </p>
      </section>
    </footer>
  );
};

export default Footer;
