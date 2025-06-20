import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/reviews/admin");
        setReviews(response.data);
      } catch (error) {
        toast.error("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const toggleReviewStatus = async (reviewId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await api.put(`/reviews/${reviewId}/status`, { isApproved: newStatus });
      setReviews(
        reviews.map((review) =>
          review._id === reviewId
            ? { ...review, isApproved: newStatus }
            : review
        )
      );
      toast.success("Review status updated");
    } catch (error) {
      toast.error("Failed to update review status");
    }
  };

  // Filter reviews
  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((review) =>
          filter === "approved" ? review.isApproved : !review.isApproved
        );

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  if (loading) return <div className="text-center">Loading reviews...</div>;

  return (
    <div className="container-fluid">
      <div className="row page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to="javascript:void(0)">Product</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="javascript:void(0)">Reviews</Link>
          </li>
        </ol>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Product Reviews</h4>
              <div className="d-flex align-items-center gap-3">
                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Reviews</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending Approval</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>User</th>
                      <th>Rating</th>
                      <th>Review</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReviews.length > 0 ? (
                      currentReviews.map((review) => (
                        <tr key={review._id}>
                          <td>
                            <Link
                              to={`/product/${review.product._id}`}
                              target="_blank"
                            >
                              {review.product.name}
                            </Link>
                          </td>
                          <td>{review.user.name}</td>
                          <td>
                            <div className="rating">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`fas fa-star ${
                                    i < review.rating
                                      ? "text-warning"
                                      : "text-secondary"
                                  }`}
                                ></i>
                              ))}
                            </div>
                          </td>
                          <td>{review.comment}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={review.isApproved}
                                onChange={() =>
                                  toggleReviewStatus(
                                    review._id,
                                    review.isApproved
                                  )
                                }
                              />
                              <label className="form-check-label">
                                {review.isApproved ? "Approved" : "Pending"}
                              </label>
                            </div>
                          </td>
                          <td>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this review?"
                                  )
                                ) {
                                  handleDelete(review._id);
                                }
                              }}
                              className="btn btn-sm btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No reviews found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
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
                        currentPage === totalPages ? "disabled" : ""
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
      </div>
    </div>
  );

  async function handleDelete(reviewId) {
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  }
};

export default AdminReviews;
