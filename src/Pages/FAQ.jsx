import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: 'What products does Atelier Luphien offer?',
    answer: 'We offer premium shoes and stylish t-shirts made with high-quality materials, designed for both comfort and fashion.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is placed, you will receive a tracking number via email or SMS. You can also track your order under the "My Orders" section in your account.',
  },
  {
    question: 'Do you offer returns or exchanges?',
    answer: 'Yes! We accept returns and exchanges within 7 days of delivery. Items must be unused and in their original packaging.',
  },
  {
    question: 'How can I add items to my wishlist?',
    answer: 'Click the heart icon on any product to add it to your wishlist. You must be logged in to save your wishlist.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and wallet payments.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3–7 business days depending on your location. Express shipping options are available at checkout.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Helmet>
        <title>FAQs – Atelier Luphien</title>
        <meta
          name="description"
          content="Find answers to common questions about Atelier Luphien's products, orders, returns, delivery, and payment options."
        />
        <meta name="keywords" content="FAQs, Atelier Luphien, returns, order tracking, wishlist, delivery, payment methods" />
        <meta name="author" content="Atelier Luphien" />
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-lg font-medium flex justify-between"
            >
              {faq.question}
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
