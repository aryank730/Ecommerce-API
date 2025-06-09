import { createContext, useEffect, useState } from 'react'
import { products } from '../assets/assets.js';

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

   const currency = '₹'
   const delivery_fee = 40
   const [cartItems, setCartItems] = useState({});


   const addTocard = async (itemId, size) => {
      let cartData = structuredClone(cartItems);
      if (cartData[itemId]) {
         if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
         }else {
            cartData[itemId][size] = 1;
         }
      } else {
         cartData[itemId] = {};
         cartData[itemId] [size] = 1;
      }
      setCartItems(cartData);
   }

   useEffect(() => {
      
   }, [cartItems]);

   const value = {
      products,
      currency,
      delivery_fee,
      cartItems,
      addTocard,
   }

   return (
      <ShopContext.Provider value={value}>
         {props.children}
      </ShopContext.Provider>
   );
};



export default ShopContextProvider
