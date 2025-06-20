import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import Navbar from './AdminNavbar';
import Footer from './AdminFooter';

const AdminLayout = () => {
  return (
    
      <div>
        <Sidebar />
        <div className="content-body">
          <Navbar />
          <div className="content-wrapper">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    
  );
};

export default AdminLayout;