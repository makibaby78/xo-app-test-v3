import React from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import { LobbyCollection } from '/imports/api/lobbyinfo';
import { useNavigate } from "react-router-dom";
import './home.css'

function Home() {
    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user());

    const lobbyinfo = useTracker(() => {
      Meteor.subscribe('allLobby');
      return LobbyCollection.findOne({'username':`${user.username}`});
    });
    
    const createlobby = () => {
        LobbyCollection.update(lobbyinfo._id, {
          $set: {
            lobby:true,
            board: Array(9).fill(null),
            playerturn: 'X',
            opponent: null,
            winner: null,
            oscore: 0,
            xscore: 0,
            boxcounter: 1,
          }
        });
        navigate("/mylobby");
    };
  return (
    <div className='home-wrapper'>
      <div className='hw-inner'>
        <div onClick={createlobby} className='create-lobby'>
          Create Lobby
        </div>
        <Link to="/lobby" className='tc-n create-lobby'>
          List of Lobby
        </Link>
      </div>
    </div>
  )
}

export default Home