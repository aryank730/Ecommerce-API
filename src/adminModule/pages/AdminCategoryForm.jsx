import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminCategoryForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    parent_id: '',
    file_id: '',
    is_active: true,
  });

  const [categories, setCategories] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Load categories and category (if editing)
  useEffect(() => {
    fetchCategories();

    if (isEditMode) {
      api.get(`/categories/${id}`)
        .then((res) => {
          const category = res.data;
          setFormData({
            name: category.name || '',
            parent_id: category.parent?.id || '',
            file_id: category.file?.id || '',
            is_active: category.is_active ?? true,
          });
          setPreviewUrl(category.file?.url || ''); // show existing image
        })
        .catch(() => toast.error('Failed to load category'));
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories/tree');
      setCategories(res.data);
    } catch {
      toast.error('Failed to load categories');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileUpload = async (e) => {
    const form = new FormData();
    form.append('file', e.target.files[0]);

    try {
      const res = await api.post('/files/upload', form);
      setFormData((prev) => ({
        ...prev,
        file_id: res.data.id,
      }));
      setPreviewUrl(res.data.url);
      toast.success('File uploaded successfully');
    } catch {
      toast.error('File upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      parent_id: formData.parent_id || null,
      file_id: formData.file_id || null,
      is_active: Boolean(formData.is_active),
    };

    try {
      if (isEditMode) {
        await api.put(`/categories/${id}`, payload);
        toast.success('Category updated');
      } else {
        await api.post('/categories', payload);
        toast.success('Category created');
      }
      navigate('/admin/categories');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h4>{isEditMode ? 'Edit Category' : 'Create Category'}</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Parent Category</label>
          <select
            className="form-control"
            name="parent_id"
            value={formData.parent_id}
            onChange={handleChange}
          >
            <option value="">None</option>
            {categories
              .filter((cat) => cat.id.toString() !== id) // prevent selecting self
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Thumbnail</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>

        {previewUrl && (
          <div className="mb-3">
            <img
              src={previewUrl}
              alt="Preview"
              className="img-thumbnail"
              style={{ maxWidth: 200 }}
            />
          </div>
        )}

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          <label className="form-check-label">Active</label>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/categories')}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCategoryForm;
