// src/components/IngredientCarousel.js
import './IngredientCarousel.css';

function IngredientCarousel({ alternatives }) {
  return (
    <section className="ingredient-carousel">
      {alternatives.map((alternative, index) => (
        <div key={index} className="ingredient-carousel__card">
          <h3>{alternative.originalIngredient}</h3>
          <p>
            Alternative: <strong>{alternative.alternativeIngredient}</strong>
          </p>
          <p>{alternative.description}</p>
        </div>
      ))}
    </section>
  );
}

export default IngredientCarousel;
