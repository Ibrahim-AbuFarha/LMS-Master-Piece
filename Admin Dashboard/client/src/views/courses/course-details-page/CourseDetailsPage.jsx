import { Typography } from "antd";
import CoureSections from "./CoureSections";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { LMS_API } from "../../../../api/api";
const CourseDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [course, setCourse] = useState({});
  //get course by id from params
  const getCourse = async () => {
    try {
      const { data } = await LMS_API.get(`/courses/${id}`);
      console.log(data);
      setCourse(data.course);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div>
      <Typography.Title>{course.name} Course</Typography.Title>
      <Typography.Paragraph style={{ maxWidth: "500px" }}>
        {course.desc}
      </Typography.Paragraph>
      <Typography.Title level={4}>Course Content</Typography.Title>

      <CoureSections />
    </div>
  );
};

export default CourseDetails;
