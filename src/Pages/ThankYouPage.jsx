import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import thankss from '../assets/thankss.png';

const ThankYouPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  // Redirect to home if no order data
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  const handleDownload = () => {
    // Navigate to order details page with order number
    navigate(`/orders/${order.order_number}`, { state: { order } });
  };

  return (
    <>
      <div className="max-w-4xl md:mx-auto m-6 md:m-12 p-6">
        <div className="flex items-center">
          <div className="">
          <h1 className="text-3xl font-bold text-green-700 mb-4 p-12">Thank You for Your Order...</h1>
          <div className=" text-black hidden md:block">
          <p className="mb-2">Order Number: <strong>{order.order_number}</strong></p>
        <p className="mb-2">Total Amount: ₹{order.total_amount}</p>
        <p className="mb-2">Payment Option: {order.payment_option.replaceAll('_', ' ')}</p>
        </div>

          </div>
          <img className="w-[50%]" src={thankss} alt="Thank You" />
        </div>

        <div className=" text-black block md:hidden mt-4">
          <p className="mb-2">Order Number: <strong>{order.order_number}</strong></p>
        <p className="mb-2">Total Amount: ₹{order.total_amount}</p>
        <p className="mb-2">Payment Option: {order.payment_option.replaceAll('_', ' ')}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-around px-4  bg-white rounded border-b text-zinc-600">
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <p>{order.shipping_address.address}</p>
            <p>{order.shipping_address.street}, {order.shipping_address.area}</p>
            <p>Phone: {order.shipping_address.phone}</p>
            <p>Zipcode: {order.shipping_address.zipcode}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Order Items</h2>
            <div className="space-y-4 mt-2">
              {order.details.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border p-3 "
                >
                  <img
                    src={`https://atelierluphien.com/${item.product.thumbnail?.local_path}`}
                    alt={item.product.name}
                    className="w-20 h-full object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="m-auto mb-2  text-center">
        <button
          onClick={handleDownload}
          className="bg-zinc-600 mb-2 hover:bg-zinc-800 text-white px-4 py-2 rounded"
        >
          Download Invoice and Track Order
        </button>
      </div>
    </>
  );
};

export default ThankYouPage;
