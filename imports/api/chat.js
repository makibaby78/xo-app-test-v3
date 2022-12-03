import { Mongo } from 'meteor/mongo';

export const ChatCollection = new Mongo.Collection('chat');

Meteor.methods({
    'chat.insert'({ chattext }){
        return ChatCollection.insert({ chattext })
    },
})
