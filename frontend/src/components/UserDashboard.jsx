import './UserDashboard.css';

function UserDashboard() {
  const user = {
    name: 'John Doe',
    badges: [
      'Spicy Adventurer',
      'Sweet Tooth',
      'Savoury Seeker',
      'Sugar Rush',
      'Flavor Explorer',
      'Heat Hunter',
      'Choco Lover',
      'Culinary Conqueror',
      'Mouthwatering Master',
      'Baking Boss',
      'Sizzle Enthusiast',
      'Zesty Genius',
      'Tasty Trailblazer',
      'Savory Sorcerer',
      'Spicy Scholar',
      'Dessert Devotee',
      'Flavour Fiend',
      'Gourmet Guru',
      'Sauce Specialist',
      'Crunch Commander',
      'Sweets Connoisseur',
      'Fiery Foodie',
    ],
    savedRecipes: [
      { name: 'Spicy Ramen' },
      { name: 'Chocolate Lava Cake' },
      // Add more recipes as needed
    ],
  };

  return (
    <section className="user-dashboard">
      <h1 className="user-dashboard__welcome">Welcome, {user.name}</h1>
      <h2>My Badges</h2>
      <div className="user-dashboard__badges">
        {user.badges.map((badge, index) => (
          <div key={index} className="user-dashboard__badge">
            {badge}
          </div>
        ))}
      </div>
      <h2>Saved Recipes</h2>
      <ul className="user-dashboard__recipes">
        {user.savedRecipes.map((recipe, index) => (
          <li key={index}>{recipe.name}</li>
        ))}
      </ul>
    </section>
  );
}

export default UserDashboard;