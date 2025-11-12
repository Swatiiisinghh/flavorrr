// src/components/CountryCultureSelector.js
import React, { useState } from 'react';
import './CountryCultureSelector.css';
import japanImage from '../assets/japan.jpg';
import medievalImage from '../assets/medieval.jpg';
import italyImage from '../assets/italy.jpg';
import axios from 'axios'; // Import axios
import { Spinner, Alert, Card, Button, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

function CountryCultureSelector() {
  const [selected, setSelected] = useState(null);
  const [recipes, setRecipes] = useState([]); // State to store fetched recipes
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const options = [
    { name: 'Japanese Kaiseki', image: japanImage, searchText: 'Japanese' },
    { name: 'Medieval Europe', image: medievalImage, searchText: 'Medieval' },
    { name: 'Italian Renaissance', image: italyImage, searchText: 'Italian' },
  ];

  const API_URL = 'https://cosylab.iiitd.edu.in/recipe-search/sub-regions'; // Base API URL

  const handleSelect = async (option) => {
    setSelected(option);
    setLoading(true);
    setError(null);
    setRecipes([]); // Reset previous recipes

    try {
      const response = await axios.get(API_URL, {
        params: {
          searchText: option.searchText,
          pageSize: 10,
        },
      });

      if (response.data.success === 'true' && response.data.payload.data.length > 0) {
        setRecipes(response.data.payload.data);
      } else {
        setError(`No recipes found for "${option.name}".`);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('An error occurred while fetching recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to safely process and display recipe details
  const renderRecipeDetails = (recipe) => {
    // Destructure necessary fields with default values
    const {
      Recipe_id = 'N/A',
      Recipe_title = 'No Title',
      img_url,
      Calories = 'N/A',
      cook_time = 'N/A',
      prep_time = 'N/A',
      servings = 'N/A',
      total_time = 'N/A',
      url = '#',
      Region = 'N/A',
      Sub_region = 'N/A',
      Continent = 'N/A',
      Source = 'N/A',
      'Carbohydrate, by difference (g)': carbohydrate = 'N/A',
      'Energy (kcal)': energy = 'N/A',
      'Protein (g)': protein = 'N/A',
      'Total lipid (fat) (g)': fat = 'N/A',
      Utensils = 'N/A',
      Processes = 'N/A',
      vegan = 'N/A',
      pescetarian = 'N/A',
      ovo_vegetarian = 'N/A',
      lacto_vegetarian = 'N/A',
      ovo_lacto_vegetarian = 'N/A',
      id = 'N/A',
    } = recipe;

    // Process 'Processes' field
    const processesFormatted = Processes !== 'N/A' ? Processes.split('||').join(', ') : 'N/A';

    return (
      <Col key={id} xs={12} sm={6} md={4} lg={3} className="mb-4">
        <Card className="h-100 shadow-sm">
          {img_url && (
            <Card.Img variant="top" src={img_url} alt={Recipe_title} className="recipe-image" />
          )}
          <Card.Body className="d-flex flex-column">
            <Card.Title>{Recipe_title}</Card.Title>
            <Card.Text className="flex-grow-1">
              <strong>Calories:</strong> {Calories} kcal<br />
              <strong>Cook Time:</strong> {cook_time} minutes<br />
              <strong>Prep Time:</strong> {prep_time} minutes<br />
              <strong>Servings:</strong> {servings}<br />
              <strong>Total Time:</strong> {total_time} minutes<br />
              <strong>Region:</strong> {Region}<br />
              <strong>Sub-Region:</strong> {Sub_region}<br />
              <strong>Continent:</strong> {Continent}<br />
              <strong>Carbohydrate:</strong> {carbohydrate} g<br />
              <strong>Energy:</strong> {energy} kcal<br />
              <strong>Protein:</strong> {protein} g<br />
              <strong>Fat:</strong> {fat} g<br />
              <strong>Utensils:</strong> {Utensils}<br />
              <strong>Processes:</strong> {processesFormatted}<br />
              <strong>Vegan:</strong> {vegan}<br />
              <strong>Pescetarian:</strong> {pescetarian}<br />
              <strong>Ovo Vegetarian:</strong> {ovo_vegetarian}<br />
              <strong>Lacto Vegetarian:</strong> {lacto_vegetarian}<br />
              <strong>Ovo Lacto Vegetarian:</strong> {ovo_lacto_vegetarian}
            </Card.Text>
            <Button variant="primary" href={url} target="_blank" rel="noopener noreferrer">
              View Recipe
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container className="country-culture-selector py-5">
      <h2 className="text-center mb-4">Select a Culture to Explore Recipes</h2>
      <Row className="options-container mb-5">
        {options.map((option, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <div
              className={`country-culture-selector__option card ${selected === option ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSelect(option);
              }}
              aria-label={`Select ${option.name}`}
              style={{
                backgroundImage: `url(${option.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                position: 'relative',
                cursor: 'pointer',
                border: selected === option ? '3px solid #1DB954' : 'none',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
            >
              <div className="country-culture-selector__overlay d-flex align-items-center justify-content-center">
                <h3 className="text-white text-shadow">{option.name}</h3>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Loading Indicator */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <Spinner animation="border" role="status" className="me-2">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span>Loading recipes...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* Recipes Display */}
      {!loading && recipes.length > 0 && (
        <div className="recipes-container">
          <h2 className="text-center mb-4">Recipes for {selected.name}</h2>
          <Row>
            {recipes.map((recipe) => renderRecipeDetails(recipe))}
          </Row>
        </div>
      )}
    </Container>
  );
}

export default CountryCultureSelector;
