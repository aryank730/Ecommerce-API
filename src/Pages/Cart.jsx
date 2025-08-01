import React, { useEffect, useState } from 'react';
import api from '../adminModule/services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IoBagCheckOutline } from "react-icons/io5";
import cart_bg from '../assets/cart_bg.jpg';
import camel_cart from '../assets/camel_cart.png'
import { AiOutlineShopping } from "react-icons/ai";
import userApi from '../services/userApi';


const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const [currency] = useState('₹');

  const fetchCart = async () => {
    try {
      const res = await userApi.get('/cart');
      setCartData(res.data.details || []);
    } catch (err) {
      toast.error('Failed to load cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    try {
      await userApi.patch(`/cart/items/${itemId}`, { quantity });
      fetchCart();
    } catch (err) {
      toast.error('Failed to update item quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await userApi.delete(`/cart/items/${itemId}`);
      fetchCart();
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const getTotal = () => {
    return cartData.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
  };

  if (cartData.length === 0) {
    return <div class="flex flex-col md:flex-row justify-around py-2 md:py-12 bg-white rounded-3xl my-2  w-[75%] m-auto md:mx-auto p-2  border-2 border-gray-800 ">
      <div class=" px-2 py-6 w-full  md:w-1/3 my-auto items-center md:p-10 justify-center">
        <h1 class="flex text-4xl md:text-5xl font-medium leading-tight text-gray-800 mb-6">"Your card is &#10240; <span className='text-red-600'>Empty !</span>  <span><AiOutlineShopping color='red' /></span> "</h1>
        <p class="text-base md:text-lg font-normal leading-normal text-gray-800 mb-6"> </p>
        
        <p class="text-base md:text-lg font-normal leading-normal text-gray-800 mt-6">We are Atelier Luphien,</p>
        <p class="text-sm md:text-base font-normal leading-normal text-gray-800 mt-2">

          Fashion lives in our hands — not machines. <br /> Every piece we create is touched by an artist, shaped by feeling, and crafted with time. <br />

          So stop browsing. Start discovering fashion that’s alive — <span className='text-teal-700'> handcrafted, human, and uniquely yours...</span>
        </p>
        <div class="flex justify-center">
          <a href="" target="_blank" rel="noopener"
            class="bg-zinc-400 rounded-lg text-white border font-medium text-base md:text-lg py-2 px-4 md:px-12 hover:bg-yellow-500 transition-all duration-150 ease-in-out">Shop
            now
          </a>
        </div>
      </div>
      <img className=' w-1/2 md:w-1/3 flex items-center justigy-center' src={camel_cart} />
    </div>;
  }

  return (
    <div className="p-4 mt-6 md:mt-12 ml-2 mr-4 mb-12 md:mb-18 w-full md:w-[75%] md:m-auto bg-[rgba(255,255,255,0.1)] shadow border-b border-t rounded-2xl outline-2 backdrop-blur-sm">

      {/* <div className="m-auto sm:p-8 bg-[rgba(229,229,229,0.2)] border border-[rgba(229,229,229,0.3)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm"> */}
      <h2 className="text-xl font-bold mb-6">Your Cart</h2>

      <div className=" space-y-4">
        {cartData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4 gap-4"
          >
            <div className="text-center">

              <img
                src={`https://atelierluphien.com/${item.product.thumbnail?.local_path}`}
                alt={item.product.name}
                className="w-24 h-auto object-cover rounded"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 mt-4 hover:underline ml-4"
              >
                Remove
              </button>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <div className=" flex flex-col md:flex-row items-start justify-around md:justify-between">
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

              </div>
              <p className="text-lg text-gray-700 text-right font-bold">
                {currency}
                {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>

          </div>
        ))}
      </div>
      {/* <div className=""> */}
      <div className="m-2 flex justify-between items-center ">
        <div className=" font-bold text-green-900 text-lg">
        Total: {currency}
        {getTotal().toFixed(2)}
        </div>
        <button
        onClick={() => navigate('/checkout')}
        className=" bg-green-600 gap-2 font-bold flex items-center  my-2 text-white p-2 rounded hover:bg-green-700"
      ><span><IoBagCheckOutline size={18} /></span>
       <span className='hidden md:block'>Proceed to</span>Checkout
      </button>
      </div>
      
    </div>
    //  </div>

  );
};

export default Cart;
