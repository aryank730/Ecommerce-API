import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminProductForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    quantity: '',
    thumbnail_id: '',
    is_featured: false,
    is_popular: false,
    is_new_arrival: false,
    is_top_selling: false,
    is_discounted_deal: false,
    is_active: true,
    offer_coupon_id: ''
  });

  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [coupons, setCoupons] = useState([]);


  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const [catRes, colorRes, sizeRes, couponRes] = await Promise.all([
        api.get('/categories'),
        api.get('/reviews/colors'),
        api.get('/reviews/sizes'),
        api.get('/offer-coupons'),
      ]);
      setCategories(catRes.data);
      setColors(colorRes.data);
      setSizes(sizeRes.data);
      setCoupons(couponRes.data.filter(c => c.is_active));
    } catch (err) {
      toast.error('Failed to load form options');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addStock = () => {
    setStocks([
      ...stocks,
      {
        color_id: '',
        size_id: '',
        label: '',
        start_range: '',
        end_range: '',
        quantity: '',
        file_ids: [],
      },
    ]);
  };

  const updateStock = (index, field, value) => {
    const updated = [...stocks];
    updated[index][field] = value;
    setStocks(updated);
  };

  const handleStockImageUpload = async (index, files) => {
  try {
    const ids = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file); // ✅ must be 'file'

      const res = await api.post('/files/upload', formData);
      ids.push(res.data.id);
    }

    const updated = [...stocks];
    updated[index].file_ids = ids;
    setStocks(updated);
  } catch {
    toast.error('Image upload failed');
  }
};


  const handleThumbnailUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      const res = await api.post('/files/upload', formData);
      setForm((prev) => ({
        ...prev,
        thumbnail_id: res.data.id,
      }));
    } catch {
      toast.error('Thumbnail upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        quantity: form.quantity ? parseInt(form.quantity) : undefined,
        category_id: parseInt(form.category_id),
        stocks: stocks.map((stock) => ({
          ...stock,
          color_id: parseInt(stock.color_id),
          size_id: parseInt(stock.size_id),
          start_range: parseInt(stock.start_range),
          end_range: parseInt(stock.end_range),
          quantity: parseInt(stock.quantity),
        })),
      };
      await api.post('/products', payload);
      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h4>Create Product</h4>

      <div className="mb-3">
        <label>Name</label>
        <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Category</label>
        <select className="form-control" name="category_id" value={form.category_id} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Price</label>
        <input className="form-control" name="price" type="number" value={form.price} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Quantity</label>
        <input className="form-control" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
      </div>
      <div className="mb-3">
  <label>Offer Coupon</label>
  <select
    className="form-control"
    name="offer_coupon_id"
    value={form.offer_coupon_id}
    onChange={handleChange}
  >
    <option value="">No Offer Coupon</option>
    {coupons.map((coupon) => (
      <option key={coupon.id} value={coupon.id}>
        {coupon.code} - {coupon.discount_type === 'percentage'
          ? `${coupon.discount_value}%`
          : `₹${coupon.discount_value}`}
      </option>
    ))}
  </select>
</div>

      <div className="mb-3">
        <label>Thumbnail</label>
        <input className="form-control" type="file" accept="image/*" onChange={handleThumbnailUpload} />
      </div>

      {/* Feature Flags */}
      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} />
        <label className="form-check-label">Featured</label>
      </div>

      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" name="is_popular" checked={form.is_popular} onChange={handleChange} />
        <label className="form-check-label">Popular</label>
      </div>

      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" name="is_new_arrival" checked={form.is_new_arrival} onChange={handleChange} />
        <label className="form-check-label">New Arrival</label>
      </div>

      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" name="is_top_selling" checked={form.is_top_selling} onChange={handleChange} />
        <label className="form-check-label">Top Selling</label>
      </div>

      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" name="is_discounted_deal" checked={form.is_discounted_deal} onChange={handleChange} />
        <label className="form-check-label">Discounted Deal</label>
      </div>

      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
        <label className="form-check-label">Active</label>
      </div>

      {/* Stock Management */}
      <div className="mt-4">
        <h5>Stock Options</h5>
        {stocks.map((stock, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <div className="row g-2">
              <div className="col-md-4">
                <label>Color</label>
                <select className="form-control" value={stock.color_id} onChange={(e) => updateStock(index, 'color_id', e.target.value)}>
                  <option value="">Select Color</option>
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>{color.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>Size</label>
                <select className="form-control" value={stock.size_id} onChange={(e) => updateStock(index, 'size_id', e.target.value)}>
                  <option value="">Select Size</option>
                  {sizes.map((size) => (
                    <option key={size.id} value={size.id}>{size.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>Label</label>
                <input className="form-control" value={stock.label} onChange={(e) => updateStock(index, 'label', e.target.value)} />
              </div>
              <div className="col-md-4">
                <label>Start Range</label>
                <input className="form-control" type="number" value={stock.start_range} onChange={(e) => updateStock(index, 'start_range', e.target.value)} />
              </div>
              <div className="col-md-4">
                <label>End Range</label>
                <input className="form-control" type="number" value={stock.end_range} onChange={(e) => updateStock(index, 'end_range', e.target.value)} />
              </div>
              <div className="col-md-4">
                <label>Quantity</label>
                <input className="form-control" type="number" value={stock.quantity} onChange={(e) => updateStock(index, 'quantity', e.target.value)} />
              </div>
              <div className="col-md-12">
                <label>Stock Images</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleStockImageUpload(index, e.target.files)}
                />
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-outline-primary mt-2" onClick={addStock}>
          + Add Stock Option
        </button>
      </div>

      <button type="submit" className="btn btn-success mt-4">
        Create Product
      </button>
    </form>
  );
};

export default AdminProductForm;
