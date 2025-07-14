import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../admin/Header';

function UserCreate() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    Designation: '',
    phone: '',
    password: '',
    jdt: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler (you can connect it to backend later)
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:3000/user/register',
      formData,
      { withCredentials: true }
    );

    if (response.status === 201) {
      toast.success(response.data.message);
      setTimeout(() => navigate('/UserManagement'), 2000);
    } else {
      toast.info(response.data.message); 
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); 
    } else {
      toast.error("Something went wrong!");
    }
    
  }
};


  return (
   <>
   <Header/>
    <div className="min-h-screen flex items-center justify-center  m-5">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Designation */}
          <div className="mb-4">
            <label htmlFor="Designation" className="block text-gray-700 mb-2">Designation</label>
            <input
              type="text"
              name="Designation"
              value={formData.Designation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Designation"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Joining Date */}
           <div className="mb-6">
            <label htmlFor="jdt" className="block text-gray-700 mb-2">Joining Date</label>
            <input
              type="date"
              name="jdt"
              value={formData.jdt}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Joining Date"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
   
   </>
  );
}

export default UserCreate;
