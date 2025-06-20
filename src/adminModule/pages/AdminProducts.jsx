import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api'; // Adjust path as per your structure
import { useAuth } from '../contexts/AuthContext';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/products', {
          params: {
            search: searchTerm,
            page: currentPage,
            limit: productsPerPage,
          },
        });
         console.log('product', response.data.products);
        setProducts(response.data.products);
        setTotalCount(response.data.count);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, currentPage]);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        toast.success('Product deleted successfully');
        setProducts((prev) => prev.filter((product) => product.id !== productId));
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const totalPages = Math.ceil(totalCount / productsPerPage);

  return (
    <div className="container-fluid">
      <div className="row page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active"><span>Users</span></li>
          <li className="breadcrumb-item"><span>Management</span></li>
        </ol>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title">Products Management</h4>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1); // reset to page 1 on search
                setSearchTerm(e.target.value);
              }}
            />
            {user.roles.includes('super_admin') && (
              <Link to="/admin/products/new" className="btn btn-primary">
                Add New Product
              </Link>
            )}
          </div>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id}>
                       
                        
                          <td>
                            <img
src={product.thumbnail?.local_path 
  ? `http://localhost:3000/${product.thumbnail.local_path}` 
  : '/images/default-product.png'}
                              alt={product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                          </td>
                          <td>{product.name}</td>
                         <td>${Number(product.price).toFixed(2)}</td>

                          <td>{product.stock}</td>
                          <td>{product.category?.name || 'Uncategorized'}</td>
                          <td>
                            <span className={`badge ${product.isActive ? 'bg-success' : 'bg-secondary'}`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                to={`/admin/products/${product.id}`}
                                className="btn btn-sm btn-info"
                              >
                                View
                              </Link>
                              <Link
                                to={`/admin/products/${product.id}/edit`}
                                className="btn btn-sm btn-warning"
                              >
                                Edit
                              </Link>
                              {user.roles.includes('admin') && (
                                <button
                                  onClick={() => handleDelete(product.id)}
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
                        <td colSpan="7" className="text-center">No products found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
