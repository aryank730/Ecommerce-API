import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
// import NotFound from './Pages/NotFound'
import Product from './Pages/Product'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Register from './Pages/Register'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import Footer from './Pages/Footer'
import { ToastContainer, toast } from 'react-toastify';
import UserList from './adminModule/Components/Users/UserList'
import UserForm from './adminModule/Components/Users/UserForm'
import AdminLogin from './adminModule/Components/auth/AdminLogin';
import AdminProducts from './adminModule/pages/AdminProducts'
import AdminOrders from './adminModule/pages/AdminOrders'
import AdminCategories from './adminModule/pages/AdminCategories'
import AdminReviews from './adminModule/pages/AdminReviews'
import AdminStats from './adminModule/pages/AdminStats';
import ProtectedRoute from './adminModule/Components/common/ProtectedRoute'
import AdminLayout from './adminModule/Components/AdminLayout';
import AdminDashboard from './adminModule/pages/AdminDashboard'
import Checkout from './Pages/Checkout'
import ThankYouPage from './Pages/ThankYouPage'
import OrderDetailPage from './Pages/OrderDetailPage'
import FAQ from './Pages/FAQ'
import LegalPage from './Pages/LegalPage'
import About from './Pages/About'
import ForgotPassword from './Pages/ForgotPassword'
import Login from './Pages/Login'
import Profile from './Components/Profile'
import { HelmetProvider } from 'react-helmet-async'

function App() {

  return (
    <>
      <HelmetProvider>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="Collection" element={<Collection />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<OrderDetailPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/orders/:orderNumber" element={<OrderDetailPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />




          {/* <Route path="/product/:id" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/products/:category/:subCategory" element={<Products />} />
          <Route path="/products/:category/:subCategory/:subSubCategory" element={<Products />} /> */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute requiredRoles={['admin', 'super_admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>

          </Route>
        </Routes>
        <Footer />
        </HelmetProvider>
      </>
      )
}

      export default App
