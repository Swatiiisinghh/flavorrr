// src/components/FlavorIntensityDial.js
import  { useState } from 'react';
import './FlavourIntensityDial.css';

function FlavorIntensityDial() {
  const [intensity, setIntensity] = useState(50);

  return (
    <section className="flavor-intensity-dial">
      <h2>Flavor Intensity</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={intensity}
        onChange={(e) => setIntensity(e.target.value)}
        className="flavor-intensity-dial__slider"
      />
      <p>Intensity Level: {intensity}%</p>
    </section>
  );
}

export default FlavorIntensityDial;
