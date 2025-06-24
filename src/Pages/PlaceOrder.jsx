import React from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { SiPaytm } from "react-icons/si";
import { SiRazorpay } from "react-icons/si";
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [method, setMethod] = React.useState('cod'); // default to Cash On Delivery

  
  const { navigate } = usecontext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-around gap-4 p-5 sm:pt-14 min-h-[80vh] border-t '>

      {/* left side  */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATIN'} />
        </div>
        <div className="flex gap-3  ">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className="flex gap-3  ">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className="flex gap-3  ">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip Code' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone Number' />
      </div>

      {/* Right side of the page  */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12 ">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* payment method selection */}
          <div className="flex gap-3 ">
            <div onClick={()=>setMethod('paytm')}  className="felx items-center gap-3 border p-2 px-3 cursor-pointer">
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paytm' ? 'bg-green-400': '' }`}></p>
              <SiPaytm className='size-12 mx-2' />
            </div>
            <div onClick={()=>setMethod('razorpay')}  className="felx items-center gap-3 border p-2 px-3 cursor-pointer">
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400': '' }`}></p>
              <SiRazorpay className='size-8 m-2' />
            </div>
            <div onClick={()=>setMethod('cod')} className="felx items-center gap-3 border p-2 px-3 cursor-pointer">
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400': '' }`}></p>
              <p  className='text-gray-500 text-sm font-medium mx-4' > Cash On Delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={()=> navigate('/order')} className='bg-black text-white px-16 py-3 text-sm rounded'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
