import React from 'react'
// import { Helmet } from "react-helmet-async"

const SEO {title: string , description: String } = ({ title, description, }) => {
   return (
      <Helmet>
         <title>{title}</title>
         <meta name="description" content={description} />
         {/* <link rel="canonical" href="https://www.example.com/home" />
        <meta property="og:title" content="Home Page" />
        <meta property="og:description" content="This is a sample description for the home page." />
        <meta property="og:image" content="https://www.example.com/image.jpg" />
        <meta property="og:url" content="https://www.example.com/home" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Page" />
        <meta name="twitter:description" content="This is a sample description for the home page." />
        <meta name="twitter:image" content="https://www.example.com/image.jpg" />
        <meta name="twitter:url" content="https://www.example.com/home" />
        <meta name="keywords" content="home, sample, react, helmet" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" /> */}
      </Helmet>
   )
}

export default SEO;
