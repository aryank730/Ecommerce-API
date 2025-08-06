import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../services/userApi';
import fab_icon from '../assets/fab_icon.png';
import authimage from '../assets/authBg.png';

const AuthPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const from = location.state?.from?.pathname || '/'; // ✅ Get previous path

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin ? '/auth/user/login' : '/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          };

      const res = await userApi.post(endpoint, payload);
      const { access_token, user } = res.data;

      localStorage.setItem('access_token_user', access_token);
      localStorage.setItem('access_user', JSON.stringify(user));

      toast.success(isLogin ? 'Login successful' : 'Registration successful');

      // ✅ Redirect to previous page or home, then reload
      navigate(from, { replace: true });
      window.location.reload(); // ✅ force reload for state refresh
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${authimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="min-h-screen flex items-center -mt-14 justify-center px-4"
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.19)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.43)',
          padding: '20px',
          margin: '20px 0px',
        }}
        className="w-full max-w-md mt-24 rounded"
      >
        <div className="text-center mb-6 px-6">
          <img className="mx-auto h-16" src={fab_icon} alt="Logo" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-4 rounded-2xl">
          <button
            style={{ borderRadius: '16px 0 0 16px' }}
            className={`p-2 font-medium focus:outline-none ${
              isLogin
                ? 'text-white bg-blue-500'
                : 'text-blue-500 bg-white border border-blue-500'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            style={{ borderRadius: '0 16px 16px 0' }}
            className={`p-2 font-medium focus:outline-none ${
              !isLogin
                ? 'text-white bg-blue-500'
                : 'text-blue-500 bg-white border border-blue-500'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Full Name :
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="mt-1 block w-full focus:border-black px-3 py-2 border-2 rounded-md shadow-sm sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                  Phone Number :
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Your Phone Number"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full focus:border-black px-3 py-2 border-2 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address :
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full focus:border-black px-3 py-2 border-2 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password :
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full focus:border-black px-3 py-2 border-2 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                Confirm Password :
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full focus:border-black px-3 py-2 border-2 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <div className="text-right mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={handleToggle} className="text-blue-500 hover:underline font-medium">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
