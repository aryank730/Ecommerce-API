import React from 'react'

function OurPolicy() {
   
   const handleSubmit =(e)=>{
      e.preventDefault();
      const email = e.target.email.value;
      const tags = e.target.tags.value;
      console.log(email, tags);
      // Add your form submission logic here
   }

   return (
      <div>
         <div class="flex h-full justify-center items-center ">
            <div class="p-6">
               <div
                  class="flex flex-wrap items-center w-full max-w-5xl p-5 mx-auto text-left border  border-gray-500 rounded-lg lg:flex-nowrap md:p-8 ">
                  <div class="flex-1 w-full mb-5 md:mb-0 md:pr-5 lg:pr-10 md:w-1/2">
                     <h3 class="mb-2 text-2xl font-bold  ">Subscribe to Newsletter</h3>
                     <p class="text-gray-500  ">Provide your email to get email notification when we launch
                        new
                        products or publish new articles
                     </p>
                  </div>
                  <div class="w-full px-1 flex-0 md:w-auto lg:w-1/2">
                     <form novalidate="">
                        <input type="hidden" name="tags" value="earlyaccess" />
                        <div class="flex flex-col sm:flex-row">
                           <input type="email" id="email" name="email" placeholder="Enter your email address" class="flex-1 px-3 py-2 placeholder-gray-700 border border-gray-300 rounded-md sm:mr-5 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300  " />
                           <button onClick={handleSubmit} type="submit" class="w-full px-6 py-4 mt-5 text-black text-lg  rounded-md sm:mt-0 sm:w-auto whitespace-nowrap "> Subscribe </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default OurPolicy
