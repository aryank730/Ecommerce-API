import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
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

            

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
               {related.map((item, index) => (
                  <ProductItem
                     key={index}
                     id={item.id}
                     name={item.name}
                     image={item.image}
                     price={item.price}
                     currency='₹' />
               ))}
            </div>
         </div>
      </div>
   )
}

export default RelatedProduct
