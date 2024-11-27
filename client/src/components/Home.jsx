import React from 'react';
import "./csshome.css"
const Home = () => {
  return (
    <> 
      <div className="home-container"> 
        <h1 className="home-title">Welcome to Mess website</h1>
        <p className="home-description">
        <p className="features">To Get facilities of our mess Website please go to login or registration . Happy journey!!  </p>
        </p>
        <div className="features">
          <h2>Features</h2>
          <ul>
            <li>Member management</li>
            <li>Expense tracking</li>
            <li>Meal counting and analysis</li>
            <li>Monthly bill calculations</li>
            <li>Interactive dashboard</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
