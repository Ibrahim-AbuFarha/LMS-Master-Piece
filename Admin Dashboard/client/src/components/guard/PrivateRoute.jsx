import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../store/authContext';

import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const { user, isFirstMount } = useContext(AuthContext);

  if (!user && isFirstMount)
    return <div className=" bg-black h-screen w-full"></div>;

  if (!user && !isFirstMount) {
    console.log('dd');

    return <Navigate to={'/login'} />;
  }

  if (role && user.role !== role)
    return <div> u dont have acces to this page</div>;
  return <div>{children}</div>;
};

export default PrivateRoute;
