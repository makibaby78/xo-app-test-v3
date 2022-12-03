import React from 'react'
import { useNavigate } from "react-router-dom";
import { Meteor } from 'meteor/meteor'
import { UserCollection } from '../../api/userinfo';
import { LobbyCollection } from '../../api/lobbyinfo';
import { Link } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data';
import './lobby.css'

function Lobby() {
  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());
  const lobbylist = useTracker(() => {
    Meteor.subscribe('allLobby');
    return LobbyCollection.find().fetch();
  });

  const lobbyUserInfo = useTracker(() => {
      Meteor.subscribe('allLobby');
      return LobbyCollection.findOne({'username':`${user.username}`});
  });

  const lobbyOwnerInfo = UserCollection.findOne({'username':`${user.username}`});

  const otherLobby = (username) => {
    const lobbyinfo = LobbyCollection.findOne({'username':`${username}`});
    Meteor.call('lobby.update', { lobbyId: lobbyinfo._id, opponentName: lobbyOwnerInfo.firstname, lobbyStat: true })
    
    LobbyCollection.update(lobbyUserInfo._id, {
        $set: {
          otherlobby: {
            lobbyname: lobbyinfo.firstname,
            currentlobby: lobbyinfo.username,
          },
        }
    });
    navigate("/otherlobby");
  }

  const closeLobby = (id) => {
    Meteor.call('lobby.update', { lobbyId: id, opponentName: null, lobbyStat: false })
  }

  return (
    <div className='lobby-wrapper'>
      <h4>Lobby</h4>
        <div className='ll-wrapper'>
          {lobbylist.filter(lists => lists.lobby===true).map((list)=>{
            return (
              <div className='lobby-box' key={list._id}>
                {list.username===user.username ? 
                <>
                  <div className='lobby-design'>
                    <Link to="/mylobby" className='tc-n'>
                        <span>Your Lobby</span>
                    </Link>
                  </div>
                    <span onClick={() => closeLobby(list._id)}  className='remove-btn'>x</span>
                </>
                : 
                <div onClick={()=>{otherLobby(list.username)}} className='lobby-design'>
                  <span>
                    {list.firstname} {list.lastname}
                  </span>
                </div>
                }
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Lobby