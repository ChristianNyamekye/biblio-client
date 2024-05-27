import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import useStore from '../store';

function NavBar() {
  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);
  const navigate = useNavigate();
  const signoutUser = useStore(({ biblioSlice }) => biblioSlice.signoutUser);
  const deleteUser = useStore(({ biblioSlice }) => biblioSlice.deleteUser);
  const authenticated = useStore(({ biblioSlice }) => biblioSlice.authenticated);

  const handleLogout = () => {
    signoutUser(); // Clears authentication state
    navigate('/login'); // Redirects to login page
  };
  const handleDeleteUser = async () => {
    try {
      await deleteUser(currUser.id);
      navigate('/signup');
    } catch (error) {
      throw new Error(`failed ${error.message}`);
    }
  };
  return (
    <nav className="navbar">
      <Link to="/" className="brand-header" style={{ textDecoration: 'none' }}>
        <img className="logo" src={logo} alt="biblio logo" />
        biblio
      </Link>
      <div className="menu-items">
        <ul>
          {authenticated ? (
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
              <li>
                <Link to="/login" onClick={handleLogout}>Logout</Link>
              </li>
              <li>
                <Link to="/signup" onClick={handleDeleteUser}>DeleteUser</Link>
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
