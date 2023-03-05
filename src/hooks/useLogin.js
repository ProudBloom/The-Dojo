import { useEffect, useState } from 'react';
import { firestoreDatabase, projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
   const [error, setError] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [isCancelled, setIsCancelled] = useState(false);

   const { dispatch } = useAuthContext();

   const login = async (email, password) => {
      if (!isCancelled) {
         setError(null);
         setIsPending(true);
      }

      try {
         const response = await projectAuth.signInWithEmailAndPassword(email, password);

         if (!response) {
            throw new Error('Could not log in the user');
         }

         dispatch({ type: 'LOGIN', payload: response.user });

         //Update online status in document
         await firestoreDatabase.collection('users').doc(response.user.uid).update({ online: true });

         if (!isCancelled) setIsPending(false);
      } catch (error) {
         if (!isCancelled) {
            setError(error.message);
            setIsPending(false);
         }
      }
   };

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { error, isPending, login };
};
