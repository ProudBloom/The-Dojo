import React from 'react';

//styles
import './Avatar.css';

export default function Avatar({ imageSource }) {
   return (
      <div className='avatar'>
         <img src={imageSource} alt='profile avatar' />
      </div>
   );
}
