import React, { useContext } from 'react';
import Title from '../Components/Title';
import { ShopContext } from '../context/ShopContext';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className='p-16'>
      <div className="text-2xl">
        <Title text1="MY" text2="Orders" />
      </div>
      <div>
        {
          products.slice(1, 4).map((item, index) => (
            <div
              key={index}
              className="py-4 border-t text-gray-700 gap-4" >
              <div className="flex flex-col md:flex-row md:items-center md:justify-around items-start gap-6 text-sm">
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div className='w-auto flex-1'>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>25, June 2025</span></p>
                </div>
                <div className="md:w-1/2 flex justify-between flex-col md:flex-row gap-6">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">Ready to ship</p>
                  </div>
                  <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
