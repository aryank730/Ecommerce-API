import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import '../vendor/jquery-nice-select/css/nice-select.css';
import '../vendor/nouislider/nouislider.min.css';


const AdminSidebar = () => {
  const { pathname } = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  
  const isActive = (path) => pathname.includes(path) ? 'mm-active' : '';
  
  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  // Menu configuration
  const menuItems = [
    {
      key: 'dashboard',
      icon: 'flaticon-025-dashboard',
      text: 'Dashboard',
      path: '/dashboard',
      subItems: [
        { path: '/admin/dashboard', text: 'Dashboard Light' }
      ]
    },
    {
      key: 'apps',
      icon: 'flaticon-050-info',
      text: 'Apps',
      path: '/apps',
      subItems: [
        { path: '/app-profile', text: 'Profile' },
        { path: '/post-details', text: 'Post Details' }
      ]
    },
    {
      key: 'users',
      icon: 'flaticon-381-user',
      text: 'Users',
      path: '/users',
      subItems: [
        { path: '/admin/users', text: 'User List' }
      ]
    },
    {
      key: 'products',
      icon: 'flaticon-381-box',
      text: 'Products',
      path: '/products',
      subItems: [
        { path: '/admin/products', text: 'Product List' },
        { path: '/admin/categories', text: 'Categories' }
      ]
    },
    {
      key: 'offer',
      icon: 'flaticon-381-box',
      text: 'Offers',
      path: '/offer/coupon',
      subItems: [
        { path: '/admin/offer/coupon', text: 'Offer Coupon List' },
      ]
    },
    {
      key: 'orders',
      icon: 'flaticon-381-notepad',
      text: 'Orders',
      path: '/orders',
      subItems: [
        { path: '/admin/orders', text: 'Order List' }
      ]
    },
    {
      key: 'banners',
      icon: 'flaticon-381-notepad',
      text: 'Banners',
      path: '/banners',
      subItems: [
        { path: '/admin/banners', text: 'Banners List' }
      ]
    },
    {
      key: 'reviews',
      icon: 'flaticon-381-star',
      text: 'Reviews',
      path: '/reviews',
      subItems: [
        { path: '/admin/reviews', text: 'Review List' }
      ]
    }
  ];

  return (
    <div className="dlabnav">
      <PerfectScrollbar className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          <li className="dropdown header-profile">
            <Link 
              className="nav-link" 
              to="#" 
              role="button"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu('profile');
              }}
            >
              <img src="/images/profile/pic1.jpg" width="20" alt="Profile" />
              <div className="header-info ms-3">
                <span className="font-w600">Hi, <b>William</b></span>
                <small className="text-end font-w400">william@gmail.com</small>
              </div>
            </Link>
            <div className={`dropdown-menu dropdown-menu-end ${expandedMenus['profile'] ? 'show' : ''}`}>
              <Link to="/app-profile" className="dropdown-item ai-icon">
                <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="ms-2">Profile</span>
              </Link>
              <Link to="/email-inbox" className="dropdown-item ai-icon">
                <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="ms-2">Inbox</span>
              </Link>
              <Link to="/logout" className="dropdown-item ai-icon">
                <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className="ms-2">Logout</span>
              </Link>
            </div>
          </li>

          {menuItems.map((item) => (
            <li key={item.key} className={`has-arrow ai-icon ${isActive(item.path)} ${expandedMenus[item.key] ? 'mm-active' : ''}`}>
              <Link 
                to="#"
                aria-expanded={expandedMenus[item.key]}
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu(item.key);
                }}
              >
                <i className={item.icon}></i>
                <span className="nav-text">{item.text}</span>
              </Link>
              <ul aria-expanded={expandedMenus[item.key]}>
                {item.subItems.map((subItem) => (
                  <li key={subItem.path}>
                    <Link to={subItem.path}>{subItem.text}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        
        <div className="copyright">
          <p><strong>Dompet Payment Admin Dashboard</strong> © 2022 All Rights Reserved</p>
          <p className="fs-12">Made with <span className="heart"></span> by DexignLab</p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default AdminSidebar;