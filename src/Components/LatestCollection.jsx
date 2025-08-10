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
        {latestProducts.map((item, index) => {
  const price = parseFloat(item.price);
  let finalPrice = parseFloat(item.price);
  let offer = null;
  let saveText = null;
    if (item.offer_coupon) {
    const discountValue = parseFloat(item.offer_coupon.discount_value);

    if (item.offer_coupon.discount_type === 'flat') {
      finalPrice = finalPrice - discountValue;
      offer = `${discountValue}₹ OFF`;
      saveText = `Save ₹${discountValue}`;
            console.log('11111111111',saveText);

    } 
    else if (item.offer_coupon.discount_type === 'percentage') {
      finalPrice = finalPrice - (finalPrice * discountValue) / 100;
      offer = `${discountValue}% OFF`;
      saveText = `Save ${discountValue}%`;
      console.log('11111111111',saveText);
      
    }
  }


  return (
    <div key={index} className="w-full h-full">
      <ProductItem
        id={item.id}
        slug={item.slug}
        image={`https://atelierluphien.com/${item.thumbnail.local_path}`}
        name={item.name}
        price={finalPrice.toFixed(2)}
        originalPrice={item.price}
        offer={offer}
        saveText={saveText}
      />
    </div>
  );
})}
      </div>



    </>
  );
};

export default LatestCollection;