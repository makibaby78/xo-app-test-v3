import React from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import { LobbyCollection } from '../../api/lobbyinfo';
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
        Meteor.subscribe('allLobby');
        LobbyCollection.update(lobbyinfo._id, {
          $set: {
            currentlobby: null,
            lobbyname: null,
            lobby:true,
            board: Array(9).fill(null),
            boxstat: Array(9).fill(false),
            playerturn: 'X',
            playerfirstturn: 'X',
            opponent: null,
            winner: 'Start',
            wintext: 'TikTakToe',
            oscore: 0,
            xscore: 0,
            boxcounter: 1,
            stopper: null,
            opponenturl: null,
            xready: null,
            oready: null,
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