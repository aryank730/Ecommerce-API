import React from 'react'
import "./Red_carpet.css";
import srt5 from "../assets/8.png"
import srt9 from "../assets/6.png"
import srt6 from "../assets/8.png"
import degn from "../assets/7.png"
import graph2 from "../assets/2.png"
import srt7 from "../assets/9.png"
import poster from "../assets/POSTER.jpg"
import Banner2 from "../assets/Banner2.png"

function Red_carpet() {
   return (
      <>
         <div className='flexcardse my-4'>

            <div className="parent0">
               <img className="div01" src={srt5} alt="" />
               <img className="div02" src={srt9} alt="" />
            </div>

            <div className="parent">
               <img className="div1" src={srt7} alt="" />
               <img className="div2" src={srt9} alt="" />
               <img className="div3" src={degn} alt="" />
            </div>

            <div className="parent2">
               <img className="div4" src={graph2} alt="" />
               <img className="div5" src={srt6} alt="" />
               <img className="div6" src={srt7} alt="" />
            </div>

            <div className="parent3">
               <img className="div7" src={poster} alt="" />
            </div>
         </div>

         {/* below poster goes her  */}
{/* <div className='mid_line_Poster'>
         <img className='m-auto py-6' src={Banner2} alt="" /></div> */}
      </>
   )
}

export default Red_carpet
