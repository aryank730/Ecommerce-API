import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import Navbar from './AdminNavbar';
import Footer from './AdminFooter';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="content-wrapper">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;