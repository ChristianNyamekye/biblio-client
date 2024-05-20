import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import NavBar from './nav-bar';
import Home from './home';
import Profile from './profile';
import Login from './login';
import Signup from './signup';

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
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<FallBack />} />
          <Route path="/how-it-works" element={<Education />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
