import React, { useEffect } from "react";
import { FaGavel, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-mute text-primary pt-32 pb-16 px-6 sm:px-10 md:px-16">
      {/* --- Header Section --- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-primary mb-3">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 font-medium text-sm tracking-wide">
          Last Updated: November 2025
        </p>
      </div>

      {/* --- Card Container --- */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 sm:p-10 leading-relaxed border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <FaGavel className="text-theme text-3xl" />
          <h2 className="text-2xl font-semibold text-primary">
            Unimacc Terms & Conditions
          </h2>
        </div>

        <p className="text-gray-700 mb-6">
          Welcome to <strong>Unimacc</strong>. By accessing or using our website
          and purchasing our products, you agree to the following Terms &
          Conditions. Please read them carefully.
        </p>

        {/* --- Sections --- */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">1. General</h3>
          <p className="text-gray-700 mb-2">
            This website is operated by <strong>Unimacc</strong>, a brand
            specializing in health faucets, bathroom accessories, showers, and
            faucets.
          </p>
          <p className="text-gray-700">
            By visiting our site or purchasing from us, you engage in our
            “Service” and agree to be bound by these Terms & Conditions.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            2. Products & Availability
          </h3>
          <p className="text-gray-700 mb-2">
            We strive to display accurate product descriptions, images, and
            pricing. However, slight variations in color, finish, or design may
            occur.
          </p>
          <p className="text-gray-700">
            Product availability is subject to stock levels. In case an item is
            unavailable after purchase, we will notify you and process a refund
            or replacement.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            3. Pricing & Payment
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              All prices are listed in Indian Rupees (INR) and are
              inclusive/exclusive of applicable taxes (as mentioned at
              checkout).
            </li>
            <li>
              Payments must be made through the secure payment gateway
              integrated on our website.
            </li>
            <li>
              We are not responsible for delays or errors caused by third-party
              payment providers.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            4. Shipping & Delivery
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Orders are shipped through trusted logistics partners.</li>
            <li>
              Delivery times are estimates and may vary due to unforeseen
              circumstances.
            </li>
            <li>
              For detailed information, please refer to our{" "}
              <a
                href="/shipping-policy"
                className="text-theme font-medium hover:underline"
              >
                Shipping Policy
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            5. Returns & Refunds
          </h3>
          <p className="text-gray-700">
            Returns, exchanges, or refunds are accepted only under specific
            conditions such as defective, damaged, or incorrect products. Please
            refer to our{" "}
            <a
              href="/return-refund-policy"
              className="text-theme font-medium hover:underline"
            >
              Return & Refund Policy
            </a>{" "}
            for full details.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            6. Use of Website
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              You agree not to misuse this website, including attempting
              unauthorized access, transmitting harmful code, or engaging in
              fraudulent activities.
            </li>
            <li>
              Content on this website (text, images, logos, design) is the
              property of <strong>Unimacc</strong> and cannot be copied or used
              without permission.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            7. Limitation of Liability
          </h3>
          <p className="text-gray-700">
            <strong>Unimacc</strong> shall not be held liable for any indirect,
            incidental, or consequential damages arising from the use of our
            products or website. Our liability is limited to the value of the
            product purchased.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">8. Privacy</h3>
          <p className="text-gray-700">
            We respect your privacy. Please review our{" "}
            <a
              href="/privacy-policy"
              className="text-theme font-medium hover:underline"
            >
              Privacy Policy
            </a>{" "}
            to understand how we collect and use your information.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            9. Governing Law
          </h3>
          <p className="text-gray-700">
            These Terms & Conditions shall be governed by and interpreted in
            accordance with the laws of India. Any disputes shall be subject to
            the jurisdiction of courts located in <strong>Pune, Maharashtra</strong>.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-theme mb-2">
            10. Contact Us
          </h3>
          <p className="text-gray-700 mb-2">
            For questions regarding these Terms & Conditions, please contact us:
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

export default TermsAndConditions;
