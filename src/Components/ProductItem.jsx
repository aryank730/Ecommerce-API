import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import bg_img from '../assets/bg_img.jpg';
import ShopContext from '../context/ShopContext';


const ProductItem = ({ id, slug, name, image, price, offer, originalPrice, saveText }) => {
   console.log('slug', price, offer, originalPrice, saveText);


   const { currency } = useContext(ShopContext);

   return (
      <>
         <Link className=' cursor-pointer ' to={`/product/${slug}`}>
            <div className=" m-auto -mt-10 md:m-auto  lg:m-4 flex flex-col  px-2 md:px-0  py-2 w-full md:w-[92%] lg:w-[94%] overflow-hidden rounded-md  bg-white">
               <div className="relative border  w-full gap-4 overflow-hidden scroll-smooth rounded-xl">
                  <img
                     className="w-full h-[256px] md:h-[320px] object-cover mx-auto transition-transform duration-200 hover:scale-105"
                     src={image}
                     alt="product image"
                  />
                  {offer && (
                     <span className="absolute top-0 left-0 m-1 rounded-full bg-gray-600 px-2 text-center text-sm font-medium text-white">
                        {offer}
                     </span>
                  )}
               </div>

               <div style={{
                  backgroundImage: `url(${bg_img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.8,
                  filter: 'grayscale(100%)',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
               }} className="mt-0 z-10 pt-0 bg-zinc-200 h-12 md:h-20 scroll-hidden overflow-y-scroll px-3 pb-0">
                  <div>
                     <div style={{ fontFamily: 'system-ui' }} className="text-[14px] md:text-[16px] font-semibold text-slate-900">
                        {name}
                     </div>
                  </div>
                  <div className="mt-0 relative mb-0  items-center justify-between">
                     {/* <div className="flex items-center">
                        <svg
                           aria-hidden="true"
                           className="h-5 w-5 text-yellow-300"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                           aria-hidden="true"
                           className="h-5 w-5 text-yellow-300"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                           aria-hidden="true"
                           className="h-5 w-5 text-yellow-300"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                           aria-hidden="true"
                           className="h-5 w-5 text-yellow-300"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                           aria-hidden="true"
                           className="h-5 w-5 border-b-black text-yellow-300"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="mr-2 p-1 text-white  ml-3 rounded-md bg-green-500  text-[10px] ">
                           5.0
                        </span>
                     </div> */}
                     <p className="flex flex-col">
                        {offer ? (
                           <>
                              <span className="text-md md:text-lg font-bold text-black">
                                 {currency}{price}
                              </span>
                              <span className="text-sm text-slate-900 line-through">
                                 {currency}{originalPrice}
                              </span>
                              <span className="text-green-600 text-xs font-medium">
                                 {saveText}
                              </span>
                           </>
                        ) : (
                           <span className="text-md md:text-lg font-bold text-black">
                              {currency}{price}
                           </span>
                        )}
                     </p>


                     {/* <span className="absolute -bottom-5 text-[10px] md:text-[14px] right-0 m-1 rounded-full  px-2 text-center text-sm font-medium text-white">
                     22 <span className='text-[10px] text-black'>OF </span> 50
                     </span> */}

                  </div>

                  {/* <div 
                     className="flex items-center justify-center rounded-md bg-slate-900 px-2 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                     </svg>
                     Add to cart
                  </div> */}
               </div>
            </div>

         </Link>
      </>
   )
}

export default ProductItem
