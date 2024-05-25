import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './nav-bar';
import Home from './home';
import Profile from './profile/profile';
import Login from './login';
import Signup from './signup';
import BookModal from './bookModal';
import ResponseModal from './responseModal';
import UploadBook from './upload_book';
import DisplayBook from './display_book';
import UpdateBook from './update_book';
import Onboarding from './onboarding';
import Footer from './footer';
import About from './about';
import '@mantine/core/styles.css';

function FallBack(props) {
  return <div>URL Not Found</div>;
}

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bookModal" element={<BookModal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/how-it-works" element={<About />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<FallBack />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
