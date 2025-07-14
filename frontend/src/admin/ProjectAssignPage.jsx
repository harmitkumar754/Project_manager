import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from './Header';

function ProjectAssignPage() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/all-projects', {
        withCredentials: true,
      });
      setProjects(res.data.projects.sort((a, b) => b.pid - a.pid));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/allusers', {
        withCredentials: true,
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const assignProject = async (uid) => {
    if (!selectedProject) {
      toast.error('Please select a project first');
      return;
    }
    alert("Are you Sure Assign Project ?")
    try {
      const res = await axios.put(
        `http://localhost:3000/admin/assign-project/${uid}`,
        { pid: parseInt(selectedProject) },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to assign project');
    }
  };

  const unassignProject = async (uid, pid) => {
    try {
        alert("Are You sure unassignProject ? ")
      const res = await axios.put(
        `http://localhost:3000/admin/unassign-project/${uid}`,
        { pid },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to unassign project');
    }
  };

  const getProjectTitle = (pid) => {
    const project = projects.find((p) => p.pid === pid);
    return project ? project.title : `PID: ${pid}`;
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  return (
    <>
    <Header></Header>
     <div className="p-10 flex-grow">
      <h1 className="text-2xl font-bold mb-6">Assign Project to Users</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Project</label>
        <select
          className="w-full border px-3 py-2"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">-- Select a project --</option>
          {projects.map((proj) => (
            <option key={proj.pid} value={proj.pid}>
              {proj.title} (PID: {proj.pid})
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">UID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Assigned Projects</th>
            <th className="p-2 border">Assign</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid} className="border-b">
              <td className="p-2 border">{user.uid}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">
                {user.projectid?.length > 0 ? (
                  <ul className="list-disc ml-4">
                    {user.projectid.map((proj, idx) => (
                      <li key={idx} className="text-black">
                        {getProjectTitle(proj.pid)} (PID: {proj.pid}) - {proj.status}
                        <button
                          onClick={() => unassignProject(user.uid, proj.pid)}
                          className="ml-2 text-red-600 hover:underline text-sm"
                        >
                          Unassign
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No Projects</span>
                )}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => assignProject(user.uid)}
                  className="text-green-600 hover:underline"
                >
                  Assign Project
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
   
  );
}

export default ProjectAssignPage;
