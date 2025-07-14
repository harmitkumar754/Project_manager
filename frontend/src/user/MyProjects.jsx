import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from './Header';

function MyProjects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/my-projects', {
        withCredentials: true,
      });
      setProjects(res.data.projects || []);
      console.log(res.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleStatusChange = async (pid, newStatus) => {
    try {
      const res = await axios.put(
        'http://localhost:3000/user/update-status',
        { pid, status: newStatus },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      fetchProjects();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
   <>
   <Header/>
    <div className="p-10 flex-grow">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>

      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">PID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Discription</th>
            <th className="p-2 border">Deadline</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Update</th>
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
                <select
                  value={proj.status}
                  onChange={(e) => handleStatusChange(proj.pid, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No assigned projects.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
   </>
  );
}

export default MyProjects;
