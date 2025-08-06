import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import App from '../App';
import AdminApp from '../adminModule/AdminApp';

import { ShopContextProvider } from '../context/ShopContext';
import { AuthProvider } from '../adminModule/contexts/AuthContext';

const AppRouter = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const body = document.body;
    const root = document.getElementById('root');

    if (isAdminRoute) {
      // Admin layout styles
      body.setAttribute('data-typography', 'cairo');
      body.setAttribute('data-theme-version', 'dark');
      body.setAttribute('data-layout', 'vertical');
      body.setAttribute('data-nav-headerbg', 'color_1');
      body.setAttribute('data-headerbg', 'color_1');
      body.setAttribute('data-sidebar-style', 'full');
      body.setAttribute('data-sidebarbg', 'color_1');
      body.setAttribute('data-sidebar-position', 'fixed');
      body.setAttribute('data-header-position', 'fixed');
      body.setAttribute('data-container', 'wide');
      body.setAttribute('direction', 'ltr');
      body.setAttribute('data-primary', 'color_1');

      if (root) {
        root.setAttribute('id', 'main-wrapper');
        root.classList.add('show');
      }
    } else {
      // Reset to user site defaults
      const mainWrapper = document.getElementById('main-wrapper');
      if (mainWrapper) {
        mainWrapper.setAttribute('id', 'root');
        mainWrapper.classList.remove('show');
      }

      body.removeAttribute('data-typography');
      body.removeAttribute('data-theme-version');
      body.removeAttribute('data-layout');
      body.removeAttribute('data-nav-headerbg');
      body.removeAttribute('data-headerbg');
      body.removeAttribute('data-sidebar-style');
      body.removeAttribute('data-sidebarbg');
      body.removeAttribute('data-sidebar-position');
      body.removeAttribute('data-header-position');
      body.removeAttribute('data-container');
      body.removeAttribute('direction');
      body.removeAttribute('data-primary');

      if (root) {
        root.setAttribute('id', 'root');
        root.classList.remove('show');
      }
    }
  }, [isAdminRoute]);

  // Admin App
  if (isAdminRoute) {
    return (
      <AuthProvider>
        <AdminApp />
      </AuthProvider>
    );
  }

  // User App
  return (
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  );
};

export default AppRouter;
