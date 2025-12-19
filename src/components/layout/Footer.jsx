import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../api/userApi";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [hovered, setHovered] = useState("");
  const navigate = useNavigate();

  const socialIcons = [
    {
      name: "facebook",
      icon: <FaFacebookF />,
      action: () =>
        (window.location.herf =
          "https://www.facebook.com/people/Unimacc-The-Home-Store/61584854606338/"),
    },
    {
      name: "instagram",
      icon: <FaInstagram />,
      action: () =>
        (window.location.href = "https://www.instagram.com/unimaccofficial/"),
    },
    {
      name: "mail",
      icon: <FaEnvelope />,
      action: () => (window.location.href = "mailto:unimaccofficial@gmail.com"),
    },
  ];

  /* ---------- Fetch Categories ---------- */
  const { data: categories = {}, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["footer_categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <footer className="w-full relative pt-16 px-10 max-sm:px-6 bg-[#c6c3bf]/50 font-urbanist z-40">
      {/* Main Footer */}
      <section className="w-full flex flex-col lg:flex-row justify-between border-b border-primary/30 pb-10 px-5 max-sm:px-0">
        {/* Brand */}
        <div className="w-full lg:w-[23vw] mb-8 lg:mb-0 max-sm:px-2">
          <img src="/logo.svg" className="h-16" alt="logo" />
          <p className="text-[#827e7b] font-medium mt-3">
            We have products that suit your style and which you’re proud to own.
            From bathroom to kitchen essentials.
          </p>

          {/* Social Icons */}
          <div className="flex mt-6 space-x-4 text-white">
            {socialIcons.map((item) => (
              <div
                key={item.name}
                onClick={item.action}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered("")}
                className={`p-3 rounded-full cursor-pointer transition ${
                  hovered === item.name
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                <div className="text-lg lg:text-xl">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:space-x-16 gap-8 text-primary/60 tracking-wide max-sm:w-full max-sm:px-3">
          {/* Pages */}
          <div>
            <h3 className="uppercase font-semibold text-primary mb-2">Pages</h3>
            <p onClick={() => navigate("/")} className="footer-link">
              Home
            </p>
            <p onClick={() => navigate("/products")} className="footer-link">
              Products
            </p>
            <p onClick={() => navigate("/compare")} className="footer-link">
              Compare
            </p>
            <p onClick={() => navigate("/wishlist")} className="footer-link">
              Wishlist
            </p>
            <p onClick={() => navigate("/cart")} className="footer-link">
              Cart
            </p>
            <p onClick={() => navigate("/profile")} className="footer-link">
              Profile
            </p>
            <p onClick={() => navigate("/blogs")} className="footer-link">
              Blogs
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="uppercase font-semibold text-primary mb-2">
              Categories
            </h3>
            {isCategoriesLoading ? (
              <p className="text-sm text-primary/40">Loading...</p>
            ) : (
              Object.entries(categories).map(([name, data]) => (
                <p
                  key={data.id}
                  onClick={() => navigate(`/products?category=${data.id}`)}
                  className="footer-link"
                >
                  {name}
                </p>
              ))
            )}
          </div>

          {/* Policies */}
          <div>
            <h3 className="uppercase font-semibold text-primary mb-2">Help</h3>
            <p
              onClick={() => navigate("shipping_policy")}
              className="footer-link"
            >
              Shipping Policy
            </p>
            <p
              onClick={() => navigate("return_refund_policy")}
              className="footer-link"
            >
              Return & Refund Policy
            </p>
            <p
              onClick={() => navigate("termsandconditions")}
              className="footer-link"
            >
              Terms & Conditions
            </p>
            <p
              onClick={() => navigate("privacy_policy")}
              className="footer-link"
            >
              Privacy Policy
            </p>
          </div>
        </div>
      </section>

      {/* Payment Logos */}
      <section className="w-full p-6 max-sm:pb-24">
        <div className="flex justify-center items-center gap-8 mb-3">
          <img
            src="/razorpay.svg"
            alt="Razorpay"
            className="h-7 object-contain"
          />
          <img src="/ekart.png" alt="Ekart" className="h-6 object-contain" />
        </div>

        <p className="text-[3vw] lg:text-[.9vw] font-medium text-center text-primary/50">
          Shop.co © 2000-2025, All Rights Reserved
        </p>
      </section>

      {/* Footer Link Styles */}
      <style>{`
        .footer-link {
          cursor: pointer;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          text-decoration: underline;
          color: var(--theme-color);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
