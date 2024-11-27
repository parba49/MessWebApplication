import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css"
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
      <p>You will be redirected to the login page.</p>
    </div>
  );
};

export default Logout;
