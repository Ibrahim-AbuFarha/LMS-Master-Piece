import { createContext, useEffect, useState } from "react";
import axios from "axios";
const CourseContext = createContext();
export default CourseContext;

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    getCourses();
  }, []);
 

 

  const value = {
    courses,
    getCourses,
    AddCourse,
    DeleteCourse,
  };
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}
