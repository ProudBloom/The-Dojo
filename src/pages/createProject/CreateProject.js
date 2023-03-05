import { useEffect, useState } from 'react';
import { useDatabase } from '../../hooks/useDatabase';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import Select from 'react-select';

//styles
import './CreateProject.css';
import { timestamp } from '../../firebase/config';

const categories = [
   { value: 'development', label: 'Development' },
   { value: 'design', label: 'Design' },
   { value: 'sales', label: 'Sales' },
   { value: 'marketing', label: 'Marketing' },
];

export default function CreateProject() {
   const [formError, setFormError] = useState(null);
   const [name, setName] = useState('');
   const [details, setDetails] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [category, setCategory] = useState('');
   const [userList, setUserList] = useState([]);
   const [assignedUsers, setAssignedUsers] = useState([]);

   const { addDocument, state } = useDatabase('projects');
   const { documents } = useCollection('users');
   const { user: currentUser } = useAuthContext();

   useEffect(() => {
      if (documents) {
         const users = documents.map((usr) => {
            return { value: usr, label: usr.displayName };
         });
         setUserList(users);
      }
   }, [documents, state.isPending]);

   const submitHandler = (e) => {
      setFormError(null);
      e.preventDefault();

      if (!category) {
         setFormError('Please make sure to select the category');
         return;
      } else if (assignedUsers.length < 1) {
         setFormError('Please make sure to select users assigned to a project');
         return;
      }

      const createdBy = {
         dispalyName: currentUser.displayName,
         photoURL: currentUser.photoURL,
         id: currentUser.uid,
      };

      const assignedUsersList = assignedUsers.map((usr) => {
         return {
            displayName: usr.value.displayName,
            photoURL: usr.value.photoURL,
            id: usr.value.id,
         };
      });

      const project = {
         name,
         details,
         dueDate: timestamp.fromDate(new Date(dueDate)),
         category: category.value,
         comments: [],
         createdBy,
         assignedUsers: assignedUsersList,
      };

      addDocument(project);

      setName('');
      setCategory('');
      setDetails('');
      setDueDate('');
      setAssignedUsers([]);
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
               <Select options={categories} onChange={(option) => setCategory(option)} />
            </label>
            <label>
               <span>Assigned Users: </span>
               <Select options={userList} onChange={(option) => setAssignedUsers(option)} isMulti />
            </label>
            {formError && <p className='error'>{formError}</p>}
            {state.error && <p className='error'>{state.error}</p>}
            {state.isPending ? <button className='btn'>Loading...</button> : <button className='btn'>Add a project</button>}
         </form>
      </div>
   );
}
