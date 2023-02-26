import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('Could not load context, Check if component is inside a provider');
   }

   return context;
};
