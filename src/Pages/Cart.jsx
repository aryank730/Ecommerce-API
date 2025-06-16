import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

const Cart = () => {

  const { products, currency, cartItems } = useContext(ShopContext);
  const [ cartCount, setCartCount ] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[item]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item],
            product: products.find(product => product.id === items)
          });
        }
      }
    }
    console.log("Cart Items:", tempData);
  }, [cartItems]);

  return (
    <div>
      
    </div>
  )
}

export default Cart
