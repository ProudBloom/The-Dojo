import { useEffect, useState } from 'react';
import { firestoreDatabase } from '../firebase/config';

export const useCollection = (collection) => {
   const [documents, setDocuments] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      const collectionRef = firestoreDatabase.collection(collection);

      const unsub = collectionRef.onSnapshot(
         (currentSnapshot) => {
            let documentList = [];

            currentSnapshot.docs.forEach((document) => {
               documentList.push({ ...document.data(), id: document.id });
            });

            setDocuments(documentList);
            setError(null);
         },
         (error) => {
            console.log(error.message);
            setError(error.message);
         }
      );

      return () => unsub();
   }, [collection]);

   return { documents, error };
};
