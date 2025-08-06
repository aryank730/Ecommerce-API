import React, { useEffect, useState, useContext } from 'react'
import  ShopContext  from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({ category, subCategory }) => {
   const { products } = useContext(ShopContext)
   const [related, setRelated] = useState([])

   useEffect(() => {
      if (products.length > 0) {
         let productsCopy = products.slice();
         productsCopy = productsCopy.filter((item) => item.category === category && item.subCategory === subCategory);
         setRelated(productsCopy.slice(0, 5))
      }
   }, [products, category, subCategory])

   return (
      <div>
         <div className="my-24">
            <div className="text-center text-3xl py-2">
               <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-0   justify-around p-2 my-2 bg-white gap-y-0 md:gap-y-2 ">
               {related.map((item, index) => (
                  <ProductItem
                     key={index}
                     id={item.id}
                     slug={item.slug}
                     name={item.name}
                     image={`https://atelierluphien.com/${item.thumbnail.local_path}`}
                     price={item.price}
                     currency='₹' />
               ))}
            </div>
         </div>
      </div>
   )
}

export default RelatedProduct
