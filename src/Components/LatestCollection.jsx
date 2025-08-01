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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-1.5 md:gap-3 lg:gap-3  justify-around p-2 mt-2 mb-2 bg-zinc-200 gap-y-2">
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