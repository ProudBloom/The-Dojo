import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDatabase } from '../../hooks/useDatabase';
import { useAuthContext } from '../../hooks/useAuthContext';
import Avatar from '../avatar/Avatar';

//styles
import './ProjectSummary.css';

export default function ProjectSummary({ projectData }) {
   const { deleteDocument } = useDatabase('projects');
   const history = useHistory();
   const { user: signedInUser } = useAuthContext();

   const handleDeleteDoc = (e) => {
      deleteDocument(projectData.id);
      history.push('/');
   };

   return (
      <div>
         <div className='project-summary'>
            <h2 className='page-title'>{projectData.name}</h2>
            <p>By {projectData.createdBy.displayName}</p>
            <p className='due-date'>Project due to {projectData.dueDate.toDate().toDateString()}</p>
            <p className='projec-details'>{projectData.details}</p>
            <h4>Project Asignees : </h4>
            <div className='assigned-users'>
               {projectData.assignedUsers.map((user) => (
                  <div key={user.id}>
                     <Avatar imageSource={user.photoURL} />
                  </div>
               ))}
            </div>
         </div>

         {signedInUser.uid === projectData.createdBy.id && (
            <button className='btn' onClick={handleDeleteDoc}>
               Mark as complete
            </button>
         )}
      </div>
   );
}
