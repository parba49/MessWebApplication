import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./csshome.css";

const Home = () => {
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");

  useEffect(() => {
    const storedMessage = localStorage.getItem("customMessage");
    if (!message && storedMessage) {
      setMessage(storedMessage);
    }
  }, [message]);

  return (
    <div className="home-container">
      <h1 className="home-title">Important Message!!</h1>
      {message && <p className="home-message">{message}</p>} 
      
    </div>
  );
};

export default Home;
