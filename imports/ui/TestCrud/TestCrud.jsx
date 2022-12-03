import React, {useState} from 'react'
import { NameCollection } from '../../api/links';
import { useTracker } from 'meteor/react-meteor-data';
import './test.css'

function TestCrud() {
    const [name, setName] = useState('');

    const onSubmit = () => {
        NameCollection.insert({ name });
      };

    const names = useTracker(() => {
      return NameCollection.find().fetch();
    });

  return (
    <div className='testcrud'>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={onSubmit}>Submit name</button>
        <div>
          <h4>List of names</h4>
          <div>
            {names.map( name =>{
              <span key={name._id}>{name.name}</span>
            })}
          </div>
        </div>
    </div>
  )
}

export default TestCrud