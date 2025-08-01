import React from 'react'
import "./Icondisc.css";

function Icondisc() {

   const newarrive = [
      {
         id: "1",
         image: "/newarrive/27.png",
         mo_no: "02RP001",
         product_name: "Mural Tshirt",
         price_cut: "699",
         sell_prc: "499"
      },
      {
         id: "2",
         image: "/newarrive/28.png",
         mo_no: "02RP002",
         product_name: "Cotton Tshirt",
         price_cut: "899",
         sell_prc: "799"
      },
      {
         id: "3",
         image: "/newarrive/29.png",
         mo_no: "02RP003",
         product_name: "Acralic Tshirt",
         price_cut: "499",
         sell_prc: "499"
      },
      {
         id: "4",
         image: "/newarrive/30.png",
         mo_no: "02RP004",
         product_name: "Naylon Tshirt",
         price_cut: "499",
         sell_prc: "399"
      },
      {
         id: "5",
         image: "/newarrive/31.png",
         mo_no: "02RP005",
         product_name: "Mural Tshirt",
         price_cut: "899",
         sell_prc: "699"
      },
      {
         id: "6",
         image: "/newarrive/32.png",
         mo_no: "02RP006",
         product_name: "Sport Tshirt",
         price_cut: "999",
         sell_prc: "699"
      },
      {
         id: "7",
         image: "/newarrive/33.png",
         mo_no: "02RP007",
         product_name: "Cotton Tshirt",
         price_cut: "499",
         sell_prc: "299"
      },
      {
         id: "8",
         image: "/newarrive/34.png",
         mo_no: "02RP008",
         product_name: "Mural Tshirt",
         price_cut: "799",
         sell_prc: "599"
      },
      {
         id: "9",
         image: "/newarrive/29.png",
         mo_no: "02RP009",
         product_name: "Cotton Tshirt",
         price_cut: "899",
         sell_prc: "599"
      },
      {
         id: "10",
         image: "/newarrive/32.png",
         mo_no: "02RP010",
         product_name: "Mural Tshirt",
         price_cut: "999",
         sell_prc: "699"
      },
   ]

   {/*  const catagory = [
      {
         id: "1",
         image: "/Images/allshirt.png",
         title: "Round Neck Wear"
      },
      {
         id: "2",
         image: "/Images/printing.png",
         title: "Explore Mockups"
      },
      {
         id: "3",
         image: "/Images/sportsshirt.png",
         title: "Sports & Gym Wear"
      },
      {
         id: "4",
         image: "/Images/shirt.png",
         title: "Coller Mockups"
      },
      {
         id: "5",
         image: "/Images/vtshirt.png",
         title: "V Neck Wear"
      },
   ]*/}

   return (
      <div>
         <div className="w-[90%] m-auto my-4">
            <hr className=' opacity-50 ' />
            <h3 className='garlian-font text-3xl pt-4 pl-8 text-bold ' >New Arrival's <span className='text-xl text-white drop-shadow-lg shadow-black'>Be The First</span></h3>
         </div>
         <section id="Projects"
            class="flex w-[90%]  overflow-x-scroll overflow-y-hidden justify-items-center gap-y-20 gap-x-14 m-auto">

            {newarrive.map((naya_mal) => (
               <div key={naya_mal.id} class="w-56 h-fit lg:w-72 md:w-48 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                  <img src={naya_mal.image}
                     alt="Product" class="h-auto max-h-[920px] w-72 object-cover rounded-t-xl" />
                  <div class="p-4 -mt-10 w-56">
                     <span class="text-gray-400 mr-3 uppercase text-xs">{naya_mal.mo_no}</span>
                     <p class="text-md font-bold text-zinc-800 truncate block capitalize">{naya_mal.product_name}</p>
                     <div class="flex items-center">
                        <p class="text-lg font-semibold text-black cursor-auto ">${naya_mal.sell_prc}</p>
                        <del>
                           <p class="text-sm text-gray-600 cursor-auto ml-2">${naya_mal.price_cut}</p>
                        </del>
                        <div class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                           fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                           <path fill-rule="evenodd"
                              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                           <path
                              d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></div>
                     </div>
                  </div>
               </div>
            ))}

         </section>

         <div className="w-[90%] m-auto">
            <hr className='my-8 opacity-50 ' />
            <h3 className='garlian-font text-3xl  pl-8 text-bold ' >Atelier's Luxe Line <span className='text-xl text-white drop-shadow-lg shadow-black'> Designed to Dazzle</span></h3>
         </div>


         {/* category goes here  */}

         {/* <hr className='w-[80%] m-auto  opacity-70 ' />
         <div className='flexcard pt-10'>
            {catagory.map((neach) => (
               <div className="cdscard" key={neach.id}>
                  <div className="cdscard_form">
                     <img src={neach.image} alt={neach.title} />
                  </div>
                  <div className="cdscard_data">
                     <div className="cdsdata">
                        <div className="cdstext">
                           <div className="cdscube cdstext_s">
                              <label className="cdsside cdsfront">{neach.title}</label>
                           </div>
                        </div>
                     </div>
                     <span><button className="cssbuttons-io-button">
                        Explore
                     </button></span>
                  </div>
               </div>
            ))}
         </div>
         <hr className='w-[80%] m-auto  opacity-70 ' /> */}
      </div>
   )
}

export default Icondisc;
