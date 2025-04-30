import React from 'react'
import { NavLink } from 'react-router-dom'
import { GiEgyptianProfile } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { TiThMenuOutline } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";

import { useState } from 'react';

const Navbar = () => {

   const [visible, setVisible] = useState(false);

   return (
      <>
         <div className="top-0 py-1 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
            <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
               <div className="flex items-center justify-between">
                  <button>
                     <div className="flex items-center space-x-2">
                        <h2 className="text-black dark:text-white font-bold text-2xl">
                           Company
                        </h2>
                     </div>
                  </button>
                  <div className="hidden lg:block">
                     <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
                        <NavLink to="/">
                           <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                              <p>Home</p>
                           </li></NavLink>

                        <NavLink to="/Collection">
                           <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                              <p>Collection</p>
                           </li>
                        </NavLink>

                        <NavLink to="/About">
                           <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                              <p>About</p>
                           </li>
                        </NavLink>

                        <NavLink to="/Contact">
                           <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                              <p>Contact</p>
                           </li>
                        </NavLink>
                     </ul>
                  </div>
                  {/* <div className="hidden lg:flex lg:items-center gap-x-2">
                     <button className="flex items-center text-black dark:text-white justify-center px-6 py-2.5 font-semibold">
                        Sign up
                     </button>
                     <button className="flex items-center justify-center rounded-md bg-[#4A3BFF] text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200">
                        Login
                     </button>
                  </div> */}

                  <div className=" flex gap-4">

                     <div className="group relative">
                        <GiEgyptianProfile size={28} className=" cursor-pointer" />
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-0">
                           <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                              <p className='cursor-pointer hover:text-black'>my Profile</p>
                              <p className='cursor-pointer hover:text-black'>Order</p>
                              <p className='cursor-pointer hover:text-black'>Logout</p>
                           </div>
                        </div>
                     </div>

                     <Link to='' className="relative">
                        <FaOpencart size={28} className=" " />
                        <p className='absolute right-[-12px] top-[-6px] w-4 text-center leading-4 bg-orange-600 text-white aspect-square rounded-full text-[8px]'>0</p>
                     </Link>

                     <div className="">

                     <TiThMenuOutline onClick={() => setVisible(true)} size="28" className="cursor-pointer sm:hidden" />
                     </div>

                  </div>

                  {/* set side bar for mobile */}
                  <div className={`absolute top-0 left-0 w-full overflow-scroll transition-all h-screen  z-20 ${visible ? 'block' : 'hidden'}`} onClick={() => setVisible(false)}>
                     <div className="flex flex-col pt-12 space-y-4 m-2  text-gray-600">
                        <div className="flex gap-4 items-center p-3 cursor-pointer">
                              <GiCrossMark size={28} onClick={()=>setVisible(false)} className="text-black" />
                        </div>

                        <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border rounded-2xl font-bold hover:black" to="/">Home</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border rounded-2xl font-bold hover:black" to="/Collection">Collection</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border rounded-2xl font-bold hover:black" to="/About">About</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border rounded-2xl font-bold hover:black" to="/Contact">Contact</NavLink>
                     </div>
                  </div>
               </div>
            </nav>
         </div>

      </>
   )
}

export default Navbar
