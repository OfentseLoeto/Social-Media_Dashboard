import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Posts from './Posts';
import Profile from './Profile';
import Follow from './Follow';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <img src="/logo.png" alt="Logo" className="logo" />
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/posts">Posts</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/follow">Follow</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/follow" element={<Follow />} />
          </Routes>
        </main>
        <footer>
          <div>About me: I am Ofentse Loeto, an ALX Software Engineering Student.</div>
          <div>Social Links: <a href="https://x.com/LoetoOhentse">Twitter</a> | <a href="https://www.facebook.com/profile.php?id=61557438003612">Facebook</a> | <a href="www.linkedin.com/in/ohentse-theophilus-loeto-b968b61a1">LinkedIn</a></div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
