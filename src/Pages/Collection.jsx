import { useContext, useEffect, useState } from 'react';
import ShopContext from '../context/ShopContext';
import Title from '../Components/Title';
import ProductItem from '../Components/ProductItem';
import { IoFilter } from "react-icons/io5";
import { Helmet } from 'react-helmet-async';

const PRICE_RANGES = [
  { label: "0 - 100", min: 0, max: 100 },
  { label: "100 - 200", min: 100, max: 200 },
  { label: "200 - 400", min: 200, max: 400 },
  { label: "400 - 1000", min: 400, max: 1000 },
  { label: "1000 - 2000", min: 1000, max: 2000 },
  { label: "2000+", min: 2000, max: Infinity }
];

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [categoriesData, setCategoriesData] = useState({});
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  // Extract categories/subcategories dynamically
  useEffect(() => {
    if (products.length) {
      const grouped = {};
      const allSizes = new Set();
      const allColors = new Map();

      products.forEach(item => {
        const mainCat = item.category?.parent?.name || "Other";
        const subCat = item.category?.name;

        if (!grouped[mainCat]) grouped[mainCat] = new Set();
        if (subCat) grouped[mainCat].add(subCat);

        // Sizes
        item.stockLabels?.forEach(sl => {
          if (sl.size?.name) allSizes.add(sl.size.name);
        });

        // Colors
        item.stockLabels?.forEach(sl => {
          if (sl.color?.name) allColors.set(sl.color.name, sl.color.hex_code);
        });
      });

      const catObj = {};
      for (const key in grouped) {
        catObj[key] = Array.from(grouped[key]);
      }
      setCategoriesData(catObj);
      setSizeOptions(Array.from(allSizes));
      setColorOptions(Array.from(allColors, ([name, hex]) => ({ name, hex })));
    }
  }, [products]);

  const toggleFilter = (value, setter) => {
    setter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (category.length) {
      filtered = filtered.filter(item =>
        category.includes(item.category?.parent?.name)
      );
    }

    if (subCategory.length) {
      filtered = filtered.filter(item =>
        subCategory.includes(item.category?.name)
      );
    }

    if (sizes.length) {
      filtered = filtered.filter(item =>
        item.stockLabels?.some(sl => sizes.includes(sl.size?.name))
      );
    }

    if (colors.length) {
      filtered = filtered.filter(item =>
        item.stockLabels?.some(sl => colors.includes(sl.color?.name))
      );
    }

    if (priceRanges.length) {
      filtered = filtered.filter(item => {
        const price = parseFloat(item.price);
        return priceRanges.some(range => price >= range.min && price < range.max);
      });
    }

    setFilterProducts(filtered);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sizes, colors, priceRanges]);

  const sortFilter = () => {
    let fpcopy = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpcopy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpcopy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortFilter();
  }, [sortType]);

  const filterButtonClass = (isActive) =>
    `px-3 py-1 rounded-md border cursor-pointer transition-all ${
      isActive ? "bg-blue-600 text-white border-blue-600" : "border-gray-400 text-gray-700"
    }`;

  return (
    <div>
      <Helmet>
        <title>Collection</title>
      </Helmet>

      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        {/* Filter Sidebar */}
        <div
          style={{
            background: 'rgba(147, 147, 147, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
          className="min-w-64 md:max-w-64 px-3 py-4 rounded-md shadow-md sticky top-20"
        >
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="text-lg flex items-center gap-2 border-b pb-1 cursor-pointer"
          >
            <IoFilter /> Filter
          </div>

          <div className={`flex flex-col gap-4 mt-4 ${showFilter ? '' : 'hidden'} sm:block`}>
            {/* Categories */}
            {Object.keys(categoriesData).map((mainCat) => (
              <div key={mainCat}>
                <p className="mb-2 text-sm font-medium capitalize">{mainCat}</p>
                <div className="flex flex-wrap gap-2">
                  {categoriesData[mainCat].map((subCat) => (
                    <span
                      key={subCat}
                      className={filterButtonClass(subCategory.includes(subCat))}
                      onClick={() => toggleFilter(subCat, setSubCategory)}
                    >
                      {subCat}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Sizes */}
            <div>
              <p className="mb-2 text-sm font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map(size => (
                  <span
                    key={size}
                    className={filterButtonClass(sizes.includes(size))}
                    onClick={() => toggleFilter(size, setSizes)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <p className="mb-2 text-sm font-medium">Color</p>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <span
                    key={color.name}
                    className={filterButtonClass(colors.includes(color.name))}
                    onClick={() => toggleFilter(color.name, setColors)}
                    style={{ borderColor: color.hex }}
                  >
                    <span
                      className="inline-block w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    {color.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="mb-2 text-sm font-medium">Price</p>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map(range => (
                  <span
                    key={range.label}
                    className={filterButtonClass(priceRanges.some(r => r.label === range.label))}
                    onClick={() =>
                      toggleFilter(range, setPriceRanges)
                    }
                  >
                    {range.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center px-4">
            <Title text2={'COLLECTION'} />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4">
            {filterProducts.map((item) => (
              <ProductItem
                key={item.id}
                id={item.id}
                slug={item.slug}
                image={`https://atelierluphien.com/${item.thumbnail.local_path}`}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
