import React from 'react';
import Avatar from '../avatar/Avatar';

//styles
import './ProjectSummary.css';

export default function ProjectSummary({ projectData }) {
   return (
      <div className='project-summary'>
         <h2 className='page-title'>{projectData.name}</h2>
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
   );
}
