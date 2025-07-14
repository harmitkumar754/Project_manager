import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/user/check-auth', {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/logout', {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="w-full bg-gray-800 text-white px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Project Tracker App</div>
        <div className="flex gap-6">
          <Link to="/user" className="hover:text-gray-300">Home</Link>
          <Link to="/MyProjects" className="hover:text-gray-300">MyProject</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
