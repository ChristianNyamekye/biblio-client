import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <nav className="foot">
      <div className="small-brand-header">
        <img className="logo" src={logo} alt="biblio logo" />
        biblio
      </div>
      <div className="menu-items">
        <ul>
          <li><Link to="/how-it-works">About</Link></li>
          <li><Link to="#">Privacy</Link></li>
          <li><Link to="#">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Footer;
