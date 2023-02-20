import { useState } from 'react';
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
   const [error, setError] = useState(null);
   const [isPending, setIsPending] = useState(false);

   const signup = async (email, password, dname) => {
      setError(null);
      setIsPending(true);

      try {
         const response = await projectAuth.createUserWithEmailAndPassword(email, password);

         if (!response) {
            throw new Error('Could not sing up the user');
         }

         await response.user.updateProfile({ displayName: dname });

         setIsPending(false);
      } catch (error) {
         setError(error.message);
         setIsPending(false);
      }
   };

   return { error, isPending, signup };
};
