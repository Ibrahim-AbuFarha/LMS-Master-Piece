import { Typography, Button } from "antd";

import CourseList from "./CourseList";

const MyCoursesPage = () => {
  return (
    <div>
      <Typography.Title>My Courses</Typography.Title>

      <CourseList />
    </div>
  );
};

export default MyCoursesPage;
