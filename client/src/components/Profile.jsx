import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import "./cssprofile.css"
const Profile = () => {  
  const navigate=useNavigate();
  useEffect(()=>{
   const token=localStorage.getItem("token");
   axios.get("http://localhost:5000/profile",{
    headers: {
      Authorization:token
    }
   }) 
   .then((res)=>console.log(res))
   .catch((err)=>{ 
    navigate("/login");
   })

  },[])
  return (  
    <>
    <div className="profile-container">
      <h2 className="profile-title">Welcome to Your Profile</h2>
      <p className="profile-description">
        This is profile page. Here It gives to view and update personal information, 
        check activity, and manage  account settings.
      </p>
      <div className="profile-actions">
        <ul>
          <li>View your personal details</li>
          <li>Edit your profile information</li>
          <li>Change your password</li>
          <li>View your mess activity and statistics</li>
        </ul>
      </div> 
      <p 
          style={{
            color: "blue",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          You are Logged in, please log out.
        </p>
    </div>  
    
    </>
  ); 

  
}

export default Profile
