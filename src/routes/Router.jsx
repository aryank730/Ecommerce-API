import { useLocation } from 'react-router-dom';
import App from '../App';
import ShopContextProvider from '../context/ShopContext';
import AdminApp from '../adminModule/AdminApp';
import { AuthProvider } from '../adminModule/contexts/AuthContext';

const AppRouter = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <AuthProvider>
        <AdminApp />
      </AuthProvider>
    );
  }

  return (
      <ShopContextProvider>

      <App />
    </ShopContextProvider>
  );
};

export default AppRouter;
