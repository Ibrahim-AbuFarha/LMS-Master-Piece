import { Card, Image, Typography, Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { Link } from 'react-router-dom';
import DeleteModal from '../../../components/common/DeleteModal';
import AddCourseModal from './AddCourseModal';
import { useContext, useEffect, useState } from 'react';

import { LMS_API } from '../../../../api/api';
import AuthContext from '../../../store/authContext';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const getCourses = async () => {
    try {
      const { data } = await LMS_API.get(`/courses?teacherId=${user._id}`);
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteCourse = async (id) => {
    await LMS_API.delete(`/courses/${id}`);
    const updatedCourses = courses.filter((item) => item._id !== id);
    setCourses(updatedCourses);
  };

  const AddCourse = async (value) => {
    const { data } = await LMS_API.post('/courses', value);
    console.log(data);
    setCourses([...courses, data.course]);
  };

  useEffect(() => {
    getCourses();
  }, []);

  console.log(courses);

  return (
    <div>
      <AddCourseModal onAdd={AddCourse} />
      <div className="grid-200">
        {courses.map((course) => (
          <Card bordered={false} key={course._id}>
            <Link to={`/CourseDetails/${course._id}`}>
              <Image src={course.img}></Image>
              <Typography.Title>{course.name}</Typography.Title>
              <Typography.Paragraph>{course.desc}</Typography.Paragraph>
              <Typography.Paragraph>
                NumOfSections : {course.sections.length}
              </Typography.Paragraph>
              <Typography.Paragraph>
                CourseId : {course._id}
              </Typography.Paragraph>
            </Link>
            <div className="flex-end">
              <DeleteModal
                title={'Delete Course'}
                text={'Are  you sure you want to delete this course'}
                onDelete={() => DeleteCourse(course._id)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
