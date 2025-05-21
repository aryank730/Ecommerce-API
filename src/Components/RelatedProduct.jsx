import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({ category, subCategory }) => {
   const { products } = useContext(ShopContext)
   const [related, setRelated] = useState([])

   useEffect(() => {
      if (products.length > 0) {
         let productCopy = products.slice()
         productCopy = productCopy.filter((item) => category === item.category);
         productCopy = productCopy.filter((item) => category === item.subCategory);

         setRelated(productCopy.slice(0, 5))
      }
   }, [products, category, subCategory])

   return (
      <div>
         <div className="my-24">
            <div className="text-center text-3xl py-2">
               <Title text1={'RELATED'} text2= {'PRODUCTS'}/>
            </div>

            <div className="grid grid-col-2 sm:grid-col-3 md:grid-col-4 lg:grid-col-5 gap-4 gap-y-6">
               {related.map((item, index) => (
                  <ProductItem
                     key={index}
                     id={item.id}
                     name={item.name}
                     image={item.image[0]}
                     price={item.price}
                     currency='₹'/>
               ))}
            </div>
         </div>
      </div>
   )
}

export default RelatedProduct
