import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cssprofile.css";

const Profile = () => {
  const [username, setusername] = useState("");
  const [millCount, setMillCount] = useState("");
  const [bazarCost, setBazarCost] = useState("");
  const [customMessage, setCustomMessage] = useState(""); // State for the custom message
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => {
        navigate("/login");
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/mess-data",
        { username, millCount, bazarCost },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessage("Data submitted successfully!");
      setMillCount("");
      setBazarCost("");
    } catch (error) {
      setMessage("Failed to submit data.");
    }
  };

  const handleSendMessage = () => {
    localStorage.setItem("customMessage", customMessage); // Save message in localStorage
    navigate("/", { state: { message: customMessage } });
  };
  

  
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://localhost:5000/delete-data", {
        headers: { Authorization: token },
      });
      setMessage("Data deleted successfully!");
      setusername("");
      setMillCount("");
      setBazarCost("");
    } catch (error) {
      setMessage("Failed to delete data.");
    } 
    localStorage.removeItem("customMessage");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Welcome to Manager's Profile</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="message-form"
      >
        <div className="form-group">
          <label htmlFor="customMessage">Custom Message:</label>
          <input
            type="text"
            id="customMessage"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            required
            placeholder="Type your message here"
          />
        </div>
        <button type="submit" className="send-message-button">
          Send Message 
        </button>
      </form> 
      <br /> 
      <button className="delete-button" onClick={handleDelete}>
        Message Delete
      </button>  
      <br /> 
      <br />
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
            placeholder="Enter User Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="millCount">Mill Count:</label>
          <input
            type="number"
            id="millCount"
            value={millCount}
            onChange={(e) => setMillCount(e.target.value)}
            required
            placeholder="Enter mill count"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bazarCost">Bazar Cost:</label>
          <input
            type="number"
            id="bazarCost"
            value={bazarCost}
            onChange={(e) => setBazarCost(e.target.value)}
            required
            placeholder="Enter bazar cost"
          />
        </div> 
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>   
        <br /> 
        <br /> 
        <br />  
        <button
        className="external-link-button"
        onClick={() => window.open("https://messmanagement.netlify.app/", "_blank")}
      >
        Visit Mess Management Calcluation Website
      </button>
      </form>  
      {message && <p className="form-message">{message}</p>} 
    </div> 
    
  );
};

export default Profile;
