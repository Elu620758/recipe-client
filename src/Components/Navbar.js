import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Navbar.css';

const Navbar = () => {

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar" bg="dark">
      <Link to='/home' className="nav-link">Home</Link>
      <Link to='/dash' className="nav-link">Dashboard</Link>
      <Link to='/create-recipe' className="nav-link">Create Recipe</Link>
      <Link to={`/saved-recipe`} className="nav-link">Saved Recipe</Link>
      <Link to="/" className="nav-link" onClick={() => navigate('/')}>
        <button className="logout-button" onClick={logout}> Logout </button>
      </Link>
    </div>
  );
}


export default Navbar;
