import React from 'react';
import { Link } from 'react-router-dom'; // Using Link for client-side routing
import logo from '../assets/logo.png';
import useStore from '../store';

function NavBar() {
  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);

  return (
    <nav className="navbar">

      <div className="brand-header">
        <img className="logo" src={logo} alt="biblio logo" />
        biblio
      </div>
      <div className="menu-items">
        <ul>
          {currUser && currUser.id ? (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to={`/profile/${currUser.id}`}>Profile</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
