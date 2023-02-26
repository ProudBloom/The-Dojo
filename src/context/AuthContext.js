import { createContext, useEffect, useReducer } from 'react';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext();

const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN':
         console.log(state);
         return { ...state, user: action.payload };
      case 'LOGOUT':
         return { ...state, user: null };
      case 'AUTH_STATE_CHANGED':
         return { ...state, user: action.payload, isAuthReady: true };
      default:
         return state;
   }
};

export const AuthContextComponent = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, { user: null, isAuthReady: false });

   useEffect(() => {
      const unsub = projectAuth.onAuthStateChanged((user) => {
         dispatch({ type: 'AUTH_STATE_CHANGED', payload: user });
         unsub();
      });
   }, []);

   return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
