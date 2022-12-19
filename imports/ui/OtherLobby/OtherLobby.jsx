import React from 'react'
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

    function playerfirst(turn){
      if(turn==='X'){
        LobbyCollection.update(mylobbyinfo._id, {
          $set: {
            playerfirstturn: 'O',
          }
        })
      }if(turn==='O'){
        LobbyCollection.update(mylobbyinfo._id, {
          $set: {
            playerfirstturn: 'X'
          }
        })
      }
    } 
    
    function moveTracker(index){
        const otherlobbyinfo = LobbyCollection.findOne({'username':`${mylobbyinfo.currentlobby}`});
        let firstmove;
        firstmove = allLobby.filter(lists => lists.username===otherlobbyinfo.username)[0].playerfirstturn;

        let newBoxStat = [...allLobby.filter(lists => lists.username===otherlobbyinfo.username)[0].boxstat];
        let newBoxes = [...allLobby.filter(lists => lists.username===mylobbyinfo.currentlobby)[0].board];
        if(otherlobbyinfo.playerturn!=='O') return;
        if(newBoxes[index]!==null) return ;
            newBoxStat.splice(index, 1, true);
            newBoxes[index] = otherlobbyinfo.playerturn;
            LobbyCollection.update(otherlobbyinfo._id, {
              $set: {
                board: newBoxes,
                boxstat: newBoxStat,
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
              playerfirst(firstmove);
              LobbyCollection.update(otherlobbyinfo._id, {
                $set: {
                  winner: 'O',
                  wintext: 'Player O wins',
                  stopper: 'stop',
                }
              });
            }else if(newBoxes[0]==='X'&&newBoxes[1]==='X'&&newBoxes[2]==='X'||
            newBoxes[3]==='X'&&newBoxes[4]==='X'&&newBoxes[5]==='X'||
            newBoxes[6]==='X'&&newBoxes[7]==='X'&&newBoxes[8]==='X'||
            newBoxes[0]==='X'&&newBoxes[3]==='X'&&newBoxes[6]==='X'||
            newBoxes[1]==='X'&&newBoxes[4]==='X'&&newBoxes[7]==='X'||
            newBoxes[2]==='X'&&newBoxes[5]==='X'&&newBoxes[8]==='X'||
            newBoxes[0]==='X'&&newBoxes[4]==='X'&&newBoxes[8]==='X'||
            newBoxes[2]==='X'&&newBoxes[4]==='X'&&newBoxes[6]==='X'){
              playerfirst(firstmove);
              LobbyCollection.update(otherlobbyinfo._id, {
                $set: {
                  winner: 'X',
                  wintext:'Player X wins',
                  stopper: 'stop',
                }
              });
            }else if(otherlobbyinfo.boxcounter===9){
              playerfirst(firstmove);
              LobbyCollection.update(otherlobbyinfo._id, {
                $set: {
                  winner: 'Draw',
                  wintext: 'Draw',
                  stopper: 'stop',
                }
                });
            }
    }
    function readyBtn(){
      const otherlobbyinfo = LobbyCollection.findOne({'username':`${mylobbyinfo.currentlobby}`});
      if(otherlobbyinfo.oready!=='ready-o'){
        LobbyCollection.update(otherlobbyinfo._id, {
          $set: {
            oready: 'ready-o',
          }
        });
      }else{
        LobbyCollection.update(otherlobbyinfo._id, {
          $set: {
            oready: '',
          }
        });
      }
    }
  return (
    <div className='m-lobby-wrapper'>
        {allLobby.filter(lists => lists.username===mylobbyinfo.currentlobby).map((lists)=>{
            return(
            <div key={lists._id} className='mlw-board'>
              <div className='lobby-owner'>
                <span>{lists.firstname}'s Lobby</span>
              </div>
              <div className='lobby-names'>
                <div className='bg-owner owner-name'>
                    {allLobby.filter(lists=>lists.username===user.username).map((lists)=>{
                      return(
                        <h4 key={lists._id}>{lists.firstname} : <span className='xo-style'>O</span></h4>
                      )
                    })}
                </div>
                <div className='bg-opponent opponent-name'>
                  <h4>{lists.firstname} : <span className='xo-style'>X</span></h4>
                </div>
              </div>
              <div className={`pt-wrapper ${lists.playerturn} ${lists.stopper}`}>
                <div className='pt players-turn-o'>
                  <div className='pt-ptx-inner'>
                  <div className='pt-owner-image'>
                    <img alt='your-picture' src={`${lists.opponenturl}`} />
                  </div>
                  <div className='pt-text-style'>
                    <span>YOUR TURN</span>
                  </div>                            
                </div>
                </div>
                <div className='pt players-turn-x'>
                  <div className='pt-ptx-inner'> 
                  <div className='pt-text-style'>
                    <span>OPPONENTS TURN</span>
                  </div>
                  <div className='pt-owner-image'>
                    <img alt='your-picture' src={`${lists.profileurl}`} />
                  </div> 
                </div>
                </div>
              </div>
              <div className='xo-content'>
                <h4>Player's Turn: {lists.playerturn}</h4>
                <div className='score-board'>
                  <div className='bg-owner'>
                      <span>X : {lists.xscore}</span>
                  </div>
                  <div className='bg-opponent'>
                      <span>O : {lists.oscore}</span>
                  </div>
                </div>
                <div key={lists._id} className='xo-ic'>
                  <div className='xo-board-wrapper'>
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
                </div>
              </div>
              <div className={`next-round ${lists.winner} ${lists.xready} ${lists.oready}`}>
                <h5>{lists.wintext}</h5>
                <div className='nxt-wrapper-btn'>
                  <div className='rn-wrapper'>
                    <div className='ready-owner-btn'>✓</div>
                    <button className='rd-btn'>Player X Ready</button>
                  </div>
                  <div className='rn-wrapper'>
                    <div className='ready-opponent-btn'>✓</div>
                    <button onClick={readyBtn} className='rd-btn' >Player O Ready</button>
                  </div>
                </div>
                {lists.winner==='Start'?
                  <button className='nxt-btn otherlobby-effect'>Wait for the lobby owner response</button>
                  :
                  <button className='nxt-btn otherlobby-effect'>Wait for the lobby owner response</button>
                }
              </div>
            </div>
        )})}
  </div>
  )
}

export default OtherLobby