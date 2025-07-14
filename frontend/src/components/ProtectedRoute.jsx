// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/user/check-auth', {
          credentials: 'include', // include HttpOnly cookies
        });

        if (!res.ok) {
          throw new Error('Unauthorized');
        }

        setIsAuth(true);
      
      } catch (err) {
        alert("You need to login first");
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
