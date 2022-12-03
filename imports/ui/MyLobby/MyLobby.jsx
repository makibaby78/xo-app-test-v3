import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { LobbyCollection } from '../../api/lobbyinfo'
import { useTracker } from 'meteor/react-meteor-data';
import './mylobby.css'

function MyLobby() {
  const user = useTracker(() => Meteor.user());

  const allLobby = useTracker(() => {
    Meteor.subscribe('allLobby');
    return LobbyCollection.find().fetch();
  });

  const mylobbyinfo = useTracker(() => {
    Meteor.subscribe('allLobby');
    return LobbyCollection.findOne({'username':`${user.username}`});
  });

  function moveTracker(index){
    const newBoxes = [...allLobby.filter(lists => lists.username===user.username)[0].board];

    if(newBoxes[index]===null&&mylobbyinfo.playerturn==='X'){
      newBoxes[index] = mylobbyinfo.playerturn;
      LobbyCollection.update(mylobbyinfo._id, {
        $set: {
          board: newBoxes,
          playerturn: 'O',
          boxcounter: mylobbyinfo.boxcounter + 1,
        }
      });
      if(newBoxes[0]==='X'&&newBoxes[1]==='X'&&newBoxes[2]==='X'||
      newBoxes[3]==='X'&&newBoxes[4]==='X'&&newBoxes[5]==='X'||
      newBoxes[6]==='X'&&newBoxes[7]==='X'&&newBoxes[8]==='X'||
      newBoxes[0]==='X'&&newBoxes[3]==='X'&&newBoxes[6]==='X'||
      newBoxes[1]==='X'&&newBoxes[4]==='X'&&newBoxes[7]==='X'||
      newBoxes[2]==='X'&&newBoxes[5]==='X'&&newBoxes[8]==='X'||
      newBoxes[0]==='X'&&newBoxes[4]==='X'&&newBoxes[8]==='X'||
      newBoxes[2]==='X'&&newBoxes[4]==='X'&&newBoxes[6]==='X'){
        LobbyCollection.update(mylobbyinfo._id, {
          $set: {
            winner: 'X',
            wintext: 'Player X wins',
          }
        });
      }else if(newBoxes[0]==='O'&&newBoxes[1]==='O'&&newBoxes[2]==='O'||
      newBoxes[3]==='O'&&newBoxes[4]==='O'&&newBoxes[5]==='O'||
      newBoxes[6]==='O'&&newBoxes[7]==='O'&&newBoxes[8]==='O'||
      newBoxes[0]==='O'&&newBoxes[3]==='O'&&newBoxes[6]==='O'||
      newBoxes[1]==='O'&&newBoxes[4]==='O'&&newBoxes[7]==='O'||
      newBoxes[2]==='O'&&newBoxes[5]==='O'&&newBoxes[8]==='O'||
      newBoxes[0]==='O'&&newBoxes[4]==='O'&&newBoxes[8]==='O'||
      newBoxes[2]==='O'&&newBoxes[4]==='O'&&newBoxes[6]==='O'){
        LobbyCollection.update(mylobbyinfo._id, {
          $set: {
            winner: 'O',
            wintext: 'Player O wins',
          }
        });
      }else if(mylobbyinfo.boxcounter===9){
        LobbyCollection.update(mylobbyinfo._id, {
          $set: {
            winner: 'Draw',
            wintext: 'Draw',
          }
        });
        console.log("Draw")
      }
    }
  }

  function nextround(winner){
    if(winner==='X'){
      LobbyCollection.update(mylobbyinfo._id, {
        $set: {
          board: Array(9).fill(null),
          playerturn: 'X',
          winner: null,
          xscore: mylobbyinfo.xscore + 1,
          boxcounter: 1,
        }
      });
    }
    if(winner==='O'){
      LobbyCollection.update(mylobbyinfo._id, {
        $set: {
          board: Array(9).fill(null),
          playerturn: 'X',
          winner: null,
          oscore: mylobbyinfo.oscore + 1,
          boxcounter: 1,
        }
      });
    }
    if(winner==='Draw'){
      LobbyCollection.update(mylobbyinfo._id, {
        $set: {
          board: Array(9).fill(null),
          playerturn: 'X',
          winner: null,
          boxcounter: 1,
        }
      });
    }
  }

  return (
    <div className='m-lobby-wrapper'>
        {allLobby.filter(lists => lists.username===user.username).map((lists)=>{
          return(
          <div key={lists._id} className='mlw-board'>
            <div className='lobby-names'>
              <h4>My Lobby : X</h4>
              <div>
                {lists.opponent===null ?
                  <h4>...Waiting for opponent</h4>:
                  <h4>{lists.opponent} : O</h4>
                }
              </div>
            </div>
              <div key={lists._id} className='xo-content'>
                  <div>   
                      <h4>Player's Turn: {lists.playerturn}</h4>
                      <div className='score-board'>
                        <div>
                            <span>X: {lists.xscore}</span>
                        </div>
                        <div>
                            <span>O: {lists.oscore}</span>
                        </div>
                      </div>
                  </div>
                  <div className='xo-ic'>
                    <div className='xo-board-wrapper' >
                      <div onClick={()=>{moveTracker(0)}} className={`box box1 ${lists.winner}`}>{lists.board[0]}</div>
                      <div onClick={()=>{moveTracker(1)}} className='box box2'>{lists.board[1]}</div>
                      <div onClick={()=>{moveTracker(2)}} className='box box3'>{lists.board[2]}</div>
                      <div onClick={()=>{moveTracker(3)}} className='box box4'>{lists.board[3]}</div>
                      <div onClick={()=>{moveTracker(4)}} className='box box5'>{lists.board[4]}</div>
                      <div onClick={()=>{moveTracker(5)}} className='box box6'>{lists.board[5]}</div>
                      <div onClick={()=>{moveTracker(6)}} className='box box7'>{lists.board[6]}</div>
                      <div onClick={()=>{moveTracker(7)}} className='box box8'>{lists.board[7]}</div>
                      <div onClick={()=>{moveTracker(8)}} className='box box9'>{lists.board[8]}</div>
                    </div>
                    <div className={`xo-next-round ${lists.winner}`}>
                      <h5>{lists.wintext}</h5>
                        <button className='nxt-btn' onClick={()=>{nextround(lists.winner)}}>Proceed to next round</button>
                    </div>
                  </div>
              </div>
            </div>
            )})}
    </div>
  )
}

export default MyLobby