// src/pages/RecipeSuitabilityPage.js
import { useState } from 'react';
import CompatibilityChecker from '../components/CompatibilityChecker';
import IngredientCarousel from '../components/IngredientCarousel';
import FlavourIntensityDial from '../components/FlavourIntensityDial';
import './RecipeSuitability.css'; // Ensure styles are applied

function RecipeSuitabilityPage() {
  const [alternatives, setAlternatives] = useState([]);
  const [intensity, setIntensity] = useState(50); // Default flavor intensity
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message

  // Fetch recipe ingredients from the backend
  const fetchRecipeIngredients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipe-ingredients');
      if (!response.ok) {
        throw new Error('Failed to fetch recipe ingredients.');
      }
      const data = await response.json();
      return data.ingredients;
    } catch (error) {
      console.error('Error fetching recipe ingredients:', error);
      setError('Unable to load recipe ingredients. Please try again later.');
      return [];
    }
  };

  // Fetch alternatives for missing ingredients from the backend
  const fetchAlternatives = async (missingIngredients) => {
    try {
      const response = await fetch('http://localhost:5000/api/alternatives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: missingIngredients }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch alternatives.');
      }
      const data = await response.json();
      return data.alternatives;
    } catch (error) {
      console.error('Error fetching alternatives:', error);
      setError('Unable to load alternatives. Please try again later.');
      return [];
    }
  };

  // Handle compatibility check
  const handleCheck = async (userIngredients) => {
    setLoading(true);
    setError('');
    setAlternatives([]);
    try {
      const recipeIngredients = await fetchRecipeIngredients();

      if (recipeIngredients.length === 0) {
        setLoading(false);
        return;
      }

      // Normalize user ingredients for case-insensitivity
      const normalizedUserIngredients = userIngredients.map((ing) =>
        ing.toLowerCase().trim()
      );

      // Find missing ingredients
      const missingIngredients = recipeIngredients.filter(
        (ingredient) => !normalizedUserIngredients.includes(ingredient.toLowerCase())
      );

      if (missingIngredients.length === 0) {
        alert('You have all the ingredients for the recipe!');
        setAlternatives([]);
        setLoading(false);
        return;
      }

      const alternativeSuggestions = await fetchAlternatives(missingIngredients);
      setAlternatives(alternativeSuggestions);
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle flavor intensity adjustment
  const handleIntensityChange = (newIntensity) => {
    setIntensity(newIntensity);
    console.log(`Flavor intensity adjusted to: ${newIntensity}%`);
    // Additional logic can be added here to adjust alternatives based on intensity
  };

  return (
    <main className="recipe-suitability-page">
      <h1>Recipe Suitability Checker</h1>
      
      <div className="component-wrapper">
        <CompatibilityChecker onCheck={handleCheck} />
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Checking your ingredients...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {alternatives.length > 0 && (
        <div className="component-wrapper">
          <section className="alternatives-section">
            <h2>Missing Ingredients & Alternatives</h2>
            <IngredientCarousel alternatives={alternatives} />
          </section>
        </div>
      )}

      {alternatives.length > 0 && (
        <div className="component-wrapper">
          <section className="flavour-intensity-section">
            <h2>Adjust Flavor Intensity</h2>
            <FlavourIntensityDial
              intensity={intensity}
              onIntensityChange={handleIntensityChange}
            />
          </section>
        </div>
      )}
    </main>
  );
}

export default RecipeSuitabilityPage;
