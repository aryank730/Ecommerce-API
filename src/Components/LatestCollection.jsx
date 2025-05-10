import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  })


  return (
    <>
      <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <Title text1={'LATEST '} text2={'COLLECTION'} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi debitis consequatur omnis temporibus aliquid, perferendis officia.</p>
        </div>
      </div>


      {/* Rendering Products */}

      <div className="grid grid-cols-2 justify-around bg-zinc-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-1.5 md:gap-3 lg:gap-3 gap-y-2">
        {latestProducts.map((item, index) => (
          <div key={index} className="w-full h-full">
            <ProductItem
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>



    </>
  );
};

export default LatestCollection;