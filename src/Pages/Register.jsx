import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import userApi from '../services/userApi';
import fab_icon from '../assets/fab_icon.png';

const Register = ({ onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // keep it string for input
    password: '',
  });


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userApi.post('/auth/register', formData);

      const { access_token, user } = res.data;

      localStorage.setItem('access_token_user', access_token);
      localStorage.setItem('access_user', JSON.stringify(user));

      toast.success('Registered successfully!');
      onClose(); // Close the modal
      navigate('/'); // Redirect to homepage
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
      console.error(error);
    }
  };


  return (
    <div className='  '>
      <div className="bg-white fixed right-0 md:right-56 mt-12 w-full md:w-[25%] md:h-full overflow-scroll inset-0  h-[45rem] rounded  flex flex-col justify-center  lg:px-8 p-6 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div ref={modalRef} className="  w-full max-w-md rounded-lg  p-4">
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <IoMdCloseCircleOutline size={26} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <img className="mx-auto h-16" src={fab_icon} alt="Logo" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Create a new account</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                pattern="[0-9]{10}" // optional: allows only 10-digit numbers
                title="Please enter a valid 10-digit phone number"
              />
            </div>


            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Sign up
            </button>
          </form>

          {/* Switch to Login */}
          <div className="text-right mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-500 hover:underline font-medium"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;