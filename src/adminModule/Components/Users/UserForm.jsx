import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const UserForm = () => {
  const { id } = useParams();
    const [productsData, setProductsData] = useState({ products: [], count: 0 });

  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    roles: [],
  });
  const [availableRoles, setAvailableRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEditMode = !!id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEditMode) {
          const response = await api.get(`/users/${id}`);
          setFormData({
            name: response.data.name || '',
            email: response.data.email || '',
            phone: response.data.phone || '',
            password: '',
            roles: response.data.roles || [],
          });
        }
        
        // Fetch available roles (you might need to create an endpoint for this)
        const rolesResponse = await api.get('/users/roles');
        setAvailableRoles(rolesResponse.data);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => {
      const newRoles = prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles: newRoles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditMode) {
        await api.put(`/users/${id}`, formData);
      } else {
        await api.post('/users', formData);
      }
      navigate('/users');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">{isEditMode ? 'Edit User' : 'Create User'}</h4>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isEditMode}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          {!isEditMode && (
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!isEditMode}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Roles</label>
            <div className="d-flex flex-wrap gap-3">
              {availableRoles.map((role) => (
                <div key={role.name} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`role-${role.name}`}
                    checked={formData.roles.includes(role.name)}
                    onChange={() => handleRoleChange(role.name)}
                    disabled={role.name === 'super_admin' && !currentUser?.roles?.includes('super_admin')}
                  />
                  <label className="form-check-label" htmlFor={`role-${role.name}`}>
                    {role.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/users')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;