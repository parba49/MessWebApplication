import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { useEffect } from 'react'; 
import "./index.css"
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  }); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Initialize the navigate hook 
  ////agei check korbe age theke se login ache naki 
  useEffect(()=>{
    const token=localStorage.getItem("token");
    axios.get("http://localhost:5000/profile",{
     headers: {
       Authorization:token
     }
    }) 
    .then((res)=>navigate("/profile"))
    .catch((err)=>{ 
     navigate("/register");
    })
 
   },[])

  // Handle form field changes
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
      const response = await axios.post('http://localhost:5000/register', formData);
      if (response.status === 200) {
        alert('Registration successful!');
        // Redirect to the login page after successful registration
        navigate('/Login');
      }
    } catch (error) {
      setError('User name mached');
      console.error('Error during registration:', error); 
      navigate('/register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
