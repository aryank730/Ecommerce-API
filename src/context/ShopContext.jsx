import { createContext, useEffect, useState } from 'react'
import { products } from '../assets/assets.js';
import { toast } from 'react-toastify';

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

   const currency = '₹'
   const delivery_fee = 40
   const [cartItems, setCartItems] = useState({});


   const addTocart = async (itemId, size) => {

      if (!size) {
         toast.error("Please select a size before adding to cart");
         return;
      }

      let cartData = structuredClone(cartItems);
      if (cartData[itemId]) {
         if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
         } else {
            cartData[itemId][size] = 1;
         }
      } else {
         cartData[itemId] = {};
         cartData[itemId][size] = 1;
      }
      setCartItems(cartData);
   }

   const getCartCount = () => {
      let totalCount = 0;
      for (const item in cartItems) {
         for (const size in cartItems[item]) {
            try {
               if (cartItems[item][size] > 0) {
                  totalCount += cartItems[item][size];
               }
            } catch (error) {
               // console.error("Error calculating cart count:", error);
            }
         }
      }
      return totalCount;
   }

   useEffect(() => {
      console.log("Cart Items Updated:", cartItems);
   }, [cartItems]);

   const value = {
      products,
      currency,
      delivery_fee,
      cartItems,
      addTocart,
      getCartCount,
   }

   return (
      <ShopContext.Provider value={value}>
         {props.children}
      </ShopContext.Provider>
   );
};




export default ShopContextProvider
