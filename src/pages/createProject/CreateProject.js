import { useEffect, useState } from 'react';
import { useDatabase } from '../../hooks/useDatabase';
import Select from 'react-select';

//styles
import './CreateProject.css';

const categories = [
   { value: 'development', label: 'Development' },
   { value: 'design', label: 'Design' },
   { value: 'sales', label: 'Sales' },
   { value: 'marketing', label: 'Marketing' },
];

export default function CreateProject() {
   const { addDocument, state } = useDatabase('projects');

   const [name, setName] = useState('');
   const [details, setDetails] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [category, setCategory] = useState('');
   const [assignedUsers, setAssignedUsers] = useState([]);

   const submitHandler = (e) => {
      addDocument({ name, details, dueDate, category, assignedUsers });
   };

   return (
      <div className='create-form'>
         <h2 className='page-title'>Create a new project</h2>
         <form onSubmit={submitHandler}>
            <label>
               <span>Project Name: </span>
               <input type='text' required onChange={(e) => setName(e.target.value)} value={name} />
            </label>
            <label>
               <span>Project Details: </span>
               <textarea type='text' required onChange={(e) => setDetails(e.target.value)} value={details} />
            </label>
            <label>
               <span>Due Date: </span>
               <input type='date' required onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
            </label>
            <label>
               <span>Category: </span>
               <Select options={categories} onChange={(option) => setCategory(option.value)} />
            </label>
            <label>
               <span>Assigned Users: </span>
            </label>
            {state.error && <div className='erorr'>{state.error}</div>}
            {state.isPending ? <button className='btn'>Loading...</button> : <button className='btn'>Add a project</button>}
         </form>
      </div>
   );
}
