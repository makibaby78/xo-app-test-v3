import { Mongo } from 'meteor/mongo';

export const LobbyCollection = new Mongo.Collection('lobby');

Meteor.methods({
    'lobby.insert'({ username, firstname, lastname, lobby, opponent, board}){
        return LobbyCollection.insert({ username, firstname, lastname, lobby, opponent, board })
    },
    'lobby.update'( {lobbyId, opponentName, lobbyStat} ){
        LobbyCollection.update(lobbyId, {
            $set: {
              lobby: lobbyStat,
              opponent: opponentName,
            }
        });
    },
    'lobby.findOne'({ accountUsername }){
        return LobbyCollection.findOne({ username: accountUsername })
    },
})