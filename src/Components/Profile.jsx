// src/Pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('access_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-20 p-2 m-2 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
      
      <div className="space-y-4 text-gray-700">
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
      </div>

      {/* 👇 Go Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(-1)} // ✅ Go back to previous page
          className="bg-gray-700 text-white p-2 px-6 rounded hover:bg-gray-800 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Profile;
