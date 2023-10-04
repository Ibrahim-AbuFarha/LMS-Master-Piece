import { Typography } from "antd";

import ClassStudentsTable from "./ClassStudentsTable";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddStudentToClassModal from "./AddStudentToClassModal";

import { LMS_API } from "../../../../api/api";

const ClassPage = () => {
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState("");
  const { id } = useParams();

  // to get all student from specific classroom
  const getAllStudents = async () => {
    const { data } = await LMS_API.get(`/classRooms/${id}`);

    console.log(subject);
    setSubject(data.classRoom.subject);
    setStudents(data.classRoom.students);
  };

  useEffect(() => {
    getAllStudents();
  }, []);
  //edit student mark
  const handleEditStudentMark = async (values, studentId) => {
    const { first, mid, final } = values;

    await LMS_API.patch(
      `/classRooms/${id}/editStudentFromClass/${studentId}`,
      values
    );

    const updatedStudents = students.map((item) => {
      return item._id._id === studentId
        ? {
            ...item,
            marks: {
              ...item.marks,
              first: +first,
              mid: +mid,
              final: +final,
            },
          }
        : item;
    });
    setStudents(updatedStudents);
  };
  //delete the student from the class
  const handleDeleteStudent = async (record) => {
    await LMS_API.delete(
      `/classRooms/${id}/editStudentFromClass/${record.key}`
    );
    const updatedStudent = students.filter((item) => {
      return item._id._id !== record.key;
    });

    setStudents(updatedStudent);
  };
  //add the student to the class
  const handleAddStudent = async (student) => {
    const { data } = await LMS_API.post(
      `/classRooms/${id}/addStudentToClass/${student._id}`,
      student
    );
    setStudents([
      ...students,
      { marks: { first: 0, mid: 0, final: 0 }, _id: data.addedStudent },
    ]);
  };

  return (
    <div>
      <Typography.Title>{subject} Class</Typography.Title>
      <AddStudentToClassModal onAdd={handleAddStudent}></AddStudentToClassModal>
      <ClassStudentsTable
        onDelete={handleDeleteStudent}
        onEdit={handleEditStudentMark}
        students={students}
      />
    </div>
  );
};

export default ClassPage;
