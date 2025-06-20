import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import App from '../App';
import ShopContextProvider from '../context/ShopContext';
import AdminApp from '../adminModule/AdminApp';
import { AuthProvider } from '../adminModule/contexts/AuthContext';

const AppRouter = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  useEffect(() => {
    const body = document.body;
    const root = document.getElementById('root');

    // Set body attributes for admin panel
    if (isAdminRoute) {
      body.setAttribute('data-typography', 'cairo');
      body.setAttribute('data-theme-version', 'dark');
      body.setAttribute('data-layout', 'vertical');
      body.setAttribute('data-nav-headerbg', 'color_1');
      body.setAttribute('data-headerbg', 'color_1');
      body.setAttribute('data-sidebar-style', 'full');
      body.setAttribute('data-sibebarbg', 'color_1');
      body.setAttribute('data-sidebar-position', 'fixed');
      body.setAttribute('data-header-position', 'fixed');
      body.setAttribute('data-container', 'wide');
      body.setAttribute('direction', 'ltr');
      body.setAttribute('data-primary', 'color_1');

      // Change #root to #main-wrapper and add class="show"
      if (root) {
        root.setAttribute('id', 'main-wrapper');
        root.classList.add('show');
      }
    } else {
      // Reset body attributes for non-admin
      body.removeAttribute('data-typography');
      body.removeAttribute('data-theme-version');
      body.removeAttribute('data-layout');
      body.removeAttribute('data-nav-headerbg');
      body.removeAttribute('data-headerbg');
      body.removeAttribute('data-sidebar-style');
      body.removeAttribute('data-sibebarbg');
      body.removeAttribute('data-sidebar-position');
      body.removeAttribute('data-header-position');
      body.removeAttribute('data-container');
      body.removeAttribute('direction');
      body.removeAttribute('data-primary');

      // Reset root element
      if (root) {
        root.setAttribute('id', 'root'); // if it was changed, revert
        root.classList.remove('show');
      }

      // In case ID was changed in admin mode
      const mainWrapper = document.getElementById('main-wrapper');
      if (mainWrapper) {
        mainWrapper.setAttribute('id', 'root');
        mainWrapper.classList.remove('show');
      }
    }
  }, [isAdminRoute]);
  
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
