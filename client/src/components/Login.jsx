import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { useEffect } from 'react'; 
import "./index.css"
const Login = () => { 
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize the navigate hook
  // Handle form field changes   

  useEffect(()=>{
    const token=localStorage.getItem("token");
    axios.get("http://localhost:5000/profile",{
     headers: {
       Authorization:token
     }
    }) 
    .then((res)=>navigate("/profile"))
    .catch((err)=>{ 
     navigate("/login");
    })
 
   },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.post('http://localhost:5000/login', formData); 
      if (response.status === 200) {
        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem('token', response.data.token);  // Assuming the server sends the token in response.data.token

        alert('Successfully logged in!');
        // Redirect to Profile page after successful login
        navigate('/Profile');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
