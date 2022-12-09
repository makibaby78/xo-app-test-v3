import { Mongo } from 'meteor/mongo';

export const UserCollection = new Mongo.Collection('userinfo');

Meteor.methods({
    'userinfo.insert'({ username, firstname, lastname, email, password, profileurl }){
        return UserCollection.insert({ username, firstname, lastname, email, password, profileurl })
    },
})

