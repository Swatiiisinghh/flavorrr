import React from "react";
import "./FlavorGalaxy.css";

const BackgroundScene = () => {
  return (
    <div className="flavor-galaxy">
      <div className="flavor-galaxy__overlay">
        <div className="flavor-galaxy__header">
          <h1>Welcome to Flavor Galaxy</h1>
          <p>Embark on a culinary journey like never before!</p>
        </div>
      </div>
      <div className="flavor-galaxy__stars">
        {[...Array(50)].map((_, index) => (
          <div key={index} className="star" />
        ))}
      </div>
      <div className="flavor-galaxy__footer">
        <button className="cta-button">Explore Recipes</button>
        <button className="cta-button">Play Food Trivia</button>
      </div>
    </div>
  );
};

export default BackgroundScene;
