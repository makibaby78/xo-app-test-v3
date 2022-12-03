import React, { useEffect, useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { LobbyCollection } from '../../api/lobbyinfo'
import { useTracker } from 'meteor/react-meteor-data';

function OtherLobby() {
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
        const otherlobbyinfo = LobbyCollection.findOne({'username':`${mylobbyinfo.otherlobby.currentlobby}`});

        const newBoxes = [...allLobby.filter(lists => lists.username===mylobbyinfo.otherlobby.currentlobby)[0].board];


          if(newBoxes[index]===null&&otherlobbyinfo.playerturn==='O'){
            newBoxes[index] = otherlobbyinfo.playerturn;
            LobbyCollection.update(otherlobbyinfo._id, {
              $set: {
                board: newBoxes,
                playerturn: 'X',
                boxcounter: otherlobbyinfo.boxcounter + 1,
              }
            });
            if(newBoxes[0]==='O'&&newBoxes[1]==='O'&&newBoxes[2]==='O'||
            newBoxes[3]==='O'&&newBoxes[4]==='O'&&newBoxes[5]==='O'||
            newBoxes[6]==='O'&&newBoxes[7]==='O'&&newBoxes[8]==='O'||
            newBoxes[0]==='O'&&newBoxes[3]==='O'&&newBoxes[6]==='O'||
            newBoxes[1]==='O'&&newBoxes[4]==='O'&&newBoxes[7]==='O'||
            newBoxes[2]==='O'&&newBoxes[5]==='O'&&newBoxes[8]==='O'||
            newBoxes[0]==='O'&&newBoxes[4]==='O'&&newBoxes[8]==='O'||
            newBoxes[2]==='O'&&newBoxes[4]==='O'&&newBoxes[6]==='O'){
              console.log("Player O wins")
              LobbyCollection.update(otherlobbyinfo._id, {
                $set: {
                  winner: 'O',
                  wintext: 'Player O wins',
                }
              });
            }
          }else if(newBoxes[0]==='X'&&newBoxes[1]==='X'&&newBoxes[2]==='X'||
          newBoxes[3]==='X'&&newBoxes[4]==='X'&&newBoxes[5]==='X'||
          newBoxes[6]==='X'&&newBoxes[7]==='X'&&newBoxes[8]==='X'||
          newBoxes[0]==='X'&&newBoxes[3]==='X'&&newBoxes[6]==='X'||
          newBoxes[1]==='X'&&newBoxes[4]==='X'&&newBoxes[7]==='X'||
          newBoxes[2]==='X'&&newBoxes[5]==='X'&&newBoxes[8]==='X'||
          newBoxes[0]==='X'&&newBoxes[4]==='X'&&newBoxes[8]==='X'||
          newBoxes[2]==='X'&&newBoxes[4]==='X'&&newBoxes[6]==='X'){
            console.log("Player X wins")
            LobbyCollection.update(otherlobbyinfo._id, {
              $set: {
                winner: 'X',
                wintext:'Player X wins',
              }
            });
          }else if(otherlobbyinfo.boxcounter===9){
          LobbyCollection.update(otherlobbyinfo._id, {
            $set: {
              winner: 'Draw',
              wintext: 'Draw',
            }
          });
        }
    }
    function nextround(winner){
      const otherlobbyinfo = LobbyCollection.findOne({'username':`${mylobbyinfo.otherlobby.currentlobby}`});

      if(winner==='X'){
        LobbyCollection.update(otherlobbyinfo._id, {
          $set: {
            board: Array(9).fill(null),
            playerturn: 'X',
            winner: null,
            xscore: otherlobbyinfo.xscore + 1,
            boxcounter: 1,
          }
        });
      }
      if(winner==='O'){
        LobbyCollection.update(otherlobbyinfo._id, {
          $set: {
            board: Array(9).fill(null),
            playerturn: 'X',
            winner: null,
            oscore: otherlobbyinfo.oscore + 1,
            boxcounter: 1,
          }
        });
      }
      if(winner==='Draw'){
        LobbyCollection.update(otherlobbyinfo._id, {
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
        {allLobby.filter(lists => lists.username===mylobbyinfo.otherlobby.currentlobby).map((lists)=>{
            return(
            <div key={lists._id} className='mlw-board'>
              <div className='lobby-names'>
                <h4>You: {lists.firstname} : O</h4>
                <h4>Host: {lists.otherlobby.lobbyname} : X</h4>
              </div>
              <div className='xo-content'>
                <h4>Player's Turn: {lists.playerturn}</h4>
                <div className='score-board'>
                  <div>
                      <span>X: {lists.xscore}</span>
                  </div>
                  <div>
                      <span>O: {lists.oscore}</span>
                  </div>
                </div>
                <div key={lists._id} className='xo-ic'>
                  <div className='xo-board-wrapper'>
                    <div onClick={()=>{moveTracker(0)}} className='box box1'>{lists.board[0]}</div>
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

export default OtherLobby