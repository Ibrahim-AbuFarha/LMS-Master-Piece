import { createContext, useContext, useEffect, useState } from "react";
import { LMS_API } from "../api/api";
import UserContext from "./authContext";
import React from "react";
const ClassRoomContext = createContext();
export default ClassRoomContext;

export function ClassRoomProvider({ children }) {
  const { user } = useContext(UserContext);
  const [classRooms, SetClassRooms] = useState({});

  const getClassRooms = async () => {
    try {
      const { data } = await LMS_API.get(`/students/${user._id}`);
      console.log("data=", data);
      SetClassRooms(data.data.student.classRooms);
    } catch (error) {
      console.log(error);
    }
  };

  const value = { getClassRooms, classRooms };
  return (
    <ClassRoomContext.Provider value={value}>
      {children}
    </ClassRoomContext.Provider>
  );
}

// user : {id : , role , username }

//
