import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base';
import { Link, useNavigate  } from 'react-router-dom'
import { UserCollection } from '/imports/api/links';

function Register() { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    Meteor.call('userinfo.insert', { username:username, firstname:firstname, lastname:lastname, email: email, password: password })

    Meteor.call('lobby.insert', { username:username, firstname:firstname, lastname:lastname, lobby: false, opponent: null, board: Array(9).fill(null)})
    
    // LobbyCollection.insert({ username: username, name: `${firstname} ${lastname}`, lobby: false, opponent: null});
    Accounts.createUser({
      username: username,
      password: password,
    });
    navigate("/");
  };

  return (
    <div className='register-wrapper lg-wrapper'>
      <div className='lgw-content'>
        <h3>Register</h3>
        <form onSubmit={submit} className="login-form">
          <div className='il-block'>
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className='il-block'>
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className='il-block'>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              name="Emaile"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

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
            <button type="submit">Register</button>
          </div>
          <p className='t-center'>Already have an account?<br/><Link to="/login" className='link-style'>Login here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register