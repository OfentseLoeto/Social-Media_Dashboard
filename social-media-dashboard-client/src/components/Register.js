import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [ formData, setFormData ] = useState ({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) async => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Password do not match');
    } else {
      const newUser = {
        name,
	email,
	password,
      };

      try {
        const config = {
	  header: {
	    'Content-Type': 'application/json',
	  },
	};

	const body = JSON.stringify(newUser);

	const res = await axios.post('/api/users', body, config);
	console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
	<input  
	  type="text"
	  spaceholder="NAME"
	  name="name"
	  value={name}
	  onChange={onChange}
	/>
      </div>
      <div>
	<input
	  type="email"
	  spaceholder="Email Address"
	  name="email"
	  value={email}
	  onChange={onChange}
	/>
      </div>

      <div>
	<input
	  type="password"
	  spaceholder="Password"
	  name="password"
	  value={password}
	  onChange={onChange}
	/>
      </div>

      <div>
	<input
	  type="password"
	  spaceholder="Confirm Password"
	  name="password2"
	  value={password2}
	  onChange={onChange}
	/>
      </div>

      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
