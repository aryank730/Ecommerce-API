import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminOfferCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: "all", status: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [modalCoupon, setModalCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await api.get("/offer-coupons");
      setCoupons(response.data);
    } catch (error) {
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        await api.delete(`/offer-coupons/${id}`);
        setCoupons((prev) => prev.filter((c) => c.id !== id));
        toast.success("Coupon deleted");
      } catch {
        toast.error("Failed to delete coupon");
      }
    }
  };

  const toggleStatus = async (coupon) => {
    try {
      const updated = { ...coupon, is_active: !coupon.is_active };
      await api.put(`/offer-coupons/${coupon.id}`, updated);
      setCoupons((prev) =>
        prev.map((c) => (c.id === coupon.id ? updated : c))
      );
      toast.success("Coupon status updated");
    } catch {
      toast.error("Failed to update coupon status");
    }
  };

  const filtered = coupons.filter((c) => {
    return (
      (filter.type === "all" || c.discount_type === filter.type) &&
      (filter.status === "all" ||
        (filter.status === "active" && c.is_active) ||
        (filter.status === "inactive" && !c.is_active))
    );
  });

  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  if (loading) return <div>Loading offer coupons...</div>;

  return (
    <div className="container-fluid">
      <div className="row page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">Product</li>
          <li className="breadcrumb-item">Offer Coupons</li>
        </ol>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title">Offer Coupons</h4>
          <div className="d-flex gap-3">
            <select
              value={filter.type}
              className="form-select"
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>
            <select
              value={filter.status}
              className="form-select"
              onChange={(e) =>
                setFilter({ ...filter, status: e.target.value })
              }
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
             <Link to="/admin/offer/new" className="btn btn-primary">
                            Add New Product
                          </Link>
          </div>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Type</th>
                <th>Valid From</th>
                <th>Valid Until</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.code}</td>
                  <td>
                    {coupon.discount_type === "percentage"
                      ? `${coupon.discount_value}%`
                      : `₹${coupon.discount_value}`}
                  </td>
                  <td>{coupon.discount_type}</td>
                  <td>{new Date(coupon.valid_from).toLocaleDateString()}</td>
                  <td>{new Date(coupon.valid_until).toLocaleDateString()}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={coupon.is_active}
                        onChange={() => toggleStatus(coupon)}
                      />
                      <label className="form-check-label">
                        {coupon.is_active ? "Active" : "Inactive"}
                      </label>
                    </div>
                  </td>
                  <td>
                    <Link
  to={`/admin/offer/${coupon.id}/edit`}
  className="btn btn-sm btn-info me-2"
>
  Edit
</Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(coupon.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No coupons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <li
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages && "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default AdminOfferCoupon;
