import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import FlavorExplorationPage from './components/FlavourExplorationPage';
import RecipeSuitabilityPage from './components/RecipeSuitabilityPage';
import SensoryExperiencePage from './components/SensoryExperiencePage';
import UserDashboardPage from './components/UserDashboardPage';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<FlavorExplorationPage />} />
          <Route path="/suitability" element={<RecipeSuitabilityPage />} />
          <Route path="/sensory" element={<SensoryExperiencePage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
