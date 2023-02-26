import { useEffect, useState } from 'react';
import { projectAuth, projectStorage, firestoreDatabase } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
   const [error, setError] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [isCancelled, setIsCancelled] = useState(false);
   const { dispatch } = useAuthContext();

   const signup = async (email, password, dname, thumbnail) => {
      if (!isCancelled) {
         setError(null);
         setIsPending(true);
      }

      try {
         const response = await projectAuth.createUserWithEmailAndPassword(email, password);

         if (!response) {
            throw new Error('Could not sing up the user');
         }

         //User Profile Image
         const thumbnailPath = `thumbnails/${response.user.uid}/${thumbnail.name}`;
         const image = await projectStorage.ref(thumbnailPath).put(thumbnail);
         const imageUrl = await image.ref.getDownloadURL();

         await response.user.updateProfile({ displayName: dname, photoURL: imageUrl });

         //Creatre user document in firestore collection (will create doc automatically)
         await firestoreDatabase.collection('users').doc(response.user.uid).set({
            online: true,
            displayName: dname,
            photoURL: imageUrl,
         });

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
