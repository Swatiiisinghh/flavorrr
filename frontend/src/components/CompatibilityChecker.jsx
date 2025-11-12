import React, { useState } from "react";
import "./CompatibilityChecker.css";

const CompatibilityChecker = () => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [alternatives, setAlternatives] = useState([]);

  const handleRecipeChange = (event) => {
    setSelectedRecipe(event.target.value);
    // Fetch ingredients based on selected recipe
    // Simulate API call or logic here
    setIngredients([
      { name: "Milk", checked: false },
      { name: "Flour", checked: false },
      { name: "Eggs", checked: false },
    ]);
    setAlternatives([]);
  };

  const handleIngredientChange = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;
    setIngredients(updatedIngredients);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate logic to generate alternatives
    setAlternatives([
      { name: "Almond Milk", details: "Dairy-free alternative for Milk." },
      { name: "Gluten-Free Flour", details: "Great for gluten intolerance." },
    ]);
  };

  return (
    <div className="compatibility-checker">
      <h2>Recipe Compatibility Checker</h2>

      <div className="recipe-select">
        <label htmlFor="recipe-select">Choose a recipe:</label>
        <select
          id="recipe-select"
          value={selectedRecipe}
          onChange={handleRecipeChange}
        >
          <option value="">Select a recipe</option>
          <option value="pancakes">Pancakes</option>
          <option value="cookies">Cookies</option>
          <option value="cake">Cake</option>
        </select>
      </div>

      {ingredients.length > 0 && (
        <div className="ingredient-checklist">
          <h3>Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <label>
                <input
                  type="checkbox"
                  checked={ingredient.checked}
                  onChange={() => handleIngredientChange(index)}
                />
                {ingredient.name}
              </label>
            </div>
          ))}
        </div>
      )}

      {ingredients.length > 0 && (
        <button className="submit-button" onClick={handleSubmit}>
          Check Alternatives
        </button>
      )}

      {alternatives.length > 0 && (
        <div className="alternative-suggestions">
          <h3>Alternative Suggestions</h3>
          <div className="alternative-cards">
            {alternatives.map((alt, index) => (
              <div key={index} className="alternative-card">
                <h4>{alt.name}</h4>
                <p>{alt.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompatibilityChecker;
