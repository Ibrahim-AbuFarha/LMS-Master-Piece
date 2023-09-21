import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LMS_API } from '../../api/api';
const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isFirstMount, setIsFirstMount] = useState(true);

  console.log(4);
  const logIn = (user) => {
    console.log(user);
    setUser(user);
  };

  const logout = () => {
    LMS_API.get('/teachers/logout')
      .then(() => {
        console.log('logout');
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    LMS_API.get('/teachers/currentTeacher')
      .then(({ data }) => {
        setIsFirstMount(false);
        setUser(data.teacher);
        console.log(data.teacher);
      })
      .catch((err) => {
        console.log(err);
        setIsFirstMount(false);
      });
  }, []);

  const value = { logIn, logout, user, isFirstMount };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// user : {id : , role , username }

//
