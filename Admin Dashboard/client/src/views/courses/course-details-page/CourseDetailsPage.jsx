import { Typography } from 'antd';
import CoureSections from './CoureSections';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const course = {
  id: 1,
  title: 'Math',
  desc: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dolorem tempore nesciunt repudiandae id iste obcaecati molestiae fuga esse, laudantium unde dicta illum qui repellat quis suscipit sint enim voluptatibus? ',
  numLessons: 0,
};
const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const getCourse = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/v1/courses/${id}`
      );
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
      <Typography.Paragraph style={{ maxWidth: '500px' }}>
        {course.desc}
      </Typography.Paragraph>
      <Typography.Title level={4}>Course Content</Typography.Title>

      <CoureSections />
    </div>
  );
};

export default CourseDetails;
