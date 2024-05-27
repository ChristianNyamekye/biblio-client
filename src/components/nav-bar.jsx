import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import useStore from '../store';

function NavBar() {
  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);

  return (
    <nav className="navbar">
      <Link to="/" className="brand-header" style={{ textDecoration: 'none' }}>
        <img className="logo" src={logo} alt="biblio logo" />
        biblio
      </Link>
      <div className="menu-items">
        <ul>
          {currUser && currUser.id ? (
            <>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to={`/profile/${currUser.id}`}>Profile</Link>
              </li>
              <li>
                <Link to="/how-it-works">How It Works</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/how-it-works">How It Works</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
