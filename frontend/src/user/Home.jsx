import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/profile', {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow px-6 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : user ? (
          <h1 className="text-2xl font-bold mb-6 text-center">
            {`Welcome To ${user.name}`}
          </h1>
        ) : (
          <p className="text-center text-red-500">Failed to load user profile.</p>
        )}
      </main>
    </div>
  );
}

export default Home;
