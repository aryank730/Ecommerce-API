import { useContext, useEffect, useState } from 'react';
import  ShopContext  from '../context/ShopContext';
import Title from '../Components/Title';
import ProductItem from '../Components/ProductItem';
import { IoFilter } from "react-icons/io5";
import {Helmet, HelmetProvider } from 'react-helmet-async'

const Collection = () => {
  const categories = {
    gender: ['men', 'women', 'kids'],
    wear: ['T-shirt', 'Pants', 'Shoes'],
    accessories: ['Bags', 'Watches', 'Sunglasses'],
  };



  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState({});
  const [sortType, setSortType] = useState('relevant');

  useEffect(() => {
    // Initialize checkbox states
    const initialStates = {};
    [...categories.gender, ...categories.wear, ...categories.accessories].forEach(cat => {
      initialStates[cat] = false;
    });
    setCheckedCategories(initialStates);
  }, []);

  const toggleCategory = (cat) => {
    setCheckedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));

    setCategory(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleSubCategory = (cat) => {
    setCheckedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));

    setSubCategory(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(filtered);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filterProducts]);


  const sortFilter = () => {

    let fpcopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpcopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpcopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortFilter();
  }, [sortType]);


  return (
    <div>
      <Helmet>
        <title>Collection</title>
        <meta name="Fashion Collection" content="Collect Collaction of Lexury Fashion" />
        <meta name="keywords" content="Atelier Collaction, Fashion Collaction, Collaction of lexury, luxury fashion" />
        <meta name="author" content="Atelier Luphien" />
          <link rel="canonical" href="https://atelierluphien.com/collection" />

      </Helmet>
      <div className="flex flex-col m-auto z-100 sm:flex-row gap-1 sm:gap-10 mt-1 ">
        {/* Filter Sidebar */}
        <div style={{
          background: 'rgba(147, 147, 147, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }} className="min-w-64  md:max-w-64 sm:h-auto md:h-screen px-3 pt-0 md:pt-4 rounded-b-md shadow-md sticky top-16 md:top-20 rounded-md">
          <div onClick={() => setShowFilter(!showFilter)} className="text-lg w-fit m-1 flex items-center gap-2 border-b px-3 text-black border-t rounded shadow opacity-75 font-light cursor-pointer">
            <span><IoFilter /></span> Filter
          </div>

          <div className={`flex flex-col gap-2 mt-2  ${showFilter ? '' : 'hidden'} sm:hidden md:block`}>
            <p className="mb-3 text-sm text-black font-medium">Category</p>

            {categories.gender.map((cat) => (
              <label key={cat} className="flex-cols text-left border-b md:border-b-0 py-1 px-2  text-gray-700 gap-5 rounded-md border-r items-center space-x-2 cursor-pointer select-none">
                <span
                  className={`relative w-5 h-5 gap-3 border rounded transition-all duration-200 
                    ${checkedCategories[cat] ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}
                >
                  <svg
                    className="absolute top-[3px] left-[2px] w-3 h-3 stroke-black"
                    viewBox="0 0 12 10"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '16',
                      strokeDashoffset: checkedCategories[cat] ? '0' : '16',
                      transition: 'stroke-dashoffset 0.3s'
                    }}
                  >
                    <polyline points="1.5 6 4.5 9 10.5 1" />
                  </svg>
                </span>
                <input
                  type="checkbox"
                  value={cat}
                  checked={checkedCategories[cat]}
                  onChange={() => toggleCategory(cat)}
                  className="hidden"
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}

            <hr className="m-2 opacity-50" />

            <p className="mb-3 text-sm text-black font-medium">Type</p>

            {categories.wear.map((cat) => (
              <label key={cat} className="flex text-left border-b md:border-b-0  py-1 px-2 text-black gap-5 rounded-md border-r items-center space-x-2 cursor-pointer select-none">
                <span
                  className={`relative w-5 h-5 border rounded transition-all duration-200 
                    ${checkedCategories[cat] ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}
                >
                  <svg
                    className="absolute top-[3px] left-[2px] w-3 h-3 stroke-white"
                    viewBox="0 0 12 10"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '16',
                      strokeDashoffset: checkedCategories[cat] ? '0' : '16',
                      transition: 'stroke-dashoffset 0.3s'
                    }}
                  >
                    <polyline points="1.5 6 4.5 9 10.5 1" />
                  </svg>
                </span>
                <input
                  type="checkbox"
                  value={cat}
                  checked={checkedCategories[cat]}
                  onChange={() => toggleSubCategory(cat)}
                  className="hidden"
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center text-center justify-around text-base sm:text-lg mx-8 mt-4 -mb-8">
            <Title className="sm:text-lg mx-2 mt-2"  text2={'COLLECTION'} />

            <select onChange={(e) => setSortType(e.target.value)} className="border rounded-md border-gray-800 sm:text-lg mx-3 mb-4 text-xs px-2 py-1 focus:outline-none border-b focus:ring-2 focus:ring-gray-400">
              <option className='p-3 rounded' value="relevant">Sort by: Relevant</option>
              <option className='p-3 rounded' value="low-high">Sort by: Low to High</option>
              <option className='p-3 rounded' value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4  gap-1.5 md:gap-3 lg:gap-3  justify-around p-2 mt-2 mb-2  gap-y-2">
            {filterProducts.map((item, index) => (
              <div key={index} className="w-full h-full">
                <ProductItem
                  id={item.id}
                  image={`https://atelierluphien.com/${item.thumbnail.local_path}`}
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
