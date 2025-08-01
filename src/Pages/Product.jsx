import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import RelatedProducts from "../Components/RelatedProduct";
import { RiHeartAdd2Fill } from "react-icons/ri";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";
import { Helmet } from 'react-helmet-async';
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { LiaCottonBureau } from "react-icons/lia";

const Product = () => {
  const { productId } = useParams();
  const { slug } = useParams();

  const { products, currency, addTocart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);

  // useEffect(() => {
  //   const product = products.find((item) => item.id === parseInt(productId));
  //   if (product) {
  //     setProductData(product);

  //     const allImages = [];
  //     if (product.thumbnail?.local_path) {
  //       allImages.push(
  //         `https://atelierluphien.com/${product.thumbnail.local_path}`
  //       );
  //     }
  //     if (product.images?.length) {
  //       product.images.forEach((img) => {
  //         allImages.push(`https://atelierluphien.com/${img.local_path}`);
  //       });
  //     }

  //     setImages(allImages);
  //     setSelectedImage(allImages[0] || "");
  //   }
  // }, [productId, products]);

  useEffect(() => {
  if (!slug || !products?.length) return;

  const product = products.find((item) => item.slug === slug);
  if (product) {
    setProductData(product);
    
    const allImages = [];
    if (product.thumbnail?.local_path) {
      allImages.push(`https://atelierluphien.com/${product.thumbnail.local_path}`);
    }
    if (product.images?.length) {
      product.images.forEach((img) => {
        allImages.push(`https://atelierluphien.com/${img.local_path}`);
      });
    }

    setImages(allImages);
    setSelectedImage(allImages[0] || "");
  }
}, [slug, products]);

  const getSelectedVariant = () => {
    return (productData?.stockLabels || []).find(
      (label) =>
        label.size.id === selectedSizeId && label.color.id === selectedColorId
    );
  };

  // useEffect(() => {
  //   const selected = getSelectedVariant();
  //   if (selected?.productStockImages?.[0]?.file?.local_path) {
  //     setSelectedImage(`https://atelierluphien.com/${selected.productStockImages[0].file.local_path}`);
  //   }
  //   console.log('selected', selected);

  // }, [selectedSizeId, selectedColorId]);

  const handleAddToCart = () => {
    const variant = getSelectedVariant();
    if (!variant) {
      alert("Please select both size and color");
      return;
    }
    addTocart(productData.id, variant.id); // stockLabelId
  };

  if (!productData) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="pt-12 mt-2 m-1 md:mt-12">
       <Helmet>
    <title>{productData.name} | Atelier Luphien</title>
    <meta name="description" content={productData.description?.substring(0, 150)} />
    <meta property="og:title" content={productData.name} />
    <meta property="og:description" content={productData.description?.substring(0, 150)} />
    <meta property="og:image" content={`https://atelierluphien.com/${productData.thumbnail?.local_path}`} />
    <meta property="og:url" content={`https://atelierluphien.com/product/${productData.slug}`} />
      <link rel="canonical" href={`https://atelierluphien.com/product/${productData.slug}`} />

    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productData.name,
        "image": `https://atelierluphien.com/${productData.thumbnail?.local_path}`,
        "description": productData.description,
        "sku": productData.id,
        "offers": {
          "@type": "Offer",
          "url": `https://atelierluphien.com/product/${productData.slug}`,
          "priceCurrency": "INR",
          "price": productData.price,
          "availability": (productData.stockLabels || []).some(s => s.quantity > 0)
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        }
      })}
    </script>
  </Helmet>
      <div className="flex h-full md:h-screen flex-col md:flex-row justify-around items-start max-w-6xl mx-auto  p-4 sm:p-8 bg-white shadow-md rounded-lg">
        {/* Left - Images */}
        <div className=" m-2 m-auto gap-8 sm:gap-12">
          {/* Thumbnails */}

          {/* Main Image and Variant Images */}
          <div className="w-full shadow m-auto sm:w-[80%]">
            <img
              className="w-[28rem] rounded-lg mb-4  h-fit object-contain"
              src={selectedImage}
              alt={productData.name}
            />
          </div>

          <div className="flex flex-col items-start gap-5">
            <div className="flex sm:flex-col overflow-x-auto items-start sm:overflow-y-auto sm:h-auto  gap-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  src={img}
                  alt={productData.name}
                  className={`w-16 rounded-md h-auto object-cover cursor-pointer border ${
                    img === selectedImage
                      ? "border-orange-400"
                      : "hover:border-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right - Details */}
        <div className="flex-1 hide-scrollbar overflow-y-hidden scrollbar-hide md:overflow-y-auto scrollbar-none scroll-smooth h-full px-1.5 md:py-4 my-2 sm:my-0 py-4 sm:py-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {productData.name}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            {productData.description}
          </p>

          {/* Size Selector */}
          {/* Size Selector */}
          <div className="my-3">
            <span className="font-bold text-gray-700">Select Size:</span>
            <div className="flex items-center mt-2 flex-wrap gap-2">
              {[
                ...new Map(
                  productData.stockLabels.map((l) => [l.size.id, l.size])
                ).values(),
              ].map((size) => {
                const isDisabled = !productData.stockLabels.some(
                  (l) => l.size.id === size.id && l.quantity > 0
                );
                return (
                  <button
                    onClick={() => !isDisabled && setSelectedSizeId(size.id)}
                    key={size.id}
                    className={`py-2 px-4 rounded-full font-bold transition border ${
                      selectedSizeId === size.id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isDisabled}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-4 rounded mt-4">
            <span className="font-bold rounded text-gray-700">
              Select Color:
            </span>
            <div className="flex rounded items-center mt-2 flex-wrap gap-2">
              {(() => {
                const availableColors = selectedSizeId
                  ? productData.stockLabels
                      .filter(
                        (l) => l.size.id === selectedSizeId && l.quantity > 0
                      )
                      .map((l) => l.color.id)
                  : [];

                return [
                  ...new Map(
                    productData.stockLabels.map((l) => [l.color.id, l.color])
                  ).values(),
                ].map((color) => {
                  const isDisabled =
                    selectedSizeId && !availableColors.includes(color.id);
                  return (
                    <div
                      key={color.id}
                      onClick={() =>
                        !isDisabled && setSelectedColorId(color.id)
                      }
                      className={`w-8 h-8 rounded cursor-pointer border-2 ${
                        selectedColorId === color.id
                          ? "border-orange-500"
                          : isDisabled
                          ? "opacity-30 border-gray-300 cursor-not-allowed"
                          : "border-gray-400"
                      }`}
                      style={{ backgroundColor: color.hex_code }}
                    ></div>
                  );
                });
              })()}
            </div>
          </div>

          {/* Variant Image Thumbnails */}
          {selectedSizeId && selectedColorId && (
            <div className="mt-4">
              <span className="font-bold text-gray-700">
                Available Variants:
              </span>
              <div className="flex flex-wrap gap-3 mt-2">
                {productData.stockLabels
                  .filter(
                    (label) =>
                      label.size.id === selectedSizeId &&
                      label.color.id === selectedColorId &&
                      label.quantity > 0
                  )
                  .map((variant) => (
                    <img
                      key={variant.id}
                      src={`https://atelierluphien.com/${variant.productStockImages?.[0]?.file?.local_path}`}
                      alt="Variant"
                      onClick={() =>
                        setSelectedImage(
                          `https://atelierluphien.com/${variant.productStockImages?.[0]?.file?.local_path}`
                        )
                      }
                      className={`w-16 h-16 object-cover border rounded cursor-pointer hover:border-orange-500 ${
                        selectedImage.includes(
                          variant.productStockImages?.[0]?.file?.local_path
                        )
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    />
                  ))}
              </div>
            </div>
          )}

          <div className=" mb-4 gap-6">
            <div>
              <span className="font-bold text-gray-700">Price:</span>
              <span className="text-gray-600">
                {" "}
                {currency} {productData.price}
              </span>
            </div>
            <div>
              <span className="font-bold text-gray-700">Availability:</span>
              <span className="text-gray-600 ml-1">
                {(productData.stockLabels || []).some((s) => s.quantity > 0)
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Coupon Info */}
          {productData.offer_coupon?.is_active && (
            <div className="mt-2 text-green-600 font-semibold text-sm">
              💸 Coupon "{productData.offer_coupon.code}" - ₹
              {productData.offer_coupon.discount_value} OFF
            </div>
          )}

          {/* work on that make add to like cloath button  */}

          <div className="relative mt-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-5">
              {/* Add to Wishlist Button */}
              {/* <button
                onClick={() => addTocart(productData.id)}
                className="bg-green-500 order-2 md:order-1 hover:bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>
                    <RiHeartAdd2Fill size={18} />
                  </span>
                  <span>Add to Wishlist</span>
                </div>
              </button> */}

              {/* Add to Cart Button */}
              <div className="sm:static sticky bottom-2 z-50 order-1 md:order-2">
                <button
                  onClick={() => addTocart(productData.id)}
                  className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded w-full sm:w-auto"
                >
                  <div className="flex gap-2 items-center justify-center">
                    <span>
                      <BsFillBagCheckFill size={18} />
                    </span>
                    <span>Add to Cart</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <hr className="mt-10 sm:w-4/5" />

          <div className="text-sm text-gray-700 mt-1 flex flex-col md:flex-row w-auto h-auto  gap-4">
            <div className="flex gap-2">
              <span>
                <VscWorkspaceTrusted />
              </span>
              <span> 100% Original Product</span>
            </div>
            {/* <div className='flex gap-2'><span><FaTruckFast /></span><span>COD Available</span></div> || */}
            <div className="flex gap-2">
              <span>
                <RiHeartAdd2Fill />
              </span>
              <span>Free Shipping</span>
            </div>
            <div className="flex gap-2">
              <span>
                <GiReturnArrow />
              </span>
              <span>7 Days Exchange Policy</span>
            </div>
          </div>

          <hr className="mt-10 sm:w-4/5" />

          {/* Product Description */}
          <div className="mt-2">
            <button class="cursor-pointer text-zinc-100 flex gap-2 items-center rounded-[18px] bg-gray-400 mb-3 px-2 py-1 font-medium text-sm hover:bg-[#484848] transition-all ease-in duration-200">
              <MdOutlineProductionQuantityLimits /> Description:
            </button>
            <div className="flex flex-col gap-0  p-0 md:p-6 text-sm text-gray-500 text-left">
              <div class="max-w-auto bg-zinc-50   overflow-hidden p-4 mx-4 justify-around  border-b border-gray-200 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-lg hover:scale-105 relative group">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-30 blur-md"></div>
                <div class="p-0 md:p-6 relative z-10 ">
                  <div className="flex flex-col md:flex-row justify-between items-left">
                    <p class="text-md font-semibold text-gray-800">
                      Classic Cotton Biowash
                    </p>
                    <div class="flex items-center mt-0 text-gray-600">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 fill-current text-yellow-500"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                      <span class="ml-2">4.8 Rank</span>
                    </div>
                  </div>
                  <div class="flex mt-0 text-sm text-gray-600 gap-4">
                    <div className="">
                      <LiaCottonBureau size={74} />
                    </div>
                    <p>
                      {" "}
                      Our classic blue jeans are a timeless addition to your
                      wardrobe. Crafted from premium denim, they offer both
                      style and comfort. Perfect for any casual occasion.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <hr className="mt-8 sm:w-4/5" /> */}

          {/* Product Reviews */}
          {/* <div className="mt-2">
            <button
              class="cursor-pointer text-zinc-100 flex gap-2 items-center rounded-[18px] bg-gray-400 mb-3 px-2 py-1 font-medium text-sm hover:bg-[#484848] transition-all ease-in duration-200"
            ><MdReviews />   Review
            </button>

            <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consectetur cupiditate suscipit ratione modi dolore nulla reiciendis.</p>
              <p>Ex obcaecati optio, tempora quidem nihil labore hic voluptate officia at totam, ab rerum! Eius sequi fugit corporis aliquid tempora placeat facere.</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  );
};

export default Product;
