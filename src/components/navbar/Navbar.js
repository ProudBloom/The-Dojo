import React from 'react';
import { Link } from 'react-router-dom';

//styles
import './Navbar.css';

//assets
import TempleImg from '../../assets/temple.svg';

export default function Navbar() {
   return (
      <div className='navbar'>
         <ul>
            <li className='logo'>
               <Link to='/'>
                  <img src={TempleImg} alt='logo' />
                  <span>The Dojo</span>
               </Link>
            </li>
            <li>
               <Link to='/login'>Login</Link>
            </li>
            <li>
               <Link to='/signup'>Signup</Link>
            </li>
            <li>
               <button className='btn'>Logout</button>
            </li>
         </ul>
      </div>
   );
}
