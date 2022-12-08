import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data';
import { UserCollection } from '../../api/userinfo';
import { LobbyCollection } from '../../api/lobbyinfo';
import { useNavigate } from "react-router-dom";
import './header.css'

function Header() {
    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const [hide, setHide] = useState('hide')

    const hideSettings = () => {
        if(hide==='hide'){
            setHide('show')
        }else{
            setHide('hide')
        }
    }    

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

    const edit = () => {
        setHide('hide')
        navigate("/edit")
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
            {userlist.filter(lists => lists.username===user.username).map((lists, index)=>{
                return(
                    <Link className='link-ns-2' to='/' key={index}>
                        <span>{lists.firstname} {lists.lastname}</span>
                    </Link>
                )
            })}
            </div>
            {userlist.filter(lists => lists.username===user.username).map((lists, index)=>{
                  return(
                        <div key={index} className='lg-btn'>
                            <div onClick={hideSettings} className='header-profile-image'>
                            {lists.profileurl===null?
                                <img alt='your-picture' src='https://picsum.photos/200' />
                                :
                                <img alt='your-picture' src={`${lists.profileurl}`} />
                            }
                            </div>
                            
                            <div className={`header-options ${hide}`}>
                                <div className='h-option header-name'><h4>{lists.firstname} {lists.lastname}</h4></div>
                                <div onClick={edit} className='h-option header-edit'>Settings</div>
                                <div onClick={logout} className='h-option header-logout'>Logout</div>
                            </div>
                        </div>
                )
            })}
        </div>
    </div>
  )
}

export default Header