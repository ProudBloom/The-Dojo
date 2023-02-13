import { useState } from 'react';

//styles
import './Signup.css';

export default function Signup() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [displayName, setDisplayName] = useState('');
   const [thumbnail, setThumbnail] = useState(null);
   const [thumbnailError, setThumbnailError] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email, password, displayName, thumbnail);
   };

   const handleFileInput = (e) => {
      setThumbnail(null);
      let selected = e.target.files[0];

      if (!selected) {
         setThumbnailError('No file is selected, please select a file');
         return;
      } else if (!selected.type.includes('image')) {
         setThumbnailError('File type must be an image');
         return;
      } else if (selected.size > 100000) {
         setThumbnailError('File is too big (max. 100kB)');
         return;
      }

      setThumbnailError(null);
      setThumbnail(selected);

      console.log('thumbnail updated');
   };

   return (
      <form className='auth-form' onSubmit={handleSubmit}>
         <h2>Sign Up</h2>
         <div className='auth-content'>
            <label>
               <span>Email:</span>
               <input type='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
            <label>
               <span>Password:</span>
               <input type='password' required onChange={(e) => setPassword(e.target.value)} value={password} />
            </label>
            <label>
               <span>Display Name:</span>
               <input type='text' required onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
            </label>
            <label>
               <span>Profile Thumbnail:</span>
               <input type='file' required onChange={handleFileInput} />
               {thumbnailError && <div className='thumbnail-error error'>{thumbnailError}</div>}
            </label>
            <button className='btn'>Sign Me Up!</button>
         </div>
      </form>
   );
}
