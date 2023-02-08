import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN':
         return { user: action.payload, ...state };
      case 'LOGOUT':
         return { user: null, ...state };
      case 'AUTH_READY':
         return { user: action.payload, authReady: true };
      default:
         return state;
   }
};

export const AuthContextComponent = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, { user, authReady });

   return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
