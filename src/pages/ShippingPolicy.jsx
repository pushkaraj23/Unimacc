import React, { useEffect } from "react";
import { FaTruck, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white text-primary pt-24 pb-16 px-6 sm:px-10 md:px-16">
      {/* --- Header Section --- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-primary mb-3">
          Shipping Policy
        </h1>
        <p className="text-gray-600 font-medium text-sm tracking-wide">
          Last Updated: November 2025
        </p>
      </div>

      {/* --- Card Container --- */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 sm:p-10 leading-relaxed border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <FaTruck className="text-theme text-3xl" />
          <h2 className="text-2xl font-semibold text-primary">
            Unimacc Shipping Policy
          </h2>
        </div>
        <p className="text-gray-700 mb-6">
          At <strong>Unimacc</strong>, we strive to deliver your orders quickly,
          safely, and at the best possible rates. Please read our shipping
          policy to understand how we handle deliveries.
        </p>

        {/* --- Sections --- */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            1. Shipping Coverage
          </h3>
          <p className="text-gray-700">
            We currently ship across India through our trusted logistics
            partners. International shipping may be introduced in the future.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            2. Processing Time
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Orders are processed within 1–2 business days after payment
              confirmation.
            </li>
            <li>
              Orders placed on weekends or holidays will be processed on the
              next working day.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            3. Delivery Time
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Standard delivery within India takes 3–7 business days, depending
              on your location.
            </li>
            <li>Remote areas may take slightly longer.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            4. Shipping Charges
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Shipping charges will be calculated at checkout based on weight,
              size, and delivery location.
            </li>
            <li>
              Free shipping may be available on promotional offers or above a
              certain order value (if applicable).
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            5. Order Tracking
          </h3>
          <p className="text-gray-700">
            Once your order is shipped, you will receive a tracking ID and link
            via email/SMS to track your shipment in real time.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            6. Delayed or Failed Delivery
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              In case of unexpected delays, we will notify you by email or
              phone.
            </li>
            <li>
              If delivery fails due to incorrect address or non-availability of
              the recipient, re-delivery charges may apply.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            7. Damaged or Missing Products
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Please inspect your order upon delivery.</li>
            <li>
              If you receive a damaged, defective, or incorrect item, contact us
              within 48 hours with photos, and we will assist with a replacement
              or resolution.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-theme mb-2">
            8. Contact Us
          </h3>
          <p className="text-gray-700 mb-2">
            For shipping-related queries, please contact us:
          </p>
          <div className="flex flex-col gap-2 text-sm sm:text-base text-primary">
            <p className="flex items-center gap-2 hover:text-theme transition">
              <FaEnvelope className="text-theme" />{" "}
              <a href="mailto:unimaccofficial@gmail.com">
                unimaccofficial@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2 hover:text-theme transition">
              <FaPhoneAlt className="text-theme" />{" "}
              <a href="tel:+919560690006">+91 95606 90006</a>
            </p>
          </div>
        </section>
      </div>

      {/* --- Footer Note --- */}
      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} Unimacc. All rights reserved.
      </div>
    </div>
  );
};

export default ShippingPolicy;
