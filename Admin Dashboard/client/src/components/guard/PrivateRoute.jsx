import React from "react";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  //context consumer
  const { user, isFirstMount } = useContext(AuthContext);

  if (!user && isFirstMount)
    return <div className=" bg-black h-screen w-full"></div>;

  //no user and no mount navigate into login
  if (!user && !isFirstMount) {
    console.log("dd");

    return <Navigate to={"/login"} />;
  }
//if role is not an admin don't allow to join this page
  if (role && user.role !== role)
    return <div> u don't have access to this page</div>;
  return <div>{children}</div>;
};

export default PrivateRoute;
