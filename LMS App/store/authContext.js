import { createContext, useState } from "react";

import React from "react";
const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (user) => {
    console.log("logged in ");
    setUser(user);
  };
  const signOut = () => {
    console.log("logged out ");
    setUser(null);
  };
  const value = { user, signIn, signOut, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// user : {id : , role , username }

//
