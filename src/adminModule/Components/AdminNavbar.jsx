import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle">
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="navbar-right">
        <div className="user-profile">
          <span className="user-name">{user?.name || user?.email}</span>
          <div className="user-avatar">
            {user?.name?.charAt(0) || user?.email?.charAt(0)}
          </div>
          <div className="dropdown-menu">
            <Link to="/admin/profile" className="dropdown-item">
              Profile
            </Link>
            <button onClick={handleLogout} className="dropdown-item">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;