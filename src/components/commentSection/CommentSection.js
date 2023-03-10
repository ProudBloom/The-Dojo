import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDatabase } from '../../hooks/useDatabase';
import Avatar from '../avatar/Avatar';

//styles
import './CommentSection.css';

export default function CommentSection({ projectData }) {
   const [comment, setComment] = useState('');
   const { state, updateDocument } = useDatabase('projects');
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

      await updateDocument(projectData.id, {
         comments: [...projectData.comments, projectComment],
      }); //Update the comments property in project object

      if (!state.error) {
         setComment('');
      }
   };

   return (
      <div className='project-comments'>
         <h4>Project Comments</h4>
         <ul>
            {projectData.comments.length > 0 &&
               projectData.comments.map((comment) => (
                  <li key={comment.id}>
                     <div className='comment-author'>
                        <Avatar imageSource={comment.photoURL} />
                        <p>{comment.displayName}</p>
                     </div>
                     <div className='comment-date'>TODO: DATE</div>
                     <div className='comments-content'>
                        <p>{comment.content}</p>
                     </div>
                  </li>
               ))}
         </ul>
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
