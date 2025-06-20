import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminOfferCouponForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: '',
    discount_value: '',
    discount_type: 'flat',
    valid_from: '',
    valid_until: '',
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
     if (isEditMode) {
    api.get(`/offer-coupons/${id}`)
      .then(res => {
        const data = res.data;
        setFormData({
          code: data.code || '',
          discount_value:
            data.discount_value !== null && data.discount_value !== undefined
              ? parseFloat(data.discount_value).toFixed(2)
              : '',
          discount_type: data.discount_type || 'flat',
          valid_from: data.valid_from?.slice(0, 16) || '',
          valid_until: data.valid_until?.slice(0, 16) || '',
          is_active: !!data.is_active,
        });
      })
      .catch(() => toast.error('Failed to load coupon data'));
  }
}, [id, isEditMode]);

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === 'checkbox'
        ? checked
        : name === 'discount_value'
        ? parseFloat(value) || ''
        : value,
  }));
};


  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
         const payload = {
      ...formData,
      discount_value: parseFloat(formData.discount_value) || 0,
    };

      if (isEditMode) {
        await api.patch(`/offer-coupons/${id}`, payload);
        toast.success('Coupon updated successfully');
      } else {
        await api.post('/offer-coupons', formData);
        toast.success('Coupon created successfully');
      }
      navigate('/admin/offer/coupon');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card-header">
        <h4>{isEditMode ? 'Edit Coupon' : 'Create Coupon'}</h4>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Discount Value</label>
            <input
              type="number"
              name="discount_value"
              value={formData.discount_value}
              onChange={handleChange}
              className="form-control"
              step="0.01"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Discount Type</label>
            <select
              name="discount_type"
              value={formData.discount_type}
              onChange={handleChange}
              className="form-select"
            >
              <option value="flat">Flat</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Valid From</label>
            <input
              type="datetime-local"
              name="valid_from"
              value={formData.valid_from}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Valid Until</label>
            <input
              type="datetime-local"
              name="valid_until"
              value={formData.valid_until}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <label htmlFor="is_active" className="form-check-label">
              Active
            </label>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/admin/offer/coupon')}
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

export default AdminOfferCouponForm;
