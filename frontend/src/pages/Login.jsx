import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../user/Header';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name,value} =e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value,
    }))};

const login = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3000/user/login', formData, {
      withCredentials: true,
    });

    if (response.status === 200) {
      toast.success(response.data.message);
      setTimeout(() => navigate('/user'), 2000);
    } else {
      toast.info(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // ✅ show exact backend error
    } else {
      toast.error("Something went wrong. Please try again."); // fallback
    }
  }
};




  return (
   <>
   <Header></Header>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={login}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              onChange={handleChange}
              name="phone"
              value={formData.phone}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Registration Link */}
        
      </div>
    </div>
   </>
  );
}

export default Login;
