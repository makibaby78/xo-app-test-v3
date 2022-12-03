import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { LinksCollection } from '/imports/api/links';
import { LobbyCollection } from '../imports/api/lobbyinfo';
import { UserCollection } from '../imports/api/userinfo';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';


async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}
/* Running */
Meteor.publish('allLobby', ()=>{
  return LobbyCollection.find();
})
Meteor.publish('allUsers', ()=>{
  return UserCollection.find();
})
/* End of running */
// Meteor.publish('lobbyInfo', ({username})=>{
//   return LobbyCollection.find({username});
// })

// Meteor.publish('userInfo', function(){
//   return UserCollection.find({username: this.username});
// })

// Meteor.publish('userAll', function(){
//   return UserCollection.find();
// })

Meteor.publish('userByUsername', ({username}) => {
  return UserCollection.find({username});
})

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }
});
