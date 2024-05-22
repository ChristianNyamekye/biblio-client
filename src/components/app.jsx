import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import NavBar from './nav-bar';
import Home from './home';
import Profile from './profile/profile';
import Login from './login';
import Signup from './signup';
import BookModal from './bookModal';
import UploadBook from './upload_book';
import DisplayBook from './display_book';
import UpdateBook from './update_book';
import Education from './education';
import '@mantine/core/styles.css';

function FallBack(props) {
  return <div>URL Not Found</div>;
}

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookModal" element={<BookModal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/how-it-works" element={<Education />} />

          {/* allow user to view more about their book or other books in their profile */}
          <Route path="/books/:bookID" element={<DisplayBook />} />
          <Route path="/profile/:bookID" element={<DisplayBook />} />

          {/* allow user to edit their book from user profile or from home page */}
          <Route path="/books/:bookID/edit" element={<UpdateBook />} />
          <Route path="/profile/:bookID/edit" element={<UpdateBook />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
