import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get(`/stats?range=${timeRange}`);
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [timeRange]);

  if (loading) return <div className="text-center">Loading statistics...</div>;
  if (!stats) return <div className="text-center">Failed to load statistics</div>;

  // Sales Chart Data
  const salesChartData = {
    labels: stats.salesOverTime.labels,
    datasets: [
      {
        label: 'Sales',
        data: stats.salesOverTime.data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Orders Chart Data
  const ordersChartData = {
    labels: stats.ordersOverTime.labels,
    datasets: [
      {
        label: 'Orders',
        data: stats.ordersOverTime.data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Product Categories Pie Chart
  const categoriesChartData = {
    labels: stats.topCategories.map(cat => cat.name),
    datasets: [
      {
        data: stats.topCategories.map(cat => cat.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Dashboard Overview</h4>
              <select
                className="form-select w-auto"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="card stat-card bg-primary text-white">
                    <div className="card-body">
                      <h5 className="card-title">Total Sales</h5>
                      <h2 className="card-text">${stats.totalSales.toFixed(2)}</h2>
                      <p className="mb-0">
                        {stats.salesChange >= 0 ? (
                          <span className="text-success">
                            <i className="fas fa-arrow-up"></i> {Math.abs(stats.salesChange)}%
                          </span>
                        ) : (
                          <span className="text-danger">
                            <i className="fas fa-arrow-down"></i> {Math.abs(stats.salesChange)}%
                          </span>
                        )} vs previous period
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card stat-card bg-success text-white">
                    <div className="card-body">
                      <h5 className="card-title">Total Orders</h5>
                      <h2 className="card-text">{stats.totalOrders}</h2>
                      <p className="mb-0">
                        {stats.ordersChange >= 0 ? (
                          <span className="text-success">
                            <i className="fas fa-arrow-up"></i> {Math.abs(stats.ordersChange)}%
                          </span>
                        ) : (
                          <span className="text-danger">
                            <i className="fas fa-arrow-down"></i> {Math.abs(stats.ordersChange)}%
                          </span>
                        )} vs previous period
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card stat-card bg-info text-white">
                    <div className="card-body">
                      <h5 className="card-title">Total Customers</h5>
                      <h2 className="card-text">{stats.totalCustomers}</h2>
                      <p className="mb-0">
                        {stats.customersChange >= 0 ? (
                          <span className="text-success">
                            <i className="fas fa-arrow-up"></i> {Math.abs(stats.customersChange)}%
                          </span>
                        ) : (
                          <span className="text-danger">
                            <i className="fas fa-arrow-down"></i> {Math.abs(stats.customersChange)}%
                          </span>
                        )} vs previous period
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card stat-card bg-warning text-dark">
                    <div className="card-body">
                      <h5 className="card-title">Avg. Order Value</h5>
                      <h2 className="card-text">${stats.avgOrderValue.toFixed(2)}</h2>
                      <p className="mb-0">
                        {stats.avgOrderChange >= 0 ? (
                          <span className="text-success">
                            <i className="fas fa-arrow-up"></i> {Math.abs(stats.avgOrderChange)}%
                          </span>
                        ) : (
                          <span className="text-danger">
                            <i className="fas fa-arrow-down"></i> {Math.abs(stats.avgOrderChange)}%
                          </span>
                        )} vs previous period
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Sales Over Time</h5>
            </div>
            <div className="card-body">
              <Line 
                data={salesChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Top Categories</h5>
            </div>
            <div className="card-body">
              <Pie 
                data={categoriesChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Orders Over Time</h5>
            </div>
            <div className="card-body">
              <Bar
                data={ordersChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Top Selling Products</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Sales</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topProducts.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.salesCount}</td>
                        <td>${product.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Recent Orders</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderId}</td>
                        <td>{order.user?.name || 'Guest'}</td>
                        <td>${order.totalAmount.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${getStatusColorClass(order.status)}`}>
                            {order.status}
                          </span>
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

// Helper function for status color
function getStatusColorClass(status) {
  switch (status) {
    case 'pending':
      return 'bg-warning text-dark';
    case 'processing':
      return 'bg-info text-white';
    case 'shipped':
      return 'bg-primary text-white';
    case 'delivered':
      return 'bg-success text-white';
    case 'cancelled':
      return 'bg-danger text-white';
    default:
      return 'bg-secondary text-white';
  }
}

export default AdminStats;