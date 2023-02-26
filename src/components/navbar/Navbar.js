import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

//styles
import './Navbar.css';

//assets
import TempleImg from '../../assets/temple.svg';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Navbar() {
   const { logout, isPending } = useLogout();
   const { user } = useAuthContext();

   return (
      <div className='navbar'>
         <ul>
            <li className='logo'>
               <Link to='/'>
                  <img src={TempleImg} alt='logo' />
                  <span>The Dojo</span>
               </Link>
            </li>
            {user ? (
               <li>
                  <button className='btn' onClick={() => logout()}>
                     {isPending ? 'Loading...' : 'Logout'}
                  </button>
               </li>
            ) : (
               <>
                  <li>
                     <Link to='/login'>Login</Link>
                  </li>
                  <li>
                     <Link to='/signup'>Signup</Link>
                  </li>
               </>
            )}
         </ul>
      </div>
   );
}
