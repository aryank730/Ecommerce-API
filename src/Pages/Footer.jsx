import React from "react";
import { assets } from "../assets/assets";
import bg_img from "../assets/bg_img.jpg"; 
import { TfiYoutube } from "react-icons/tfi";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
          height: "100%",
        }}
        className="px-2 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 rounded-tl-2xl rounded-tr-2xl bg-gray-300 lg:px-8"
      >
        <div className="grid p-4 gap-2 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link to="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <span className="m-2">
                <img width={150} src={assets.hero} alt="" />
              </span>
            </Link>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-md font-bold text-gray-800">
                Atelier Luphien – Fashion Woven with Desert’s Timeless Beauty
              </p>
              <p className="mt-4 text-sm text-gray-800">
                Handcrafted fashion that seamlessly unites timeless tradition
                with modern sophistication, defining ultimate luxury.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-gray-900">
              Contacts
            </p>
            <div className="flex ">
              <p className="mr-1 text-gray-800">Phone:</p>
              <a
                href="tel:850-123-5021"
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors mt-1 text-black duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                +91 7277354885
              </a>
            </div>
            <div className="flex text-center">
              <p className="mr-1 text-gray-800">Email:</p>
              <a
                href="mailto:atelierluphien@gmail.com"
                aria-label="Our email"
                title="Our email"
                className="transition-colors mt-0.5 text-black duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                atelierluphien@gmail.com
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800">Address:</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our address"
                title="Our address"
                className="transition-colors mt-1 text-black duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                India to your doorstep
              </a>
            </div>
          </div>
          <div>
            <span className="text-base font-bold tracking-wide text-gray-900">
              Social
            </span>
            <div className="flex items-center mt-1 space-x-3">
              <a target="blank"  href="https://x.com/atelierluphien/"
                className="text-black transition-colors duration-300 hover:text-gray-700"
              ><RiTwitterXLine size={24} />
              </a>
              <a target="blank" href="https://www.instagram.com/atelier_luphien?utm_source=qr&igsh=MWRhY3pwNmY2ZGViOA=="
                className="text-black transition-colors duration-300 hover:text-black"
              >
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                  <circle cx={15} cy={15} r={4} />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </svg>
              </a>
              <a target="blank" href="/"
                className="text-black transition-colors duration-300 hover:text-black"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
              <a target="blank" href="https://www.youtube.com/@atelierluphien"
                className="text-black transition-colors duration-300 hover:text-black"
              >
                <TfiYoutube size={24} />
              </a>
            </div>
            <p className="mt-4 text-sm text-black">
              The Desert’s Artistry, Handcrafted into Fashion
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-900">
            © Copyright 2025 Devifer.com , All rights reserved.
          </p>
          <ul className="flex flex-col text-black mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <a
                href="/faq"
                className="text-sm text-black transition-colors duration-300 hover:text-black"
              >
                F.A.Q
              </a>
            </li>
            <li>
              <a
                href="/legal"
                className="text-sm text-black transition-colors duration-300 hover:text-black"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-sm text-black transition-colors duration-300 hover:text-black"
              >
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
