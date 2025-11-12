import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch, FaSpinner } from 'react-icons/fa'; // Import FaSpinner for loading indicator
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import DOMPurify from 'dompurify'; // Import DOMPurify

function SearchBar() {
  const [query, setQuery] = useState('');
  const [recipe, setRecipe] = useState(null); // Store a single recipe object
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use Vite's environment variable
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (query.trim() === '') {
      alert('Please enter a search query.');
      return;
    }
    setLoading(true);
    setError(null);
    setRecipe(null); // Reset previous recipe
    try {
      // Make an API call to your backend search_recipes endpoint
      const response = await axios.get(`${API_URL}/search_recipes`, {
        params: { query },
      });

      // Access the first recipe from the response
      const recipes = response.data.payload?.data || [];
      if (recipes.length > 0) {
        setRecipe(recipes[0]); // Set only the first recipe
      } else {
        setError(`No recipes found for "${query}".`);
      }
    } catch (error) {
      console.error('Error searching for recipes:', error);
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(error.response.data.message || 'Server Error');
      } else if (error.request) {
        // Request was made but no response received
        setError('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        setError('Error setting up the request.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to render all fields of the recipe
  const renderRecipeDetails = (recipe) => {
    // Destructure the recipe object for easier access
    const {
      Recipe_id,
      Calories,
      cook_time,
      prep_time,
      servings,
      Recipe_title,
      total_time,
      url,
      Region,
      Sub_region,
      Continent,
      Source,
      img_url,
      'Carbohydrate, by difference (g)': carbohydrate,
      'Energy (kcal)': energy,
      'Protein (g)': protein,
      'Total lipid (fat) (g)': fat,
      Utensils,
      Processes,
      vegan,
      pescetarian,
      ovo_vegetarian,
      lacto_vegetarian,
      ovo_lacto_vegetarian,
      id,
      // Add any other fields here
    } = recipe;

    // Safely handle 'Processes' and 'Recipe_title' before using 'replace'
    const sanitizedRecipeTitle = Recipe_title
      ? DOMPurify.sanitize(Recipe_title)
      : 'No Title';

    const altText = sanitizedRecipeTitle.replace(/<[^>]+>/g, '') || 'Recipe Image';
    const processesFormatted = Processes
      ? Processes.replace(/\|\|/g, ', ')
      : 'No Processes';

    return (
      <div className="recipe-details">
        <h2
          className="recipe-title"
          dangerouslySetInnerHTML={{ __html: sanitizedRecipeTitle }}
        ></h2>
        {img_url && (
          <img
            src={img_url}
            alt={altText}
            className="recipe-image"
          />
        )}
        <ul className="recipe-info">
          {/* <li><strong>Recipe ID:</strong> {Recipe_id || 'N/A'}</li> */}
          {/* <li><strong>Calories:</strong> {Calories || 'N/A'}</li>
          <li><strong>Cook Time:</strong> {cook_time || 'N/A'} minutes</li>
          <li><strong>Prep Time:</strong> {prep_time || 'N/A'} minutes</li>
          <li><strong>Servings:</strong> {servings || 'N/A'}</li>
          <li><strong>Total Time:</strong> {total_time || 'N/A'} minutes</li> */}
          <li>
            <strong>URL:</strong> {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            ) : 'N/A'}
          </li>
          {/* <li><strong>Region:</strong> {Region || 'N/A'}</li>
          <li><strong>Sub-Region:</strong> {Sub_region || 'N/A'}</li>
          <li><strong>Continent:</strong> {Continent || 'N/A'}</li>
          <li><strong>Source:</strong> {Source || 'N/A'}</li>
          <li><strong>Carbohydrate (g):</strong> {carbohydrate || 'N/A'}</li>
          <li><strong>Energy (kcal):</strong> {energy || 'N/A'}</li>
          <li><strong>Protein (g):</strong> {protein || 'N/A'}</li>
          <li><strong>Fat (g):</strong> {fat || 'N/A'}</li>
          <li><strong>Utensils:</strong> {Utensils || 'N/A'}</li>
          <li><strong>Processes:</strong> {processesFormatted}</li>
          <li><strong>Vegan:</strong> {vegan !== undefined ? vegan : 'N/A'}</li>
          <li><strong>Pescetarian:</strong> {pescetarian !== undefined ? pescetarian : 'N/A'}</li>
          <li><strong>Ovo Vegetarian:</strong> {ovo_vegetarian !== undefined ? ovo_vegetarian : 'N/A'}</li>
          <li><strong>Lacto Vegetarian:</strong> {lacto_vegetarian !== undefined ? lacto_vegetarian : 'N/A'}</li>
          <li><strong>Ovo Lacto Vegetarian:</strong> {ovo_lacto_vegetarian !== undefined ? ovo_lacto_vegetarian : 'N/A'}</li>
          <li><strong>ID:</strong> {id || 'N/A'}</li> */}
          {/* Render any additional fields here */}
        </ul>
        <Link to={`/recipe/${Recipe_id}`} className="view-recipe-link">View Full Recipe</Link>
      </div>
    );
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-bar__form">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={handleInputChange}
          className="search-bar__input"
          aria-label="Search for a recipe"
        />
        <button type="submit" className="search-bar__button" disabled={loading} aria-label="Search">
          {loading ? <FaSpinner className="spinner" /> : <FaSearch className="search-bar__icon" />}
        </button>
      </form>
      {error && <div className="error-message" role="alert">{error}</div>}
      {!loading && !recipe && query.trim() !== '' && !error && (
        <div className="no-results">No recipes found for "{query}".</div>
      )}
      {recipe && (
        <div className="search-results">
          {renderRecipeDetails(recipe)}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
