import React, { useState, useRef, useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data';
import { UserCollection } from '../../api/userinfo';
import { ChatCollection } from '../../api/chat';
import './chat.css'


function Chat() {
    const [hide, setHide] = useState('hide')
    const [chat, setChat] = useState('')
    const bottomRef = useRef(null)

    const user = useTracker(() => Meteor.user());

    const allChat = useTracker(() => {
        Meteor.subscribe('allChat');
        return ChatCollection.find().fetch();
    })

    const handleChange = e => {
        setChat(e.target.value);
    }

    const userInfo = useTracker(() => {
        Meteor.subscribe('allUsers');
        return UserCollection.findOne({'username':`${user.username}`});
    })

    const sendChat = () => {
        Meteor.call('chat.insert', { chattext: `${userInfo.firstname} : ${chat}` })
        setChat('')
    }
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            Meteor.call('chat.insert', { chattext: `${userInfo.firstname} : ${chat}` })
            setChat('')
        }
    }

    function minimize(){
        if(hide==='hide'){
            setHide('show')
        }else{
            setHide('hide')
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [allChat]);

  return (
    <div className='chat-wrapper'>
        <div className='chat-header'>
            <div onClick={minimize} className='icon-wrapper'>
                -
            </div>
        </div>
        <div className={`chat-content-wrapper ${hide}`}>
            <div className='cw-inner'>
                <div className='all-chat'>
                {allChat.map((lists)=>{
                    return(
                        <p key={lists._id}>{lists.chattext}</p>
                    )
                })}
                <div ref={bottomRef} />
                </div>
                <div className='send-chat'>
                    <div onClick={sendChat} className='des-chat'>Chat</div>
                    <input className='in-chat' type='text' onKeyDown={handleKeyDown} onChange={handleChange} value={chat} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat