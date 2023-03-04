import React from 'react';
import { useCollection } from '../../hooks/useCollection';

//components
import Avatar from '../avatar/Avatar';

//styles
import './UsersSidebar.css';

export default function UsersSidebar() {
   const { error, documents } = useCollection('users');

   console.log(documents);
   return (
      <div className='user-list'>
         <h2>All Users</h2>
         {error && <div className='eror'>{error}</div>}
         {documents &&
            documents.map((userDoc) => {
               return (
                  <div key={userDoc.id} className='user-list-item'>
                     {userDoc.online && <span className='online-user' />}
                     <span>{userDoc.displayName}</span>
                     <Avatar imageSource={userDoc.photoURL} />
                  </div>
               );
            })}
      </div>
   );
}
