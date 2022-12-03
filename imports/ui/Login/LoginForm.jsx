import { Meteor } from 'meteor/meteor';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
    navigate("/");
  };

  return (
  <div className='login-wrapper lg-wrapper'>
    <div className='lgw-content'>
      <h3>Login</h3>
      <form onSubmit={submit} className="login-form">
        <div className='il-block'>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='il-block'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='il-block'>
          <button type="submit">Log In</button>
        </div>
        <p className='t-center'>Don't have an account?<br/> <Link to="/register" className='link-style'>Register here</Link></p>
      </form>
    </div>
  </div>
  );
};