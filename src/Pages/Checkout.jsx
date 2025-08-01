import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../services/userApi';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [newAddress, setNewAddress] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [paymentOption, setPaymentOption] = useState('CASH_ON_DELIVERY');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    loadCart();
    loadAddresses();
  }, []);

  const loadCart = async () => {
    try {
      const res = await userApi.get('/cart');
      setCart(res.data);
    } catch (error) {
      toast.error('Failed to load cart');
    }
  };

  useEffect(() => {
    userApi.get('/user-addresses/countries/with-all')
      .then((res) => setCountries(res.data))
      .catch((err) => console.error('Country load error:', err));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      userApi.get(`/user-addresses/states/by-country/${selectedCountry}`)
        .then((res) => setStates(res.data))
        .catch((err) => console.error('State load error:', err));
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      userApi.get(`/user-addresses/cities/by-state/${selectedState}`)
        .then((res) => setCities(res.data))
        .catch((err) => console.error('City load error:', err));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const loadAddresses = async () => {
    try {
      const res = await userApi.get('/user-addresses');
      setAddresses(res.data);
    } catch (error) {
      toast.error('Failed to load addresses');
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const formattedAddress = {
      ...newAddress,
      country_id: Number(newAddress.country_id),
      state_id: Number(newAddress.state_id),
      city_id: Number(newAddress.city_id),
    };
    try {
      const res = await userApi.post('/user-addresses', formattedAddress);
      toast.success('Address added');
      setAddresses((prev) => [...prev, res.data]);
      setSelectedShipping(res.data.id);
      setSelectedBilling(res.data.id);
      setAddNew(false);
    } catch (error) {
      toast.error('Failed to add address');
    }
  };

  const handleOrderPlace = async () => {
    if (!selectedShipping || !selectedBilling) {
      toast.error('Please select shipping and billing addresses');
      return;
    }

    try {
      const res = await userApi.post('/orders', {
        cart_id: cart.id,
        shipping_address_id: selectedShipping,
        billing_address_id: selectedBilling,
        payment_option: paymentOption,
      });
      toast.success('Order placed successfully');
      navigate('/thank-you', { state: { order: res.data } });
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="p-2 md:p-12 m-2 md:my-16 m-auto rounded max-w-4xl md:m-auto">
      <h2 className="font-normal text-white w-fit py-1 px-2 rounded-md bg-gray-800 mx-0 mb-2">Checkout :</h2>

      {/* Address Section */}
      {addresses.length > 0 && !addNew ? (
        <div className="m-2 bg-white rounded px-2 py-4 shadow-md">
          {/* Shipping Address */}
          <div className="font-normal text-white w-fit py-1 px-2 rounded-md bg-gray-800 mx-2 mb-2">
            Select Shipping Address :
          </div>
          <fieldset className="mb-6">
            <legend className="sr-only">Shipping Address</legend>
            <div className="space-y-2">
              {addresses.map((a) => {
                const label = `${a.address}, ${a.city?.name}, ${a.state?.name}, ${a.zipcode}`;
                return (
                  <label
                    key={`shipping-${a.id}`}
                    htmlFor={`shipping-${a.id}`}
                    className={`flex cursor-pointer w-full relative items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 ${selectedShipping === a.id ? 'bg-blue-50' : ''
                      }`}
                  >
                    <div className="flex items-center top-4 -right-4 absolute">
                      <input
                        id={`shipping-${a.id}`}
                        type="radio"
                        name="shippingAddress"
                        className="size-4 rounded border-gray-300"
                        checked={selectedShipping === a.id}
                        onChange={() => setSelectedShipping(a.id)}
                      />
                    </div>
                    <div>
                      <strong className="font-medium text-gray-900">
                        Shipping Address #{a.id}
                      </strong>
                      <p className="mt-1 text-sm text-gray-700">{label}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <hr className="w-[80%]" />

          {/* Billing Address */}
          <div className="font-normal text-white w-fit py-1 px-2 rounded-md bg-gray-800 mx-2 mb-2">
            Select Billing Address :
          </div>
          <fieldset>
            <legend className="sr-only">Billing Address</legend>
            <div className="space-y-2">
              {addresses.map((a) => {
                const label = `${a.address}, ${a.city?.name}, ${a.state?.name}, ${a.zipcode}`;
                return (
                  <label
                    key={`billing-${a.id}`}
                    htmlFor={`billing-${a.id}`}
                    className={`flex cursor-pointer w-full relative items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 ${selectedBilling === a.id ? 'bg-blue-50' : ''
                      }`}
                  >
                    <div className="flex items-center top-4 -right-4 absolute">
                      <input
                        id={`billing-${a.id}`}
                        type="radio"
                        name="billingAddress"
                        className="size-4 rounded border-gray-300"
                        checked={selectedBilling === a.id}
                        onChange={() => setSelectedBilling(a.id)}
                      />
                    </div>
                    <div>
                      <strong className="font-medium text-gray-900">
                        Billing Address #{a.id}
                      </strong>
                      <p className="mt-1 text-sm text-gray-700">{label}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="text-sm text-blue-600 underline mb-4"
            onClick={() => setAddNew(false)}
          >
            ← Back to Saved Addresses
          </button>
          <h3 className="font-semibold mb-2">Add New Address</h3>
          <form onSubmit={handleAddressSubmit} className="grid gap-4 text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <input type="text" placeholder="Address" className="border rounded bg-white border-black p-2 w-full" onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} required />
            <input type="text" placeholder="Building" className="border rounded bg-white border-black p-2 w-full" onChange={(e) => setNewAddress({ ...newAddress, building: e.target.value })} required />
            <input type="text" placeholder="Street" className="border rounded bg-white border-black p-2 w-full" onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} required />
            <input type="text" placeholder="Area" className="border rounded bg-white border-black p-2 w-full" onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })} required />
            <input type="text" placeholder="Phone" className="border rounded bg-white border-black p-2 w-full" onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} required />
            <select className="border rounded bg-white border-black p-2 w-full" required value={selectedCountry} onChange={(e) => { const id = Number(e.target.value); setSelectedCountry(id); setNewAddress({ ...newAddress, country_id: id }); }}>
              <option value="">Select Country</option>
              {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select className="border rounded bg-white border-black p-2 w-full" required value={selectedState} onChange={(e) => { const id = Number(e.target.value); setSelectedState(id); setNewAddress({ ...newAddress, state_id: id }); }} disabled={!selectedCountry}>
              <option value="">Select State</option>
              {states.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select className="border rounded bg-white border-black p-2 w-full" required onChange={(e) => { const id = Number(e.target.value); setNewAddress({ ...newAddress, city_id: id }); }} disabled={!selectedState}>
              <option value="">Select City</option>
              {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
            </select>
            <input type="number" placeholder="Zipcode" className="border rounded bg-white border-black p-2 w-full" onChange={(e) => setNewAddress({ ...newAddress, zipcode: parseInt(e.target.value) })} required />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Address</button>
          </form>
        </>
      )}

      {/* Bottom Buttons */}
      <div className="relative flex justify-between items-center mt-6">
        <div>
          {addresses.length > 0 && !addNew && (
            <button
              onClick={() => setAddNew(true)}
              className="bg-white border text-black px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              + Add New Address
            </button>
          )}
        </div>

        <div>
          <label className="block font-normal text-gray-600 mb-1">Payment Option</label>
          <select
            className="border outline-black p-2 mb-2 text-black border-gray-900 rounded"
            onChange={(e) => setPaymentOption(e.target.value)}
            value={paymentOption}
          >
            <option value="CASH_ON_DELIVERY">Cash On Delivery</option>
            <option value="UPI">UPI</option>
            <option value="CARD">Card</option>
          </select>

          <button
            onClick={handleOrderPlace}
            className="bg-green-500 text-white p-2 rounded ml-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
