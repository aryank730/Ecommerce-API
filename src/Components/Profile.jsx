import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaParachuteBox } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";


const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);
  const shareUrl = 'https://atelierluphien.com/'; // Replace with your actual link

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <button
      onClick={copyToClipboard}
      className="mt-2 px-4 py-1 w-44 rounded text-xs text-gray-900 tracking-wider border border-gray-400 flex items-center gap-2 hover:text-green-600"
    >
      <FaLink />
      {copied ? 'Link Copied!' : 'Share Link'}
    </button>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('access_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      toast.error("User not found. Please log in.");
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_user');
    localStorage.removeItem('access_token_user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6">
      <div className="px-4">
        <div className="px-4 py-4 flex flex-col md:flex-row  bg-white justify-evenly rounded-lg drop-shadow overflow-hidden w-full transform transition-transform border-gray-200 border items-center">
          <div>
            <div className="aspect-square h-20 bg-gray-100 rounded-lg m-auto">
              <CgProfile size={80} />
            </div>
            {/* Reusable Copy Link Button */}
            <CopyLinkButton />
            
          </div>

          <hr className='w-[80%] block md:hidden' />

          <div className="p-2 md:p-6 h-full flex flex-col md:justify-between">
            <div className="text-sm md:text-md text-[24px] mb-2 text-gray-800 leading-4">
              Hii, {user.name}
            </div>
            <div className="pb-1 space-y-1.5 text-gray-900 md:pb-4">
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Phone:</strong> {user.phone}</div>
            </div>

            <Link
              to="/"
              className="flex items-center rounded-md mt-2 bg-slate-900 px-4 py-1 text-xs md:text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-4 md:w-6 aspect-square" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg> */}
              <HiOutlineShoppingCart size={20} className="mr-2 w-4 md:w-6 aspect-square" />
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="flex items-center rounded-md mt-2 bg-slate-900 px-4 py-1 text-xs md:text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <FaParachuteBox size={20} className="mr-2 w-4 md:w-6 aspect-square" />
              My Orders
            </Link>

            
          </div>
        </div>
        <button
              onClick={handleLogout}
              className="flex gap-1 items-center mt-2 justify-center border border-black hover:border-red-400 hover:text-black text-red-500 py-1 px-2 rounded"
            >
              Logout <CiLogout />
            </button>
      </div>
    </div>
  );
};

export default Profile;
