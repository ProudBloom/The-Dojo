import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN':
         console.log(state);
         return { ...state, user: action.payload };
      case 'LOGOUT':
         return { ...state, user: null };
      case 'AUTH_READY':
         return { user: action.payload };
      default:
         return state;
   }
};

export const AuthContextComponent = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, { user: null });

   return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
