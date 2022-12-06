import React, { useState, useEffect } from 'react'
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

  console.log(mylobbyinfo)

  function moveTracker(index){
    let newBoxes = [...allLobby.filter(lists => lists.username===user.username)[0].board];
    let newBoxStat = [...allLobby.filter(lists => lists.username===user.username)[0].boxstat];
    if(newBoxes[index]===null&&mylobbyinfo.playerturn==='X'){
      newBoxStat.splice(index, 1, true);
      newBoxes[index] = mylobbyinfo.playerturn;
      LobbyCollection.update(mylobbyinfo._id, {
        $set: {
          board: newBoxes,
          boxstat: newBoxStat,
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
            stopper: 'stop',
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
            stopper: 'stop',
          }
        });
      }else if(mylobbyinfo.boxcounter===9){
        LobbyCollection.update(mylobbyinfo._id, {
          $set: {
            winner: 'Draw',
            wintext: 'Draw',
            stopper: 'stop',
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
          boxstat: Array(9).fill(false),
          playerturn: 'X',
          winner: null,
          xscore: mylobbyinfo.xscore + 1,
          boxcounter: 1,
          stopper: null,
        }
      });
    }else if(winner==='O'){
      LobbyCollection.update(mylobbyinfo._id, {
        $set: {
          board: Array(9).fill(null),
          boxstat: Array(9).fill(false),
          playerturn: 'X',
          winner: null,
          oscore: mylobbyinfo.oscore + 1,
          boxcounter: 1,
          stopper: null,
        }
      });
    }else if(winner==='Draw'){
      LobbyCollection.update(mylobbyinfo._id, {
        $set: {
          board: Array(9).fill(null),
          boxstat: Array(9).fill(false),
          playerturn: 'X',
          winner: null,
          boxcounter: 1,
          stopper: null,
        }
      });
    }
  }

  return (
    <div className='m-lobby-wrapper'>
        {allLobby.filter(lists => lists.username===user.username).map((lists)=>{
          return(
          <div key={lists._id} className='mlw-board'>
            <div className='lobby-owner'>
              <span>My Lobby</span>
            </div>
            <div className='lobby-names'>
              <div className='bg-owner owner-name'>
                <h4>{lists.firstname}  : <span className='xo-style'>X</span></h4>
              </div>
              <div className='bg-opponent opponent-name'>
                {lists.opponent===null ?
                  <h4>...Waiting for opponent</h4>:
                  <h4>{lists.opponent} : <span className='xo-style'>O</span></h4>
                }
              </div>
            </div>
            <div className={`pt-wrapper ${lists.playerturn} ${lists.stopper}`}>
              <div className='pt players-turn-x'>YOUR TURN</div>
              <div className='pt players-turn-o'>OPPONENTS TURN</div>
            </div>
              <div key={lists._id} className='xo-content'>
                  <div>   
                      <h4>Player's Turn: {lists.playerturn}</h4>
                      <div className='score-board'>
                        <div className='bg-owner'>
                            <span>X : {lists.xscore}</span>
                        </div>
                        <div className='bg-opponent'>
                            <span>O : {lists.oscore}</span>
                        </div>
                      </div>
                  </div>
                  <div className='xo-ic'>
                    <div className='xo-board-wrapper' >
                      <div onClick={()=>{moveTracker(0)}} className={lists.boxstat[0] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[0]}
                      </div>
                      <div onClick={()=>{moveTracker(1)}} className={lists.boxstat[1] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[1]}
                      </div>
                      <div onClick={()=>{moveTracker(2)}} className={lists.boxstat[2] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[2]}
                      </div>
                      <div onClick={()=>{moveTracker(3)}} className={lists.boxstat[3] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[3]}
                      </div>
                      <div onClick={()=>{moveTracker(4)}} className={lists.boxstat[4] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[4]}
                      </div>
                      <div onClick={()=>{moveTracker(5)}} className={lists.boxstat[5] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[5]}
                      </div>
                      <div onClick={()=>{moveTracker(6)}} className={lists.boxstat[6] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[6]}
                      </div>
                      <div onClick={()=>{moveTracker(7)}} className={lists.boxstat[7] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[7]}
                      </div>
                      <div onClick={()=>{moveTracker(8)}} className={lists.boxstat[8] ? `show box ${lists.playerturn}`:`box ${lists.playerturn}`}>
                        {lists.board[8]}
                      </div>
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