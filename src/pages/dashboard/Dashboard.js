import { useState } from 'react';
import ProjectFilter from '../../components/projectFilter/ProjectFilter';
import ProjectList from '../../components/projectList/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';

//styles
import './Dashboard.css';

export default function Dashboard() {
   const [filter, setFilter] = useState('all');

   const { documents, error } = useCollection('projects');
   const { user } = useAuthContext();

   const filteredProjects = documents
      ? documents.filter((doc) => {
           switch (filter) {
              case 'all':
                 return true;
              case 'mine':
                 const currentUser = user.uid;
                 return doc.assignedUsers.find((assignedUser) => assignedUser.id === currentUser);
              case 'development':
                 return doc.category === filter;
              case 'design':
                 return doc.category === filter;
              case 'marketing':
                 return doc.category === filter;
              case 'sales':
                 return doc.category === filter;
              default:
                 return true;
           }
        })
      : null;

   const changeFilter = (newFilter) => {
      setFilter(newFilter);
   };

   return (
      <div>
         <h2 className='page-title'>Dashboard</h2>
         {error && <p className='error'>{error}</p>}
         {documents && (
            <ProjectFilter
               filterData={{
                  filter,
                  changeFilter,
               }}
            />
         )}
         {filteredProjects && <ProjectList projects={filteredProjects} />}
      </div>
   );
}
