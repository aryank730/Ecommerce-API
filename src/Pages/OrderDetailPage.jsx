import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userApi from '../services/userApi';

const OrderDetailPage = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const statusSteps = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];


  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    userApi.get(`/orders/by-number/${orderNumber}`)
      .then((res) => setOrder(res.data))
      .catch(() => console.error('Failed to load order details'));
  }, [orderNumber]);

  if (!order) return <p className="p-4">Loading order details...</p>;
  console.log('order', order);
  const token = localStorage.getItem('token');
  console.log('Token:', token); // debug


  const currentStep = statusSteps.indexOf(order.status);
  const handleDownloadInvoice = async () => {
    try {
      const token = localStorage.getItem('access_token_user'); // Adjust based on where your token is stored
      const response = await fetch(`https://atelierluphien.com/api/orders/${order.id}/invoice`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to download invoice');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${order.order_number}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Failed to download invoice.');
    }
  };


  return (
    <div className="max-w-4xl shadow-md bg-whitep border-b-1 m-6 rounded-lg hover:shadow-sm bg-white hover:shadow-gray-800 mx-auto my-6 px-6">

      <div className="text-2xl text-black   mt-8 pt-6 m-8 p-8">Order #{order.order_number}</div>

      <div className="flex items-center  m-8 ">

        {statusSteps.map((step, idx) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${idx <= currentStep ? 'bg-green-600' : 'bg-gray-400'
                }`}
            ></div>
            {idx < statusSteps.length - 1 && (
              <div className="w-8 h-1 bg-gray-300 mx-1"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-around text-gray-700 p-6 m-6">
        <div >
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.total_amount}</p>
        </div>
        <div >
          <p className="text-xl  font-semibold">Products:</p>
          <ul>
            {order.details.map((item) => (
              <li key={item.id}>
                {item.product.name} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="m-6 justify-between flex">
        <button onClick={handleDownloadInvoice} className="m-6 p-6 items-center bg-amber-400 px-4 py-2 rounded text-black font hover:bg-amber-500 trandition-300">
          Download Invoice PDF
        </button>

        <button onClick={handleGoBack} className="m-6 p-6 items-center bg-gray-600 px-4 py-2 rounded text-white font hover:bg-zinc-800 trandition-300">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
