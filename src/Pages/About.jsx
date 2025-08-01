import React from 'react';
import about_thumb from '../assets/about_thumb.png';
import { Helmet } from 'react-helmet-async';
import ground from '../assets/ground.jpeg';
import ground1 from '../assets/ground1.jpeg';
import ground3 from '../assets/ground3.jpeg';
import ground4 from '../assets/ground4.jpeg';
import ground5 from '../assets/ground5.jpeg';

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Atelier Luphien",
    "description": "Luxury hand-painted fashion brand inspired by Indian culture. Wearable art made by real artists.",
    "publisher": {
      "@type": "Organization",
      "name": "Atelier Luphien",
      "url": "https://atelierluphiens.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://atelierluphien.com/images/white_logo.png"
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-12 py-10">
      <Helmet>
        <title>About Us | Atelier Luphien</title>
        <meta
          name="description"
          content="Learn about Atelier Luphien – a luxury fashion brand rooted in hand-painted art, inspired by Indian culture and crafted by real artists."
        />
        <meta
          name="keywords"
          content="About Atelier Luphien, Handmade Fashion, Wearable Art, Indian Art, Sustainable Fashion, Artist-Designed Clothes"
        />
        <meta name="author" content="Atelier Luphien" />
          <link rel="canonical" href="https://atelierluphien.com/about" />


        {/* Open Graph */}
        <meta property="og:title" content="About Atelier Luphien" />
        <meta
          property="og:description"
          content="Discover the story behind Atelier Luphien's hand-painted wearable art and fashion rooted in culture and creativity."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://atelierluphien.com/about" />
        <meta
          property="og:image"
          content="https://atelierluphien.com/images/white_logo.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Atelier Luphien" />
        <meta
          name="twitter:description"
          content="Learn how Atelier Luphien blends fashion with traditional Indian art through handmade, soulful clothing."
        />
        <meta
          name="twitter:image"
          content="https://atelierluphien.com/images/white_logo.png"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-10">About Atelier Luphien</h1>

      {/* Intro Section */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
        <section className="text-lg font-sans text-gray-700 space-y-6 leading-relaxed">
          <p>
            <strong>Atelier Luphien</strong> is a celebration of handmade fashion. We
            offer beautifully crafted <strong>t-shirts, kurtas, and wearable art</strong>{' '}
            created by artists who hand-paint and design each piece — no machines, no mass
            production.
          </p>
          <p>
            Our designs are made by hand using traditional brushes, natural paints, and
            endless imagination. Every product is a unique piece of living art — made
            slowly, mindfully, and with love.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>"Hand-painted"</strong> and designed by real artists
            </li>
            <li>
              <strong>"No machines"</strong> used in the design process
            </li>
            <li>
              <strong>"Each product is one-of-a-kind"</strong>
            </li>
            <li>
              <strong>"Inspired by Indian art, nature, and culture"</strong>
            </li>
          </ul>
        </section>

        <img className="w-[55%] md:w-[45%]" src={about_thumb} alt="Atelier Luphien team" />
      </div>

      {/* Video Section */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold mb-4 text-center">🎥 Watch How It's Made</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-[14rem] md:h-[39rem]"
            width="935"
            height="526"
            src="https://www.youtube.com/embed/8h3lb-PmKsQ"
            title="Atelier Luphien"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-gray-500 text-center mt-2">
          *Real footage of our artists painting apparel by hand
        </p>
      </section>

      {/* Photo Gallery */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold mb-6 text-center">🎨 Artist Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[ground, ground1, ground3, ground4, ground5].map((src, index) => (
            <div key={index} className="overflow-hidden rounded-md shadow-md">
              <img
                src={src}
                alt={`Hand-painted fashion artwork ${index + 1}`}
                className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center mt-3">
          *All designs are painted and photographed in our in-house studio
        </p>
      </section>

      {/* Closing Statement */}
      <section className="mt-14 text-center text-lg font-medium text-gray-700">
        <p>
          Thank you for supporting the art of slow, soulful fashion.
          <br />
          Every Atelier Luphien piece is handmade with purpose — and made for you.
        </p>
        <p className="mt-4 text-white bg-zinc-400 rounded px-4 py-2 inline-block">
          "Wear Art, Wear Meaning, Wear Atelier Luphien..."
        </p>
      </section>
    </div>
  );
};

export default About;
