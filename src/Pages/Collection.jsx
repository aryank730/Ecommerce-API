import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../Components/Title';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
  const [checkedCategories, setCheckedCategories] = useState({
    men: false,
    women: false,
    kids: false
  });

  const handleCheckboxChange = (category) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const categories = {
    gender: ['men', 'women', 'kids'],
    wear: ['T-shirt', 'Pants', 'Shoes'],
    accessories: ['Bags', 'Watches', 'Sunglasses'],

  }

  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setFilterProducts(products)
  }, [])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-8 ">
        {/* filter option  */}
        <div className="min-w-60  p-5 rounded-lg shadow-md">
          <h2 onClick={() => setShowFilter(!showFilter)} className="text-3xl opacity-65 font-light">Filter</h2>

          {/* category filter */}
          <div className={`flex flex-col gap-2 mt-5 m-auto ${showFilter ? '' : 'hidden'} sm:hidden md:block`}>
            <p className="mb-3 text-sm font-medium">Category</p>

            {categories.gender.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer select-none">
                <span
                  className={`relative w-5 h-5 border rounded transition-all duration-200 
                    ${checkedCategories[category]
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-400'
                    }`}
                >
                  <svg
                    className={`absolute top-[3px] left-[2px] w-3 h-3 stroke-white transition-all duration-300`}
                    viewBox="0 0 12 10"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '16',
                      strokeDashoffset: checkedCategories[category] ? '0' : '16',
                    }}
                  >
                    <polyline points="1.5 6 4.5 9 10.5 1" />
                  </svg>
                </span>
                <input
                  type="checkbox"
                  value={category}
                  checked={checkedCategories[category]}
                  onChange={() => handleCheckboxChange(category)}
                  className="hidden"
                />
                <span className="capitalize">{category}</span>
              </label>
            ))}

            <hr className='m-4 opacity-30' />


            <p className="mb-3 text-sm font-medium">Type</p>

            {categories.wear.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer select-none">
                <span
                  className={`relative w-5 h-5 border rounded transition-all duration-200 
                    ${checkedCategories[category]
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-400'
                    }`}
                >
                  <svg
                    className={`absolute top-[3px] left-[2px] w-3 h-3 stroke-white transition-all duration-300`}
                    viewBox="0 0 12 10"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '16',
                      strokeDashoffset: checkedCategories[category] ? '0' : '16',
                    }}
                  >
                    <polyline points="1.5 6 4.5 9 10.5 1" />
                  </svg>
                </span>
                <input
                  type="checkbox"
                  value={category}
                  checked={checkedCategories[category]}
                  onChange={() => handleCheckboxChange(category)}
                  className="hidden"
                />
                <span className="capitalize">{category}</span>
              </label>
            ))}


            {/* <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className='glex gap-4'>
                <input className='w-3' type="checkbox" value={'men'} />Men
              </p>
              <p className='glex gap-2'>
                <input className='w-3' type="checkbox" value={'women'} />Women
              </p>
              <p className='glex gap-2'>
                <input className='w-3' type="checkbox" value={'kids'} />Kids
              </p>
            </div> */}
          </div>
        </div>

        {/* Right side */}

        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mx-3 mb-4">
            <Title text1={'All '} text2={'COLLECTION'} />

            {/* PRoduct short */}
            <select className='border-2 border-gray-300 text-sm px-2' name="" id="">
              <option value="relevent">Sort by : Relevent</option>
              <option value="low-high">Sort by : Low to Hign</option>
              <option value="high-low">Sort by : Hign to Low</option>
            </select>
          </div>

          {/* map products */}
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-4 gap-y-2">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item.id} price={item.price} image={item.image} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;

