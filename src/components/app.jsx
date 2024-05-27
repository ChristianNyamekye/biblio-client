import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './nav-bar';
import Home from './home';
import Profile from './profile/profile';
import Login from './login';
import Signup from './signup';
import TradeModal from './tradeModal';
import BookModal from './bookModal';
import ResponseModal from './responseModal';
import UploadBook from './upload_book';
import DisplayBook from './display_book';
import UpdateBook from './update_book';
import Onboarding from './onboarding';
import Footer from './footer';
import About from './about';
import '@mantine/core/styles.css';
import useStore from '../store';

function FallBack(props) {
  return <div>URL Not Found</div>;
}

function App(props) {
  // inside your App component
  const loadUser = useStore(({ biblioSlice }) => biblioSlice.loadUser);
  const authenticated = useStore(({ biblioSlice }) => biblioSlice.authenticated);
  // call loadUser in useEffect
  useEffect(() => {
    loadUser();
  }, []);

  let routes;
  if (authenticated) {
    routes = (
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/bookModal" element={<BookModal />} />
        <Route path="/tradeModal" element={<TradeModal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/how-it-works" element={<About />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<FallBack />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/how-it-works" element={<About />} />
        <Route path="*" element={<FallBack />} />
      </Routes>
    );
  }
  return (

    <BrowserRouter>
      <div className="App">
        <NavBar />
        <main>
          {routes}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
