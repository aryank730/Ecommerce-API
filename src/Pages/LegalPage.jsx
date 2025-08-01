// pages/LegalPage.jsx
import React, { useState } from 'react';

const sections = [
  {
    title: 'Privacy Policy',
    content: (
      <>
        <p className="mb-2"><strong>Effective Date:</strong> [Insert Date]</p>
        <p>At <strong>Atelier Luphien</strong>, we value your privacy and are committed to protecting your personal data.</p>

        <h3 className="font-semibold mt-4">1. Information We Collect</h3>
        <ul className="list-disc ml-6">
          <li>Personal Information: Name, email, phone, shipping address, payment info.</li>
          <li>Device Information: IP, browser type, OS, device type.</li>
          <li>Order Information: Purchase history, cart, wishlist.</li>
          <li>Cookies: For better browsing and analytics.</li>
        </ul>

        <h3 className="font-semibold mt-4">2. How We Use Your Information</h3>
        <p>We use your data to fulfill orders, personalize your experience, and send updates.</p>

        <h3 className="font-semibold mt-4">3. Sharing Your Information</h3>
        <p>We share your data only with trusted third parties like payment processors, delivery partners, and communication tools.</p>

        <h3 className="font-semibold mt-4">4. Data Security</h3>
        <p>We use advanced security protocols to protect your data.</p>

        <h3 className="font-semibold mt-4">5. Your Rights</h3>
        <p>You can request, correct, or delete your data at any time.</p>

        <h3 className="font-semibold mt-4">6. Contact Us</h3>
        <p>Email: <a href="mailto:privacy@atelierluphien.com" className="text-blue-600 underline">privacy@atelierluphien.com</a></p>
      </>
    ),
  },
  {
    title: 'Terms & Conditions',
    content: (
      <>
        <p className="mb-2"><strong>Effective Date:</strong> [Insert Date]</p>
        <p>By using the Atelier Luphien website, you agree to the following terms:</p>

        <h3 className="font-semibold mt-4">1. Use of Website</h3>
        <p>You must be 18+ or under supervision. Provide valid and up-to-date information.</p>

        <h3 className="font-semibold mt-4">2. Products & Orders</h3>
        <p>All products are subject to availability. We reserve the right to cancel any order for errors or fraud.</p>

        <h3 className="font-semibold mt-4">3. Payments</h3>
        <p>We accept major cards, UPI, wallets. Orders are processed after full payment.</p>

        <h3 className="font-semibold mt-4">4. Shipping & Delivery</h3>
        <p>Delivery takes 3–7 business days. We are not liable for courier delays.</p>

        <h3 className="font-semibold mt-4">5. Returns & Exchanges</h3>
        <p>Return/exchange within 7 days in original condition and packaging.</p>

        <h3 className="font-semibold mt-4">6. Intellectual Property</h3>
        <p>All site content is owned by Atelier Luphien. No reuse without permission.</p>

        <h3 className="font-semibold mt-4">7. Limitation of Liability</h3>
        <p>We are not responsible for indirect or consequential damages from product use.</p>

        <h3 className="font-semibold mt-4">8. Changes</h3>
        <p>We may update these terms without prior notice.</p>

        <h3 className="font-semibold mt-4">9. Contact Us</h3>
        <p>Email: <a href="mailto:support@atelierluphien.com" className="text-blue-600 underline">support@atelierluphien.com</a></p>
      </>
    ),
  },
];

const LegalPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Legal Information</h1>
      {sections.map((section, index) => (
        <div key={index} className="mb-6 border rounded-lg shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
          >
            <span className="text-xl font-medium">{section.title}</span>
            <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="p-4 text-gray-700 text-sm bg-white">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LegalPage;
