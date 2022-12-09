import { Mongo } from 'meteor/mongo';

export const LobbyCollection = new Mongo.Collection('lobby');

Meteor.methods({
    'lobby.insert'({ username, firstname, lastname, lobby, opponent, board, profileurl}){
        return LobbyCollection.insert({ username, firstname, lastname, lobby, opponent, board, profileurl })
    },
    'lobby.update'( {lobbyId, opponentName, lobbyStat, opponenturl} ){
        LobbyCollection.update(lobbyId, {
            $set: {
              lobby: lobbyStat,
              opponent: opponentName,
              opponenturl: opponenturl,
            }
        });
    },
    'lobby.findOne'({ accountUsername }){
        return LobbyCollection.findOne({ username: accountUsername })
    },
})