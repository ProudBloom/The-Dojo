import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

//styles
import './Login.css';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { login, error, isPending } = useLogin();

   const handleSubmit = (e) => {
      e.preventDefault();
      login(email, password);
   };

   return (
      <form className='auth-form' onSubmit={handleSubmit}>
         <h2>Log In</h2>
         <div className='auth-content'>
            <label>
               <span>Email:</span>
               <input type='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
            <label>
               <span>Password:</span>
               <input type='password' required onChange={(e) => setPassword(e.target.value)} value={password} />
            </label>
            {!isPending && <button className='btn'>Log Me In!</button>}
            {isPending && (
               <button className='btn' disabled>
                  Loading...
               </button>
            )}
            {error && <div className='error'>{error}</div>}
         </div>
      </form>
   );
}
