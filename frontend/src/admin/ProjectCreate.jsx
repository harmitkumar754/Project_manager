import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function ProjectCreate() {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'Not Started',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await axios.post('http://localhost:3000/admin/create-project', formData, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setFormData({ title: '', description: '', deadline: '', status: 'Not Started' });
        navigate("/ProjectManagement")
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <>
    <Header/>
     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow flex-grow m-20 px-10">
      <h2 className="text-xl font-bold mb-4">Create Project</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create Project
        </button>
      </form>
    </div>
    </>
   
  );
}

export default ProjectCreate;
