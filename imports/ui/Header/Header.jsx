import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data';
import { UserCollection } from '../../api/userinfo';
import { LobbyCollection } from '../../api/lobbyinfo';
import './header.css'

function Header() {
    const user = useTracker(() => Meteor.user());

    const userlist = useTracker(() => {
        Meteor.subscribe('allUsers');
        return UserCollection.find().fetch();
    });

    const lobbyinfo = useTracker(() => {
        Meteor.subscribe('allLobby');
        return LobbyCollection.findOne({'username':`${user.username}`});
    });

    const logout = () => {
        LobbyCollection.update(lobbyinfo._id, {
            $set: {
              lobby:false,
            }
          });
        Meteor.logout();
    }  

  return (
    <div className='header-wrapper'>
        <div className='hi-wrapper'>
            <div className='ttt-logo'>
                <Link className='link-ns-1' to='/'>
                    <span>TikTakToe</span>
                </Link>
            </div>
            <div className='user-name'>
            {userlist.filter(lists => lists.username===user.username).map((lists)=>{
                return(
                    <Link className='link-ns-2' to='/' key={lists._id}>
                        <span>{lists.firstname} {lists.lastname}</span>
                    </Link>
                )
            })}
            </div>
            <div className='lg-btn' onClick={logout}>
                <span>Logout</span>
            </div>
        </div>
    </div>
  )
}

export default Header