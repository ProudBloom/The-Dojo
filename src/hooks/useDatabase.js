import { useReducer, useEffect, useState } from 'react';
import { firestoreDatabase, timestamp } from '../firebase/config';

const initialState = {
   isPending: false,
   error: null,
   success: null,
   addedDocument: null,
};

const databaseReducer = (state, action) => {
   switch (action.type) {
      case 'IS_PENDING':
         return { isPending: true, error: null, success: false, addedDocument: null };
      case 'DOC_ADDED':
         return { isPending: false, erorr: null, success: true, addedDocument: action.payload };
      case 'DOC_UPDATED':
         return { isPending: false, erorr: null, success: true, addedDocument: action.payload };
      case 'DOC_DELETED':
         return { isPending: false, erorr: null, success: true, addedDocument: action.payload };
      case 'ERROR':
         return { isPending: false, erorr: null, success: true, addedDocument: null };
      default:
         return state;
   }
};

export const useDatabase = (collection) => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [state, dispatch] = useReducer(databaseReducer, initialState);

   const collectionRef = firestoreDatabase.collection(collection);

   const dispatchIfNotCancelled = (action) => {
      if (!isCancelled) {
         dispatch(action);
      }
   };

   const addDocument = async (document) => {
      dispatchIfNotCancelled({ type: 'IS_PENDING' });
      try {
         const doc = await collectionRef.add({ ...document, createdAt: timestamp.fromDate(new Date()) });
         dispatchIfNotCancelled({ type: 'DOC_ADDED', payload: doc });
      } catch (error) {
         console.log(error.message);
         dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
   };

   const updateDocument = async (documentID, updateData) => {
      dispatchIfNotCancelled({ type: 'IS_PENDING' });
      try {
         const updatedDoc = await collectionRef.doc(documentID).update(updateData);
         dispatchIfNotCancelled({ type: 'DOC_UPDATED', payload: updatedDoc });
      } catch (error) {
         console.log(error.message);
         dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
   };

   const deleteDocument = async (id) => {
      dispatch({ type: 'IS_PENDING' });

      try {
         await collectionRef.doc(id).delete();
         dispatch({ type: 'DOC_DELETED' });
      } catch (error) {
         console.log(error.message);
         dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
   };

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { addDocument, deleteDocument, updateDocument, state };
};
