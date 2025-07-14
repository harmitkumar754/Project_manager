import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from './Header';

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/all-projects', {
        withCredentials: true,
      });
      setProjects(res.data.projects);
      
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (pid) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`http://localhost:3000/admin/delete-project/${pid}`, {
        withCredentials: true,
      });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const res = await axios.put(`http://localhost:3000/admin/update-project/${editProject.pid}`, editProject, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setEditProject(null);
      fetchProjects();
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  return (
   <>
   <Header/>
    <div className="p-10 flex-grow">
      <h1 className="text-2xl font-bold mb-6">Project Management</h1>
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">PID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Deadline</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr key={proj.pid} className="border-b">
              <td className="p-2 border">{proj.pid}</td>
              <td className="p-2 border">{proj.title}</td>
              <td className="p-2 border">{proj.description}</td>
              <td className="p-2 border">{proj.deadline}</td>
              <td className="p-2 border">{proj.status}</td>
              <td className="p-2 border">
                <button onClick={() => setEditProject(proj)} className="text-blue-600 hover:underline mr-3">
                  Edit
                </button>
                <button onClick={() => handleDelete(proj.pid)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editProject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Project</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2"
                  value={editProject.title}
                  onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  className="w-full border px-3 py-2"
                  value={editProject.description}
                  onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Deadline</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2"
                    value={editProject.deadline}
                //   value={editProject.deadline?.substring(0, 10)}
                  onChange={(e) => setEditProject({ ...editProject, deadline: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  className="w-full border px-3 py-2"
                  value={editProject.status}
                  onChange={(e) => setEditProject({ ...editProject, status: e.target.value })}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditProject(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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

export default ProjectManagement;
