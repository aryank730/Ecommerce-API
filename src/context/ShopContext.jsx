import { createContext, useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import userApi from '../services/userApi';

const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);

export const ShopContextProvider = ({ children }) => {
  const currency = '₹';
  const delivery_fee = 40;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  // 🔁 Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await userApi.get('/products');
        setProducts(res.data.products);
      } catch (error) {
        toast.error('Failed to load products');
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // 🔁 Fetch cart if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token_user');
    if (token) {
      fetchCart();
    } else {
      console.warn('⚠️ No user token found, cart not fetched.');
    }
  }, []);

  // ✅ Fetch cart function
  const fetchCart = async () => {
    setIsCartLoading(true);
    setCartError(null);

    try {
      const res = await userApi.get('/cart');
      const details = res.data.details || [];

      const transformed = {};
      details.forEach((item) => {
        const productId = item.product.id;
        const quantity = item.quantity;
        transformed[productId] = quantity;
      });

      setCartItems(transformed);
    } catch (error) {
      setCartItems({}); // fallback to empty
      setCartError(error?.response?.data?.message || 'Cart fetch failed');
      console.error('❌ Cart fetch failed:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  // ✅ Add to cart + update count
  const addTocart = async (productId) => {
    if (!productId) return;

    try {
      const payload = {
        product_id: productId,
        quantity: 1,
      };

      await userApi.post('/cart/add', payload);
      toast.success('Item added to cart');
      await fetchCart(); // ✅ refresh cart state
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('❌ Add to cart failed:', error);
    }
  };

  // ✅ Get cart count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    isCartLoading,
    cartError,
    addTocart,
    getCartCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContext;
