import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserCollection } from '../../api/userinfo';
import { storage } from '../firebase/firebase';
import { useNavigate  } from 'react-router-dom'
import { 
  ref,
  uploadBytes, 
  getDownloadURL,  
} from 'firebase/storage';
import './edit.css';

function Edit() {
    const user = useTracker(() => Meteor.user());
    
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const navigate = useNavigate();

    const userlist = useTracker(() => {
      Meteor.subscribe('allUsers');
      return UserCollection.find().fetch();
    });

    const userInfo = useTracker(() => {
      Meteor.subscribe('allUsers');
      return UserCollection.findOne({'username':`${user.username}`});
    });

    function save(){
      UserCollection.update(userInfo._id, {
          $set: {
            firstname: firstname.charAt(0).toUpperCase()+firstname.slice(1),
            lastname: lastname.charAt(0).toUpperCase()+lastname.slice(1),
          }
      });
      alert("Profile updated")
    }
    const [imageUpload, setImageUpload] = useState(null);
    const uploadFile = () => {
      if(imageUpload==null) return;
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url) => {
          UserCollection.update(userInfo._id, {
            $set: {
              profileurl: url,
            }
          });
        })
      })
    }
  return (
    <div className="edit-wrapper">
        <div className='edit-content'>
            <div className='edit-box'>
                <h4>General profile settings</h4>
                <div className='edit-name'>
                {userlist.filter(lists => lists.username===user.username).map((lists, index)=>{
                  return(
                    <div key={index} className='profile-image'>
                      {lists.profileurl===null?
                        <img alt='your-picture' src='https://picsum.photos/200' />
                          :
                        <img alt='your-picture' src={`${lists.profileurl}`} />
                      }
                    </div>
                    )
                })}
                    <div className='ec-ubw'>
                      <input type='file' onChange={(event) => {setImageUpload(event.target.files[0])}} />
                      <button onClick={uploadFile}>Upload Image</button>
                    </div>
                    {userlist.filter(lists => lists.username===user.username).map((lists, index)=>{
                      return(
                        <table key={index} >
                            <tbody>
                                <tr>
                                    <td className='ec-td-left'>
                                      <label type='text'>Firstname</label>
                                    </td>
                                    <td className='ec-td-right'>
                                      <input 
                                        value={firstname}
                                        type='text'
                                        name="firstname" 
                                        required 
                                        onChange={(e) => setFirstname(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='ec-td-left'>
                                      <label type='text'>Lastname</label>
                                    </td>
                                    <td className='ec-td-right'>
                                      <input 
                                        value={lastname}
                                        type="text"
                                        name="lastname"
                                        required
                                        onChange={(e) => setLastname(e.target.value)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        )
                    })}
                    <div className='ec-btn-wrapper'>
                        <button onClick={save} className='ec-btn ec-save-btn'>Save</button>
                        <button onClick={() => navigate("/")} className='ec-btn ec-cancel-btn'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Edit