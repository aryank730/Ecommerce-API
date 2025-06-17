import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="text-center">
              &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;