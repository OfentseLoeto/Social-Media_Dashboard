import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserDocument, firestore } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to create user with:", email, password);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await createUserDocument({ uid: user.uid, email, username });

      console.log("User Created:", user);

      await setDoc(doc(firestore, 'user', user.uid), {
        email: user.email,
	createdAt: new Date(),
	username: username
      });
      console.log("User data saved in Firestore");

      navigate('/profile');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use.');
      } else {
        console.log("Error creating user:", error);
        setError('Error creating user: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
	<input
	  type="email"
	  placeholder="Email"
	  value={email}
	  onChange={(e) => setEmail(e.target.value)}
	  required
	/>
	<input
	  type="password"
	  placeholder="Password"
	  value={password}
	  onChange={(e) => setPassword(e.target.value)}
	  required
	/>
	<input
	  type="text"
	  placeholder="Username"
	  value={username}
	  onChange={(e) => setUsername(e.target.value)}
	  required
	/>  
	<button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>

  );
}
      
export default Register;
