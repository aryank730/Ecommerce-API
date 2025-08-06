import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import ShopContext from '../context/ShopContext';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  console.log('latestProducts', latestProducts);


  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);



  return (
    <>
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST '} text2={'COLLECTION'} />
      </div>


      {/* Rendering Products */}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-0   justify-around p-2 my-2 bg-white gap-y-0 md:gap-y-2">
        {latestProducts.map((item, index) => (
          <div key={index} className="w-full h-full">
            <ProductItem
              id={item.id}
              slug={item.slug}
              image={`https://atelierluphien.com/${item.thumbnail.local_path}`}

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