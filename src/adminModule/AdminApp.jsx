import { Routes, Route } from 'react-router-dom';
import AdminLogin from './Components/auth/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './Components/common/ProtectedRoute';
// Add more imports as needed
import AdminLayout from './Components/AdminLayout';
import UserList from './Components/Users/UserList';
import UserForm from './Components/Users/UserForm';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminCategories from './pages/AdminCategories';
import AdminReviews from './pages/AdminReviews';
import AdminStats from './pages/AdminStats';
import AdminProductForm from './pages/AdminProductForm';
import AdminOfferCoupon from './pages/AdminOfferCoupons';
import AdminOfferCouponForm from './pages/AdminOfferCouponForm';
import './vendor/jquery-nice-select/css/nice-select.css';
import './vendor/nouislider/nouislider.min.css';
import './css/style.css';
import AdminCategoryForm from './pages/AdminCategoryForm';
import BannerForm from './pages/BannerForm';
import BannerList from './pages/BannerList';



const AdminApp = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRoles={['admin', 'super_admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
<Route path="users" element={<UserList />} />
<Route path="users/new" element={<UserForm />} />
<Route path="users/:id/edit" element={<UserForm />} />
<Route path="products" element={<AdminProducts />} />
<Route path="products/new" element={<AdminProductForm />} />
<Route path="orders" element={<AdminOrders />} />
<Route path="categories" element={<AdminCategories />} />
<Route path="categories/new" element={<AdminCategoryForm />} />
<Route path="categories/:id/edit" element={<AdminCategoryForm />} />
<Route path="banners" element={<BannerList />} />
<Route path="banners/new" element={<BannerForm />} />
<Route path="banners/:id/edit" element={<BannerForm />} />
<Route path="reviews" element={<AdminReviews />} />
<Route path="stats" element={<AdminStats />} />
<Route path="offer/coupon" element={<AdminOfferCoupon />} />
<Route path="offer/new" element={<AdminOfferCouponForm />} />
<Route path="offer/:id/edit" element={<AdminOfferCouponForm />} />

      </Route>
    </Routes>
  );
};

export default AdminApp;
