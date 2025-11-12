import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router

function RecipeDetails() {
  const { id } = useParams(); // Get recipe_id from URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipeDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/recipe/${id}`); // Update with your backend URL
      setRecipe(response.data.payload);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError('Failed to fetch recipe details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!recipe) return null;

  return (
    <div className="recipe-details">
      <h2>{recipe.Recipe_title}</h2>
      <p><a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a></p>
      <p>Region: {recipe.Region}</p>
      <p>Sub-region: {recipe.Sub_region}</p>
      <p>Continent: {recipe.Continent}</p>
      <p>Calories: {recipe.Calories}</p>
      <p>Cook Time: {recipe.cook_time} minutes</p>
      <p>Prep Time: {recipe.prep_time} minutes</p>
      <p>Total Time: {recipe.total_time} minutes</p>
      <p>Servings: {recipe.servings}</p>
      <p>Processes: {recipe.Processes}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.ingredient}{ingredient.state ? ` (${ingredient.state})` : ''}: {ingredient.quantity} {ingredient.unit}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;
