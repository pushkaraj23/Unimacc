import React from "react";
import { FaShieldAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-primary pt-24 pb-16 px-6 sm:px-10 md:px-16">
      {/* --- Header Section --- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-primary mb-3">
          Privacy Policy
        </h1>
        <p className="text-gray-600 font-medium text-sm tracking-wide">
          Last Updated: November 2025
        </p>
      </div>

      {/* --- Card Container --- */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 sm:p-10 leading-relaxed border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <FaShieldAlt className="text-theme text-3xl" />
          <h2 className="text-2xl font-semibold text-primary">
            Unimacc Privacy Commitment
          </h2>
        </div>
        <p className="text-gray-700 mb-6">
          At <strong>Unimacc</strong>, we respect your privacy and are committed
          to protecting your personal information. This Privacy Policy explains
          how we collect, use, and safeguard your data when you visit our
          website or purchase our products.
        </p>

        {/* --- Sections --- */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            1. Information We Collect
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Personal details such as your name, email, phone number, and
              shipping address.
            </li>
            <li>
              Payment information required for order processing (handled
              securely through trusted payment gateways).
            </li>
            <li>
              Technical data such as IP address, browser type, and device
              information.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            2. How We Use Your Information
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Process and deliver your orders efficiently.</li>
            <li>Communicate with you about purchases, offers, and updates.</li>
            <li>
              Improve website performance, user experience, and customer
              service.
            </li>
            <li>
              Ensure secure transactions and prevent fraudulent activities.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            3. Sharing of Information
          </h3>
          <p className="text-gray-700">
            We do not sell or trade your personal data. Information may only be
            shared with:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
            <li>
              Trusted third-party service providers (payment gateways, shipping
              partners, analytics tools).
            </li>
            <li>Legal authorities if required by law.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            4. Cookies & Tracking
          </h3>
          <p className="text-gray-700">
            Our website uses cookies to enhance browsing experience, analyze
            traffic, and personalize content. You may disable cookies in your
            browser settings at any time.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            5. Data Security
          </h3>
          <p className="text-gray-700">
            We implement industry-standard measures to protect your personal
            data from unauthorized access, misuse, or disclosure.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            6. Your Rights
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of marketing emails at any time.</li>
            <li>Contact us for any privacy-related concerns.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            7. Third-Party Links
          </h3>
          <p className="text-gray-700">
            Our website may contain links to external sites. We are not
            responsible for the privacy practices or content of those websites.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            8. Changes to This Policy
          </h3>
          <p className="text-gray-700">
            Unimacc may update this Privacy Policy periodically. Any changes
            will be posted on this page with the updated effective date.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-theme mb-2">
            9. Contact Us
          </h3>
          <p className="text-gray-700 mb-2">
            If you have questions about this Privacy Policy or how your data is
            handled, please contact us:
          </p>
          <div className="flex flex-col gap-2 text-sm sm:text-base text-primary">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-theme" />{" "}
              <span>unimaccofficial@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-theme" />{" "}
              <span>+91 95606 90006</span>
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

export default PrivacyPolicy;
