import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../Components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const product = products.find((item) => item.id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    } else {
      setProductData(null); // in case no match is found
    }
  }, [productId, products]);

  // if (!productData) return <div>Product not found</div>;

  return productData ? (
    <div className=" pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-row justify-around">
        {/* product data */}
        <div className="flex flex-row m-2 gap-8 sm:gap-12">

          {/* product image thumbnails and selection */}
          <div className="flex flex-col sm:flex-row sm:w-1/5 gap-4 align-center">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-around  sm:h-[400px] gap-3 sm:gap-4">
              {productData.image.map((item, index) => (
                <img key={index} onClick={() => setImage(item)} src={item} alt={productData.name}
                  className="w-[24] h-24 object-cover cursor-pointer flex-shrink-0 border hover:border-gray-400 transition"
                />
              ))}
            </div>
          </div>

          {/* main product image */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto object-contain"
              src={image}
              alt={productData.name}
            />
          </div>
        </div>

        {/* ----------------------product info ---------------- */}
        {/* <div className="flex-1 "> */}
        <div class="flex-1 px-4">
          <h2 class="text-2xl font-bold text-gray-800  mb-2">{productData.name}</h2>
          <p class="text-gray-600  text-sm mb-4">{productData.description}</p>
          <div class="flex mb-4">
            <div class="mr-4">
              <span class="font-bold text-gray-700 ">Price: </span>
              <span class="text-gray-600 ">{currency} {productData.price}</span>
            </div>
            <div>
              <span class="font-bold text-gray-700 ">Availability:</span>
              <span class="text-gray-600 ">In Stock</span>
            </div>
          </div>
          <div class="mb-4">
            <span class="font-bold text-gray-700 ">Select Color:</span>
            <div class="flex items-center mt-2">
              <button class="w-6 h-6 rounded-full bg-gray-800  mr-2"></button>
              <button class="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
              <button class="w-6 h-6 rounded-full bg-blue-500  mr-2"></button>
              <button class="w-6 h-6 rounded-full bg-yellow-500  mr-2"></button>
            </div>
          </div>
          <div class="mb-4">
            <span class="font-bold text-gray-700 ">Select Size:</span>
            <div className="flex items-center mt-2 flex-wrap gap-2">
              {productData.size.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold hover:bg-gray-400 transition 
                ${item === size ? 'border-2 border-orange-500' : ''}`}  > {item}
                </button>
              ))}
            </div>

          </div>
          <div>
            <span class="font-bold text-gray-700 ">Product Description:</span>
            <p class="text-gray-600  text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
              lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
              ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
              sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
            </p>
          </div>
          <button className="bg-orange-400 active:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-orange-500 transition">
            Add to Cart </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product</p>
            <p>COD is Aviable</p>
            <p>Exchange in in Days</p>
          </div>
        </div>

      </div>
      {/* ------------------------Discription and review section--------------------- */}
      <div className="mt-20">
        <div className="flex m-4">
          <b className='border px-5 py-3 text-sm'>Discription : </b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className="felx felx-col gap-4 border p-6 text-sm text-gray-500">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab consectetur cupiditate suscipit ratione modi dolore nulla reiciendis, officiis unde. Voluptas omnis pariatur dolore voluptatum.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex obcaecati optio, tempora quidem nihil labore hic voluptate officia at totam, ab rerum! Eius sequi fugit corporis aliquid tempora placeat facere itaque, voluptas veritatis eos!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex obcaecati optio, tempora quidem nihil labore hic voluptate officia at totam, ab rerum! Eius sequi fugit corporis aliquid tempora placeat facere itaque, voluptas veritatis eos!</p>
        </div>
      </div>


      {/* display related product  */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>

  ) : <div className="opacity-0"></div>
};

export default Product;
