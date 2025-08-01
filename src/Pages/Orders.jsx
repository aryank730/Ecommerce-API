import React, { useEffect, useState } from 'react'
import api from '../adminModule/services/api';
import { Link } from 'react-router-dom';
import userApi from '../services/userApi';

const Orders = () => {
const [orders, setOrders] = useState([]);

  useEffect(() => {
    userApi.get('/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Failed to load orders', err));
  }, []);

  if (!orders.length) return <p className="p-6">You have no orders yet.</p>;

  return (
    <div className="max-w-5xl mb-6 md:mt-6 border border-amber-800 mx-auto p-6">

   {/* <ThankYouPage order={someOrderObject} /> */}

      <h1 className="text-xl font-bold m-2">My Orders</h1>
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 p-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-zinc-600 p-4 shadow-md bg-white border-b-1 rounded-lg hover:shadow-sm hover:shadow-green-600 transition"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Order #{order.order_number}</p>
                <p className="text-sm text-gray-600">
                  Total: ₹{order.total_amount} • Status: {order.status}
                </p>
              </div>
              <Link
                to={`/orders/${order.order_number}`}
                className="text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>

            {order.details?.length > 0 && (
              <div className="flex gap-2 mt-2">
                {order.details.slice(0, 3).map((item) => (
                  <img
                    key={item.id}
                    src={`https://atelierluphien.com/${item.product.thumbnail?.local_path}`}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Orders
