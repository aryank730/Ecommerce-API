import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../services/userApi';
import fab_icon from '../assets/fab_icon.png';
import { IoMdCloseCircleOutline } from "react-icons/io";

const Login = ({ onClose, onSwitchToRegister }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null); // ✅ Ref for detecting outside clicks

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userApi.post('/auth/user/login', {
        email: formData.email,
        password: formData.password
      });

      const { access_token, user } = res.data;

      localStorage.setItem('access_token_user', access_token);
      localStorage.setItem('access_user', JSON.stringify(user));

      toast.success('Login successful');
      navigate('/');
      onClose(); // ✅ Close modal after successful login
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
      console.error(error);
    }
  };

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0  bg-opacity-30 z-50 flex justify-center items-start pt-20">
      <div
        ref={modalRef}
        className="bg-white fixed right-0 md:right-56 mt-16 w-full md:w-[25%] md:h-[40rem] h-[45rem] rounded flex flex-col justify-center lg:px-8 p-6 py-8 px-4 shadow sm:rounded-lg sm:px-10"
      >
        {/* Close button */}
        <div onClick={onClose} className='absolute top-2 right-2 cursor-pointer'>
          <IoMdCloseCircleOutline size={28} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Logo and heading */}
          <div className="py-12">
            <img className="mx-auto h-16 w-auto" src={fab_icon} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          {/* Email */}
          <label htmlFor="email" className="block text-sm font-medium py-2 text-gray-700">Email address</label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Switch to Register */}
        <div className="text-right my-4">
          <span className="text-gray-500">No Account?</span>
          <button
            onClick={() => {
              onClose(); // close Login modal
              onSwitchToRegister(); // open Register modal
            }}
            className="text-blue-500 font-medium ml-1"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
