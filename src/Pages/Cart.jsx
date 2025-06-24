import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../Components/Title';
import { MdDelete } from "react-icons/md";
import CartTotal from '../Components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          const product = products.find(p => p.id === itemId);
          if (product) {
            tempData.push({
              id: itemId,
              size,
              quantity,
              product
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className='border-t p-14'>
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className='text-center text-4xl opacity-60'>Your cart is empty.</p>
        ) : (
          <div>
            {cartData.map((item, index) => (
              <div key={index} className="p-4 border-t grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-4">
                  <img className='w-16 sm:w-20' src={item.product.image[0]} alt={item.product.name} />
                  <div>
                    <p className="text-lg">{item.product.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{item.product.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 rounded-xl'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity || 1} // Ensure value is always defined
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0) updateQuantity(item.id, item.size, val);
                  }}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-2 rounded-xl' />

                <MdDelete  onClick={() => updateQuantity(item.id, item.size, 0)}
                  className='mr-4 cursor-pointer text-red-500 hover:text-red-700'
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={()=>navigate('/placeorder')} className='bg-black text-white text-sm my-8 px-8 py-3 rounded-xl'  >PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
