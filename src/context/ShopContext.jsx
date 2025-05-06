import {React, createContext} from 'react'
import { products} from '../assets/assets'

export const ShopContext = createContext()

const ShopContext = (props) => {

   const currency = '₹'
   const taxdelivery_fee = 40
  
   const value = {
    products,
    currency,
    delivery_fee,
   }
}

return (
   <ShopContext.Provider value={value}>
      {props.children}
   </ShopContext.Provider>
)

export default ShopContext
