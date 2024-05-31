import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div>
	<Link to="/">Home</Link>
	<Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
