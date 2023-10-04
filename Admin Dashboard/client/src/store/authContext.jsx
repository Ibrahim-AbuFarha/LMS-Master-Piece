import { createContext, useEffect, useState } from "react";

import { LMS_API } from "../../api/api";
const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isFirstMount, setIsFirstMount] = useState(true);

  console.log(23);
  const logIn = (user) => {
    console.log(user);
    setUser(user);
  };

  const logout = () => {
    LMS_API.get("/teachers/logout")
      .then(() => {
        console.log("logout");
        setUser(null);
      })
      .catch((err) => console.log(err));
  };
  // if the page refresh when the user signed in we get the current user by this
  useEffect(() => {
    LMS_API.get("/teachers/currentTeacher")
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
