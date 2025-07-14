import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from './Header';

function Profile() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: '',
    phone:'',
  });
  

  const [formData, setFormData] = useState(user);
  useEffect(()=>{
     const fetchprofile = async () => {
      try{
       const res = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });
        const data = res.data;
        
        setUser(data.user);
        
      }catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchprofile();
    },[]);
  

  const handleOpenModal = () => {
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
  try {
    e.preventDefault();
    const response = await axios.post(
      'http://localhost:3000/user/profileedit',
      formData,
      { withCredentials: true }
    );

    if (response.status === 200) {
      toast.success(response.data.message);
      setUser(response.data.user); 
    }

    setIsModalOpen(false);
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Failed to update profile");
  }
};

  

  return (
   <>
   <Header/>
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        
        <p><strong>Phone:</strong> {user.phone}</p>
        <div className="mt-6 text-right">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleOpenModal}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
             
              <div className="mb-6">
                <label className="block mb-1 text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
   </>
  );
}

export default Profile;
