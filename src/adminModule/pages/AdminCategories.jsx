import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        toast.error('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? Products in this category will become uncategorized.')) {
      try {
        await api.delete(`/categories/${categoryId}`);
        setCategories(categories.filter(category => category._id !== categoryId));
        toast.success('Category deleted successfully');
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const toggleStatus = async (categoryId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await api.put(`/categories/${categoryId}/status`, { isActive: newStatus });
      setCategories(categories.map(category => 
        category._id === categoryId ? { ...category, isActive: newStatus } : category
      ));
      toast.success('Category status updated');
    } catch (error) {
      toast.error('Failed to update category status');
    }
  };

  if (loading) return <div className="text-center">Loading categories...</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="card-title">Categories Management</h4>
        {user.roles.includes('admin') && (
          <Link to="/admin/categories/new" className="btn btn-primary">
            Add New Category
          </Link>
        )}
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Products</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description || '-'}</td>
                    <td>{category.productCount || 0}</td>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={category.isActive}
                          onChange={() => toggleStatus(category._id, category.isActive)}
                          disabled={!user.roles.includes('admin')}
                        />
                        <label className="form-check-label">
                          {category.isActive ? 'Active' : 'Inactive'}
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/admin/categories/${category._id}/edit`}
                          className="btn btn-sm btn-warning"
                        >
                          Edit
                        </Link>
                        {user.roles.includes('admin') && (
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No categories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;