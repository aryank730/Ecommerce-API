import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
// import NotFound from './Pages/NotFound'
import Product from './Pages/Product'
import Collection from './Pages/Collection'
import Login from './Pages/Login'
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

function App() {

  return (
    <>
    
    <ToastContainer />
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="Collection" element={<Collection />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      
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
    <Footer/>
    </>
  )
}

export default App
