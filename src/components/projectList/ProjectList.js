import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';

//Styles
import './ProjectList.css';

export default function ProjectList({ projects }) {
   return (
      <div className='project-list'>
         {projects.length > 0 ? (
            projects.map((project) => (
               <Link to={`/projects/${project.id}`} key={project.id}>
                  <h4>
                     {project.name} <i>({project.category})</i>
                  </h4>
                  {/*Firebase timestamp can't be a virtual dom child*/}
                  <p>Due to {project.dueDate.toDate().toDateString()}</p>
                  <div className='assigned-to'>
                     <ul>
                        {project.assignedUsers.map((user) => (
                           <li key={user.photoURL}>
                              <Avatar imageSource={user.photoURL} />
                           </li>
                        ))}
                     </ul>
                  </div>
               </Link>
            ))
         ) : (
            <p> No projects to display </p>
         )}
      </div>
   );
}
