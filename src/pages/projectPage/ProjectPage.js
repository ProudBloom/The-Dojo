import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProjectSummary from '../../components/projectSummary/ProjectSummary';
import { useDocument } from '../../hooks/useDocument';

//styles
import './ProjectPage.css';

export default function ProjectPage() {
   const { projectID } = useParams();
   const { document: project, error } = useDocument('projects', projectID);

   if (error) {
      return (
         <div className='flex-center flex-column'>
            <h3>{error}</h3>
            <Link to='/' className='btn mt-1'>
               Back to Dashboard
            </Link>
         </div>
      );
   }

   if (!project) {
      return <div className='loading'>Loading...</div>;
   }

   return (
      <div className='project-details'>
         <ProjectSummary projectData={project} />
      </div>
   );
}
