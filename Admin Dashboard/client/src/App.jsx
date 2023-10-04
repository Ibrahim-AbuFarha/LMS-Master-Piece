import MainLayout from "./views/main-layout/MainLayout";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import AllStudentsPage from "./views/student/all-students-page/AllStudentPage";
import AddStudentPage from "./views/student/add-student-page/AddStudentPage";
import AllTeacherPage from "./views/teacher/all-teacher-page/AllTeacherPage";
import AddTeacherPage from "./views/teacher/add-teacher-page/AddTeacherPage";
import MyCoursesPage from "./views/courses/my-courses-page/MyCoursesPage";
import CourseDetails from "./views/courses/course-details-page/CourseDetailsPage";
import MyClassesPage from "./views/classes/my-classes-page/MyClassesPage";
import ClassPage from "./views/classes/class-details-page/ClassPage";
import Login from "./views/login/Login";
import SignUp from "./views/signup/SignUp";
import ResetPassword from "./views/resetPassword/ResetPassword";
import NewPasswordForm from "./views/resetPassword/NewPassword";
import Analysis from "./views/home/Analysis";
import Profile from "./views/profile/Profile";
import RequestApproval from "./views/requestsApproval/RequestsAprroval";
import PrivateRoute from "./components/guard/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/resetPassword" element={<ResetPassword />}></Route>
      <Route path="/newPassword" element={<NewPasswordForm />}></Route>

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Analysis />}></Route>
        <Route
          path="/RequestsApproval"
          element={
            <PrivateRoute role={"admin"}>
              <RequestApproval></RequestApproval>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/AllStudents" element={<AllStudentsPage />}></Route>
        <Route path="/AddStudent" element={<AddStudentPage />}></Route>

        <Route path="/AllTeacher" element={<AllTeacherPage />}></Route>
        <Route
          path="/AddTeacher"
          element={
            <PrivateRoute role={"admin"}>
              <AddTeacherPage></AddTeacherPage>
            </PrivateRoute>
          }
        ></Route>

        <Route path="/MyCourses" element={<MyCoursesPage />}></Route>
        <Route path="/CourseDetails/:id" element={<CourseDetails />}></Route>

        <Route path="/MyClasses" element={<MyClassesPage />}></Route>
        <Route path="/ClassDetails/:id" element={<ClassPage />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
