import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LinksCollection } from '../api/links';

export const Info = () => {
  const [formTarget, setFormTarget] = useState(null);
  const links = useTracker(() => {
    return LinksCollection.find().fetch();
  });

  const renderLinkForm = () => {
    return formTarget
      ? (<LinkForm onSubmitted={() => setFormTarget(null)} doc={formTarget.doc} type={formTarget.type} />)
      : null
  };

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{links.map(link => 
      <li key={link._id}>
          <a href={link.url} target="_blank">{link.title}</a>
          <button onClick={() => setFormTarget({ type: 'update', doc: link })}>Update</button>
          <button onClick={() => LinksCollection.remove({ _id: link._id })}>Delete</button>
        </li>
      )}</ul>
      {renderLinkForm()}
      <button onClick={() => setFormTarget({ type: 'insert' })}>Create new</button>
    </div>
  );
};


const LinkForm = ({  type, doc, onSubmitted  }) => {
  const [title, setTitle] = useState(doc?.title ?? '');
  const [url, setUrl] = useState(doc?.url ?? '');

  const onSubmit = () => {
    let result;
    if (type === 'insert') {
      result = LinksCollection.insert({ title, url });
    }
    if (type === 'update') {
      result = LinksCollection.update(doc._id, { $set: { title, url } });
    }
    onSubmitted(result);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Title</span>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        <span>URL</span>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}