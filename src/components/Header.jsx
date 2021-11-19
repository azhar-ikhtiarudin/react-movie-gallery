import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="header-nav">
        <Link to="/"><h1>Home</h1></Link>
        <Link to="/favorites"><h1>Favorites</h1></Link>
    </nav>
  );
};

export default Header;
