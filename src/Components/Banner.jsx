import React from 'react'
import bannerImage from '../assets/banner.png';

const Banner = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-full">
  <div className="w-[94%]">
    <img className="rounded mx-auto" src={bannerImage} alt="banner" />
  </div>
</div>

    </div>
  )
}

export default Banner