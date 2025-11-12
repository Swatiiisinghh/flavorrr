import './DietHealthPreferences.css';

function DietHealthPreferences() {
  const preferences = [
    { name: 'Vegan', icon: '🥦' },
    { name: 'Gluten-Free', icon: '🚫🌾' },
    { name: 'Dessert', icon: '🍰' },
    { name: 'Appetizer', icon: '🥟' },
  ];

  return (
    <section className="diet-health-preferences">
      {preferences.map((pref, index) => (
        <div key={index} className="diet-health-preferences__icon">
          <div className="icon">{pref.icon}</div>
          <div>{pref.name}</div>
        </div>
      ))}
    </section>
  );
}

export default DietHealthPreferences;
