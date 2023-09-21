import { useContext, useEffect, useState } from 'react';
import SchoolCalendar from './SchoolCalender';

import axios from 'axios';
import AnalysisRow from './AnalysisRow';

import ClassStudentChart from './ClassStudentChart';
import TeacherAdditionChart from './TeacherAdditionChart';
import { LMS_API } from '../../../api/api';
import { Row, Col, Card } from 'antd';
import LastStudentsAdded from './LastStudentsAdded';

import AuthContext from '../../store/authContext';

const classData = [
  { className: 'Math 101', studentCount: 30 },
  { className: 'History 202', studentCount: 25 },
  { className: 'History 202', studentCount: 25 },
];

function Analysis() {
  const [analysis, SetAnalysis] = useState([]);
  const [lastStudents, setLastStudents] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const [teacherClasses, setTeacherClasses] = useState([]);

  const getNumberResources = async () =>
    await axios.get('http://127.0.0.1:8000/api/v1/analysis');

  const getTeacherByMonth = async () =>
    LMS_API.get('/analysis/getTeacherDataByMonth');

  const getLastAddedStudent = async () => LMS_API.get(`/students`);

  const getAllClasses = async () =>
    LMS_API.get(`classRooms?teacherId=${user._id}`);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getNumberResources(),
      getTeacherByMonth(),
      getLastAddedStudent(),
      getAllClasses(),
    ])
      .then((res) => {
        const { data: resoursesRes } = res[0];

        const { data: teacherRes } = res[1];
        const { data: lastStudentRes } = res[2];
        const { data: allClasses } = res[3];

        setTeacherData(teacherRes.teachers);
        setLastStudents(lastStudentRes.students.students);
        SetAnalysis(resoursesRes.resources);
        setTeacherClasses(allClasses.classRooms);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div> loading</div>;

  console.log(teacherData);
  return (
    <div>
      <AnalysisRow analysis={analysis} />

      <Row gutter={20} justify={'space-between'}>
        <Col span={14}>
          <Card>
            <TeacherAdditionChart teacherData={teacherData} />
          </Card>
        </Col>
        <Col span={10}>
          <SchoolCalendar></SchoolCalendar>
        </Col>
        <Col style={{ marginTop: 25 }} span={18}>
          <Card>
            <ClassStudentChart classData={teacherClasses} />
          </Card>
        </Col>
        <Col style={{ marginTop: 25 }} span={6}>
          <LastStudentsAdded students={lastStudents.slice(0, 5)} />
        </Col>
      </Row>
    </div>
  );
}

export default Analysis;

//   <div>
//
//   </div>
//   <div>
//     <SchoolCalendar />
//   </div>
//   <div>{<TeacherChart></TeacherChart>}</div>
//   <div>1</div>
//   {/* <StudentChart></StudentChart> */}
