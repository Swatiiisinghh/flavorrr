import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Flavor Companion Logo" />
      </div>
      <nav className="header__nav">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore Flavors</Link>
        <Link to="/suitability">Recipe Suitability</Link>
        <Link to="/sensory">Sensory Designer</Link>
        <Link to="/dashboard">My Dashboard</Link>
      </nav>
    </header>
  );
}

export default Header;
