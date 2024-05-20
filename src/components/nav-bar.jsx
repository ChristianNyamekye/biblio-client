import React from 'react';
import logo from '../assets/logo.png';

function NavBar() {
  return (
    <nav className="navbar">

      <div className="brand-header">
        <img className="logo" src={logo} alt="biblio logo" />
        biblio
      </div>
      <div className="menu-items">
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/">Home</a></li>
          <li><a href="/how-it-works">How It Works</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
