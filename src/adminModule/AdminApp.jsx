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
import './vendor/jquery-nice-select/css/nice-select.css';
import './vendor/nouislider/nouislider.min.css';
import './css/style.css';


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
<Route path="orders" element={<AdminOrders />} />
<Route path="categories" element={<AdminCategories />} />
<Route path="reviews" element={<AdminReviews />} />
<Route path="stats" element={<AdminStats />} />

      </Route>
    </Routes>
  );
};

export default AdminApp;
