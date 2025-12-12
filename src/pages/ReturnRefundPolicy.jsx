import React, { useEffect } from "react";
import { FaUndo, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ReturnRefundPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white text-primary pt-24 pb-16 px-6 sm:px-10 md:px-16">
      {/* --- Header --- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-primary mb-3">
          Return & Refund Policy
        </h1>
        <p className="text-gray-600 font-medium text-sm tracking-wide">
          Last Updated: November 2025
        </p>
      </div>

      {/* --- Card --- */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 sm:p-10 leading-relaxed border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <FaUndo className="text-theme text-3xl" />
          <h2 className="text-2xl font-semibold text-primary">
            Unimacc Return & Refund Policy
          </h2>
        </div>

        <p className="text-gray-700 mb-6">
          At <strong>Unimacc</strong>, we want you to be fully satisfied with your
          purchase. If you are not completely happy with your order, we are here
          to help with easy returns and refunds.
        </p>

        {/* 1. Eligibility */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            1. Eligibility for Returns
          </h3>
          <p className="text-gray-700 mb-2">You may request a return if:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
            <li>You received a damaged, defective, or incorrect product.</li>
            <li>The product has manufacturing defects.</li>
            <li>The return request is made within 7 days of delivery.</li>
          </ul>

          <p className="text-gray-700 mb-2">Products will not be eligible for return if:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>They are used, installed, or not in their original condition.</li>
            <li>
              The damage is caused by misuse, improper installation, or normal
              wear and tear.
            </li>
            <li>They are custom-made or clearance items (if applicable).</li>
          </ul>
        </section>

        {/* 2. Return Process */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">
            2. Return Process
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              To initiate a return, please contact us at{" "}
              <a href="mailto:unimaccofficial@gmail.com" className="text-theme font-medium hover:underline">
                unimaccofficial@gmail.com
              </a>{" "}
              /{" "}
              <a href="tel:+919560690006" className="text-theme font-medium hover:underline">
                95606900006
              </a>{" "}
              within 7 days of delivery.
            </li>
            <li>Provide your order number, product details, and images of the defect/damage.</li>
            <li>
              Once approved, we will arrange for a pickup or guide you on how to
              return the product.
            </li>
          </ul>
        </section>

        {/* 3. Refunds */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">3. Refunds</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Refunds will be processed once the returned item is inspected and
              approved.
            </li>
            <li>
              Refunds will be issued to your original payment method within 7–10
              business days.
            </li>
            <li>
              For COD orders, refunds will be issued via bank transfer or store
              credit.
            </li>
          </ul>
        </section>

        {/* 4. Replacements */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">4. Replacements</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Wherever possible, we will offer a replacement product instead of a refund.</li>
            <li>If the product is out of stock, a full refund will be provided.</li>
          </ul>
        </section>

        {/* 5. Shipping Costs */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-theme mb-2">5. Shipping Costs</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              If the return is due to a defective, damaged, or incorrect item,
              Unimacc will bear the return shipping cost.
            </li>
            <li>
              For all other returns (if applicable), the customer may be
              responsible for shipping charges.
            </li>
          </ul>
        </section>

        {/* 6. Contact */}
        <section>
          <h3 className="text-lg font-semibold text-theme mb-2">6. Contact Us</h3>
          <p className="text-gray-700 mb-2">
            For any return or refund-related queries, please reach us at:
          </p>
          <div className="flex flex-col gap-2 text-sm sm:text-base text-primary">
            <p className="flex items-center gap-2 hover:text-theme transition">
              <FaEnvelope className="text-theme" />
              <a href="mailto:unimaccofficial@gmail.com">unimaccofficial@gmail.com</a>
            </p>
            <p className="flex items-center gap-2 hover:text-theme transition">
              <FaPhoneAlt className="text-theme" />
              <a href="tel:+919560690006">+91 95606 90006</a>
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} Unimacc. All rights reserved.
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
