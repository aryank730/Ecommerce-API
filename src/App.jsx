import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

// Pages & Components
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import PlaceOrder from './Pages/PlaceOrder';
import Product from './Pages/Product';
import Collection from './Pages/Collection';
import Contact from './Pages/Contact';
import Orders from './Pages/Orders';
import Checkout from './Pages/Checkout';
import ThankYouPage from './Pages/ThankYouPage';
import OrderDetailPage from './Pages/OrderDetailPage';
import FAQ from './Pages/FAQ';
import LegalPage from './Pages/LegalPage';
import About from './Pages/About';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import Footer from './Pages/Footer';
import AuthPages from './Pages/AuthPages'; 

// Scroll to top component
import ScrollToTop from './Components/ScrollToTop';

// Admin
import AdminLogin from './adminModule/Components/auth/AdminLogin';
import ProtectedAdminRoute from './adminModule/Components/common/ProtectedRoute';
import AdminLayout from './adminModule/Components/AdminLayout';

// Protected Routes
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <HelmetProvider>
      <ToastContainer />
      <ScrollToTop />
      
      {/* Navbar */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        {/* ✅ Unified Auth Route */}
        <Route path="/auth" element={<AuthPages />} />

        {/* 🔁 Optional Redirects from old login/register */}
        <Route path="/login" element={<Navigate to="/auth" />} />
        <Route path="/register" element={<Navigate to="/auth" />} />

        {/* Protected User Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:orderNumber"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute requiredRoles={['admin', 'super_admin']}>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      <Footer />
    </HelmetProvider>
  );
}

export default App;
