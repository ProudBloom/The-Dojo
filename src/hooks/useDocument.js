import { useEffect, useState } from 'react';
import { firestoreDatabase } from '../firebase/config';

export const useDocument = (collection, docID) => {
   const [document, setDocument] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      const documentRef = firestoreDatabase.collection(collection).doc(docID);

      const unsub = documentRef.onSnapshot(
         (snapshot) => {
            if (snapshot.data()) {
               setDocument({ ...snapshot.data(), id: snapshot.id });
               setError(null);
            } else {
               setError('No such document exists in the database');
            }
         },
         (error) => {
            console.log(error.message);
            setError('Failed while fetching the document data');
         }
      );

      return () => unsub();
   }, [collection, docID]);

   return { document, error };
};
