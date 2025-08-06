import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { GiEgyptianProfile, GiCrossMark } from "react-icons/gi";
import { IoMdCart } from "react-icons/io";
import { TiThMenuOutline } from "react-icons/ti";
import logo from '../assets/white_logo.png';
import ShopContext from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const updateUserFromStorage = () => {
    const userData = localStorage.getItem('access_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    updateUserFromStorage();
    const handleStorageChange = (e) => {
      if (e.key === 'access_user' || e.key === 'access_token_user') {
        updateUserFromStorage();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close dropdown whenever user changes (login/logout)
  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  const handleProfileClick = () => {
    if (user) {
      setDropdownOpen(!dropdownOpen);
    } else {
      // Pass current location to login page
      navigate('/auth', { state: { from: location } });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_user');
    localStorage.removeItem('access_token_user');
    toast.success('Logged out successfully');
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
      className="sticky top-2 border p-0 md:p-4 py-0 rounded items-center md:py-1 w-[95%] mt-2 md:w-[85%] m-auto z-50"
    >
      <nav className="max-w-4xl xl:max-w-5xl mx-auto px-3 py-1 md:py-2 lg:border-none lg:py-3">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <div className="flex items-center shadow-black space-x-2">
              <img src={logo} alt="Logo" className="w-24 md:w-28 h-auto" />
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold">
              <NavLink to="/"><li className="hover:text-black text-gray-700">Home</li></NavLink>
              <NavLink to="/collection"><li className="hover:text-black text-gray-700">Collection</li></NavLink>
              <NavLink to="/about"><li className="hover:text-black text-gray-700">About</li></NavLink>
            </ul>
          </div>

          <div className="flex gap-3 md:gap-4 relative items-center">
            {/* Profile Dropdown */}
            <div className="relative">
              <GiEgyptianProfile
                size={28}
                className="cursor-pointer"
                onClick={handleProfileClick}
              />
              {dropdownOpen && user && (
                <div className="absolute right-0 mt-2 bg-slate-100 text-gray-600 shadow rounded py-2 w-36 z-50">
                  <p onClick={() => { navigate('/profile'); setDropdownOpen(false); }} className="px-4 py-2 hover:text-black cursor-pointer">My Profile</p>
                  <p onClick={() => { navigate('/orders'); setDropdownOpen(false); }} className="px-4 py-2 hover:text-black cursor-pointer">My Orders</p>
                  <p onClick={handleLogout} className="px-4 py-2 hover:text-black cursor-pointer">Logout</p>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <NavLink to='/cart' className="relative">
              <IoMdCart size={28} />
              <p className='absolute right-[-6px] top-[-5px] w-4 text-center leading-4 bg-orange-600 text-white aspect-square rounded-full text-[8px]'>
                {getCartCount()}
              </p>
            </NavLink>

            {/* Mobile Menu Icon */}
            <TiThMenuOutline onClick={() => setVisible(true)} size="28" className="cursor-pointer  sm:hidden" />
          </div>

          {/* Mobile Sidebar */}
          <div
            style={{
              background: 'rgba(255, 255, 255,1)',
              borderRadius: '0px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
            className={`absolute top-16 left-0 w-full overflow-scroll transition-all h-screen z-20 ${visible ? 'block' : 'hidden'}`}
          >
            <div className="flex flex-col pt-12 space-y-4 m-2 p-2">
              <div className="flex justify-end gap-4 items-center p-3 cursor-pointer">
                <GiCrossMark size={28} onClick={() => setVisible(false)} />
              </div>

              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 font-bold hover:bg-zinc-200 rounded border-t border-b px-4" to="/">Home</NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 font-bold hover:bg-zinc-200 rounded border-t border-b px-4" to="/collection">Collection</NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 font-bold hover:bg-zinc-200 rounded border-t border-b px-4" to="/about">About</NavLink>

              {/* Login / Register */}
              {!user && (
                <div className="flex justify-around text-white">
                  <Link
                    to="/auth"
                    state={{ from: location }}
                    onClick={() => setVisible(false)}
                    className="flex gap-2 items-center py-2 pl-6 font-bold rounded bg-zinc-500 hover:bg-zinc-600 border-t border-b px-4"
                  >
                    Login / Register
                  </Link>
                </div>
              )}

              <img className='fixed bottom-30 m-auto w-[50%]' src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
