import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';

//styles
import './CommentSection.css';

export default function CommentSection() {
   const [comment, setComment] = useState('');
   const { user } = useAuthContext();

   const submitHandler = async (e) => {
      e.preventDefault();

      const projectComment = {
         id: Math.random(),
         displayName: user.displayName,
         photoURL: user.photoURL,
         content: comment,

         createdAt: timestamp.fromDate(new Date()),
      };

      console.log(projectComment);
   };

   return (
      <div className='project-comments'>
         <h4>Project Comments</h4>
         <form className='add-comment' onSubmit={submitHandler}>
            <label>
               <span>Add a new comment</span>
               <textarea required onChange={(e) => setComment(e.target.value)} value={comment} />
            </label>
            <button className='btn'>Add comment</button>
         </form>
      </div>
   );
}
