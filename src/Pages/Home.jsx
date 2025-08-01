import React, { useEffect } from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import Banner from '../Components/Banner'
import Red_carpet from './Red_carpet'
import Icondisc from './NewArrival'
import {Helmet, HelmetProvider } from 'react-helmet-async'

const Home = () => {
  useEffect(() => {
  fetch('https://atelierluphien.com/api/visitor/users');
}, []);
  return (
    <>
      <Helmet>
  <title>Luxury Fashion by Atelier Luphien | Home</title>
  <meta name="description" content="Discover Atelier Luphien's luxury fashion collection designed by top artists. Explore our latest arrivals and exclusive designs." />
  <meta name="keywords" content="Luxury Fashion, Atelier Luphien, Designer Clothes, New Arrivals, Fashion Brand, Men's Fashion, Women's Fashion" />
  <meta name="author" content="Atelier Luphien" />
    <link rel="canonical" href="https://atelierluphien.com/" />


  {/* Open Graph */}
  <meta property="og:title" content="Luxury Fashion by Atelier Luphien | Home" />
  <meta property="og:description" content="Shop Atelier Luphien's luxury collection of artistic fashion wear." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://atelierluphien.com/" />
  <meta property="og:image" content="https://atelierluphien.com/images/white_logo.png" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Luxury Fashion by Atelier Luphien | Home" />
  <meta name="twitter:description" content="Explore new arrivals and exclusive pieces from Atelier Luphien's luxury fashion brand." />
  <meta name="twitter:image" content="https://atelierluphien.com/images/white_logo.png" />
</Helmet>

      <Hero />
      {/* <Icondisc/> */}
      {/* <Red_carpet/> */}
      <LatestCollection />
      <Banner />

      {/* <BestSeller/> */}
      {/* <OurPolicy/> */}
    </>
  )
}

export default Home
