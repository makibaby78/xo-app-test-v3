import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base';
import { Link, useNavigate  } from 'react-router-dom'

function Register() { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    Meteor.call('userinfo.insert', { username:username, firstname:firstname.charAt(0).toUpperCase()+firstname.slice(1), lastname:lastname.charAt(0).toUpperCase()+lastname.slice(1), email: email, password: password, profileurl: 'https://picsum.photos/200', })

    Meteor.call('lobby.insert', { username:username, firstname:firstname.charAt(0).toUpperCase()+firstname.slice(1), lastname:lastname.charAt(0).toUpperCase()+lastname.slice(1), lobby: false, opponent: null, board: Array(9).fill(null), profileurl: 'https://picsum.photos/200',})

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
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className='il-block'>
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className='il-block'>
            <input
              type="text"
              placeholder="Email"
              name="Emaile"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='il-block'>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='il-block'>
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