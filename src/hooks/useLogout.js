import { useEffect, useState } from 'react';
import { firestoreDatabase, projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
   const [error, setError] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [isCancelled, setIsCancelled] = useState(false);
   const { user, dispatch } = useAuthContext();

   const logout = async () => {
      if (!isCancelled) {
         setError(null);
         setIsPending(true);
      }

      try {
         //Update online status in document
         await firestoreDatabase.collection('users').doc(user.uid).update({ online: false });

         await projectAuth.signOut();

         dispatch({ type: 'LOGOUT' });

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
      return () => setIsCancelled(true);
   }, []);

   return { logout, error, isPending };
};
