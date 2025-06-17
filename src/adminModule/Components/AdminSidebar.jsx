import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const isActive = (path) => pathname.includes(path) ? 'mm-active' : '';

  return (
    <div className="dlabnav">
      <div className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          <li className="dropdown header-profile">
            <a className="nav-link" href="javascript:void(0);" role="button">
              <img src="/images/profile/pic1.jpg" width="20" alt="Profile" />
              <div className="header-info ms-3">
                <span className="font-w600">Hi, <b>Admin</b></span>
                <small className="text-end font-w400">admin@example.com</small>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <Link to="/admin/profile" className="dropdown-item ai-icon">
                <i className="text-primary flaticon-381-user"></i>
                <span className="ms-2">Profile</span>
              </Link>
              <Link to="/admin/inbox" className="dropdown-item ai-icon">
                <i className="text-success flaticon-381-inbox"></i>
                <span className="ms-2">Inbox</span>
              </Link>
              <Link to="/logout" className="dropdown-item ai-icon">
                <i className="text-danger flaticon-381-exit"></i>
                <span className="ms-2">Logout</span>
              </Link>
            </div>
          </li>

          <li className={`has-arrow ai-icon ${isActive('/dashboard')}`}>
            <a href="javascript:void(0);" aria-expanded="false">
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text">Dashboard</span>
            </a>
            <ul aria-expanded="false">
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/stats">Stats</Link></li>
            </ul>
          </li>

          <li className={`has-arrow ai-icon ${isActive('/users')}`}>
            <a href="javascript:void(0);" aria-expanded="false">
              <i className="flaticon-381-user"></i>
              <span className="nav-text">Users</span>
            </a>
            <ul aria-expanded="false">
              <li><Link to="/admin/users">User List</Link></li>
            </ul>
          </li>

          <li className={`has-arrow ai-icon ${isActive('/products')}`}>
            <a href="javascript:void(0);" aria-expanded="false">
              <i className="flaticon-381-box"></i>
              <span className="nav-text">Products</span>
            </a>
            <ul aria-expanded="false">
              <li><Link to="/admin/products">Product List</Link></li>
              <li><Link to="/admin/categories">Categories</Link></li>
            </ul>
          </li>

          <li className={`has-arrow ai-icon ${isActive('/orders')}`}>
            <a href="javascript:void(0);" aria-expanded="false">
              <i className="flaticon-381-notepad"></i>
              <span className="nav-text">Orders</span>
            </a>
            <ul aria-expanded="false">
              <li><Link to="/admin/orders">Order List</Link></li>
            </ul>
          </li>

          <li className={`has-arrow ai-icon ${isActive('/reviews')}`}>
            <a href="javascript:void(0);" aria-expanded="false">
              <i className="flaticon-381-star"></i>
              <span className="nav-text">Reviews</span>
            </a>
            <ul aria-expanded="false">
              <li><Link to="/admin/reviews">Review List</Link></li>
            </ul>
          </li>
        </ul>

        {/* <div className="copyright mt-4">
          <p><strong>Admin Panel</strong> © 2025 All Rights Reserved</p>
          <p className="fs-12">Made with ❤️ by You</p>
        </div> */}
      </div>
    </div>
  );
};

export default AdminSidebar;
