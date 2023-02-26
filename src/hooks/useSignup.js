import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
   const [error, setError] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [isCancelled, setIsCancelled] = useState(false);
   const { dispatch } = useAuthContext();

   const signup = async (email, password, dname) => {
      if (!isCancelled) {
         setError(null);
         setIsPending(true);
      }

      try {
         const response = await projectAuth.createUserWithEmailAndPassword(email, password);

         if (!response) {
            throw new Error('Could not sing up the user');
         }

         await response.user.updateProfile({ displayName: dname });

         dispatch({ type: 'LOGIN', payload: response.user });

         if (!isCancelled) {
            setIsPending(false);
         }
      } catch (error) {
         if (!isCancelled) {
            setError(error.message);
            setIsPending(false);
         }
      }
   };

   useEffect(() => {
      return () => {
         setIsCancelled(true);
      };
   }, []);

   return { error, isPending, signup };
};
