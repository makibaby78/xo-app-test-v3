import React from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginForm } from './Login/LoginForm';
import { useTracker } from 'meteor/react-meteor-data';
import Home from './Home/Home'
import Lobby from './Lobby/Lobby'
import MyLobby from './MyLobby/MyLobby';
import Register from './Register/Register';
import Header from './Header/Header';
import OtherLobby from './OtherLobby/OtherLobby';
import Chat from './Chat/Chat'
import Edit from './Edit/Edit';

export const App = () => {
  const user = useTracker(() => Meteor.user());

return (
    <div className='app-wrapper'>
      {user ? (
          <Router>
            <Header />
            <div className='home-content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/mylobby" element={<MyLobby />} />
              <Route path="/otherlobby" element={<OtherLobby />} />
              <Route path="/edit" element={<Edit /> } />
              <Route path="*" element={<Home />} />
            </Routes>
            </div>
            <Chat />
          </Router>
          ) : (
            <Router>
              <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<LoginForm />} />
              </Routes>
            </Router>
          )}
    </div>
  )
};
