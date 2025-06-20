import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        setError('Failed to delete user');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    
      <div className="container-fluid">
        <div className="row page-titles">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active"><Link to="javascript:void(0)">Users</Link></li>
            <li className="breadcrumb-item"><Link to="javascript:void(0)">Management</Link></li>
          </ol>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title">User Management</h4>
                {currentUser?.roles?.includes('super_admin') && (
                  <Link to="/admin/users/new" className="btn btn-primary">
                    Add New User
                  </Link>
                )}
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-responsive-md">
                    <thead>
                      <tr>
                        <th style={{width: '80px'}}><strong>ID</strong></th>
                        <th><strong>NAME</strong></th>
                        <th><strong>EMAIL</strong></th>
                        <th><strong>PHONE</strong></th>
                        <th><strong>ROLES</strong></th>
                        <th><strong>STATUS</strong></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td><strong>{user.id}</strong></td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone || '-'}</td>
                          <td>
                            {user.roles?.join(', ') || 'No roles assigned'}
                          </td>
                          <td>
                            <span className={`badge light ${user.active ? 'badge-success' : 'badge-danger'}`}>
                              {user.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button type="button" className="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <rect x="0" y="0" width="24" height="24"></rect>
                                    <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                                    <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                                    <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                                  </g>
                                </svg>
                              </button>
                              <div className="dropdown-menu">
                                <Link className="dropdown-item" to={`/users/${user.id}`}>View</Link>
                                {currentUser?.roles?.includes('admin') && (
                                  <>
                                    <Link className="dropdown-item" to={`/users/${user.id}/edit`}>Edit</Link>
                                    <button 
                                      className="dropdown-item" 
                                      onClick={() => handleDelete(user.id)}
                                      disabled={user.id === currentUser.id}
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default UserList;