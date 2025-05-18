import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../Components/Title';
import ProductItem from '../Components/ProductItem';

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


  const sortFilter =()=>{

    switch (sortType) {
      case 'low-high':
        setFilterProducts((prev) => [...prev].sort((a, b) => (a.price - b.price)));
        break;

        case 'high-low':
          setFilterProducts((prev) => [...prev].sort((a,b)=>(b.price - a.price)))
    
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-8 ">
        {/* Filter Sidebar */}
        <div className="min-w-60 p-5 rounded-lg shadow-md">
          <h2 onClick={() => setShowFilter(!showFilter)} className="text-3xl opacity-65 font-light cursor-pointer">
            Filter
          </h2>

          <div className={`flex flex-col gap-2 mt-5 ${showFilter ? '' : 'hidden'} sm:hidden md:block`}>
            <p className="mb-3 text-sm font-medium">Category</p>

            {categories.gender.map((cat) => (
              <label key={cat} className="flex items-center space-x-2 cursor-pointer select-none">
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
                  onChange={() => toggleCategory(cat)}
                  className="hidden"
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}

            <hr className="m-4 opacity-30" />

            <p className="mb-3 text-sm font-medium">Type</p>

            {categories.wear.map((cat) => (
              <label key={cat} className="flex items-center space-x-2 cursor-pointer select-none">
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
          <div className="flex justify-between text-base sm:text-2xl mx-3 mb-4">
            <Title text1={'All '} text2={'COLLECTION'} />

            <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-4 gap-y-2">
            {filterProducts.map((item, index) => (
              <div key={index} className="w-full h-full">
                <ProductItem
                  id={item.id}
                  image={item.image}
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
