import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BannerList = () => {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const res = await api.get('/banners');
      setBanners(res.data);
    } catch {
      toast.error('Failed to fetch banners');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this banner?')) return;
    try {
      await api.delete(`/banners/${id}`);
      toast.success('Deleted successfully');
      fetchBanners();
    } catch {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Banner List</h4>
        <Link to="/admin/banners/me" className="btn btn-success">+ Create Banner</Link>
      </div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Preview</th>
            <th>Title</th>
            <th>Link</th>
            <th>Status</th>
            <th style={{ width: 100 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, idx) => (
            <tr key={banner.id}>
              <td>{idx + 1}</td>
              <td>
                <img src={banner.file?.url} alt="" style={{ height: 60 }} />
              </td>
              <td>{banner.title}</td>
              <td><a href={banner.link} target="_blank" rel="noreferrer">{banner.link}</a></td>
              <td>
                <span className={`badge ${banner.is_active ? 'bg-success' : 'bg-secondary'}`}>
                  {banner.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <Link to={`/admin/banners/${banner.id}/edit`} className="btn btn-sm btn-warning me-1">Edit</Link>
                <button onClick={() => handleDelete(banner.id)} className="btn btn-sm btn-danger">Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannerList;
