import React from 'react';

//styles
import './ProjectFilter.css';

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

export default function ProjectFilter({ filterData }) {
   return (
      <div className='project-filter'>
         <nav>
            {filterList.map((filterName) => (
               <button
                  className={filterName === filterData.filter ? 'active' : ''}
                  key={filterName}
                  onClick={() => filterData.changeFilter(filterName)}>
                  {filterName}
               </button>
            ))}
         </nav>
      </div>
   );
}
