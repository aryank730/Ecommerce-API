import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const BannerForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    link: '',
    file_id: '',
    is_active: true,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      api.get(`/banners/${id}`)
        .then((res) => {
          setForm({
            title: res.data.title,
            link: res.data.link,
            file_id: res.data.file?.id || '',
            is_active: res.data.is_active,
          });
          setPreviewUrl(res.data.file?.url);
        })
        .catch(() => toast.error('Failed to load banner'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      const res = await api.post('/files/upload', formData);
      setForm((prev) => ({ ...prev, file_id: res.data.id }));
      setPreviewUrl(res.data.url);
      toast.success('File uploaded');
    } catch {
      toast.error('File upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/banners/${id}`, form);
        toast.success('Banner updated');
      } else {
        await api.post('/banners', form);
        toast.success('Banner created');
      }
      navigate('/admin/banners');
    } catch (err) {
      toast.error('Failed to save banner');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h4>{isEditMode ? 'Edit Banner' : 'Create Banner'}</h4>
      <div className="mb-3">
        <label>Title</label>
        <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Link</label>
        <input className="form-control" name="link" value={form.link} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Banner Image</label>
        <input type="file" className="form-control" onChange={handleFileUpload} />
      </div>
      {previewUrl && <img src={previewUrl} alt="Banner Preview" style={{ maxHeight: 120 }} className="mb-3" />}
      <div className="form-check mb-3">
        <input type="checkbox" className="form-check-input" name="is_active" checked={form.is_active} onChange={handleChange} />
        <label className="form-check-label">Active</label>
      </div>
      <div className="d-flex gap-2 justify-content-end">
        <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/banners')}>Cancel</button>
        <button className="btn btn-primary" type="submit">{isEditMode ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
};

export default BannerForm;
