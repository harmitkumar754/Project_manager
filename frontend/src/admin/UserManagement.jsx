import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from './Header';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableUser, setEditableUser] = useState({
    uid: '',
    name: '',
    Designation: '',
    phone: '',
    jdt: '',
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/allusers', { withCredentials: true });
      setUsers(res.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
     await axios.delete(`http://localhost:3000/admin/delete-user/${userId}`, { withCredentials: true });
setUsers(users.filter(user => user.uid !== userId));

      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditableUser({ ...user });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/admin/useredit/${editableUser.uid}`, editableUser, {
        withCredentials: true
      });
      toast.success('User updated successfully');
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
   <>
   <Header></Header>
    <div className="p-10 flex-grow">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">UID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Designation</th>
            <th className="p-2 border">Joining Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="p-2 border">{user.uid}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">{user.Designation}</td>
              <td className="p-2 border">{user.jdt}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline mr-3">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.uid)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <div className="mb-3">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editableUser.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Designation</label>
              <input
                type="text"
                name="Designation"
                value={editableUser.Designation}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={editableUser.phone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Joining Date</label>
              <input
                type="text"
                name="jdt"
                value={editableUser.jdt}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                disabled
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
   </>
  );
}

export default UserManagement;
