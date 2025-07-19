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
      <Route path="/orders" element={<Orders />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      
      {/* <Route path="/product/:id" element={<Product />} />
      <Route path="/products" element={<Products />} />
       <Route path="/products/:category" element={<Products />} />
      <Route path="/products/:category/:subCategory" element={<Products />} />
      <Route path="/products/:category/:subCategory/:subSubCategory" element={<Products />} /> */}
    </Routes>
    <Footer/>
    </>
  )
}

export default App
