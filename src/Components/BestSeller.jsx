import { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import SectionTitle from '../Components/Title'; // <--- fix this path if needed
import ProductItem from '../Components/ProductItem'; // make sure this is also imported

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller === true);
    setBestSellerProducts(bestProduct.slice(0, 5));
  }, [products]); // ✅ added dependency

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <SectionTitle text1="BEST" text2="SELLER" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi debitis consequatur omnis temporibus aliquid, perferendis officia.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerProducts.map((item, index) => (
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
    </div>
  );
};

export default BestSeller;
