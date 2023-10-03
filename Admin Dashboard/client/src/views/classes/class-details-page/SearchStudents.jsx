import axios from "axios";
import React, { useState } from "react";
import { Card, Input } from "antd";
import { LMS_API } from "../../../../api/api";
const SearchStudents = ({ onSelect, selectedStudent }) => {
  const [students, setStudents] = useState([]);
  console.log(students);
  const handleChangeName = async (e) => {
    console.log(e.target.value);
    const { data } = await LMS_API.get(
      `/students/searchByName?searchString=${e.target.value}`
    );
    console.log(data);
    setStudents(data.results.students);
  };

  return (
    <div>
      <Input.Search
        style={{ width: 247, marginBottom: 20 }}
        placeholder="search for students"
        onChange={handleChangeName}
      ></Input.Search>
      <Card>
        <ul
          className="flex-col"
          style={{ height: "200px", overflowY: "scroll", padding: 5 }}
        >
          {students.map((student) => (
            <li
              className={`flex rounded-md p-2 cursor-pointer p-2 hover ${
                student._id === selectedStudent?._id && "active"
              }`}
              key={student._id}
              onClick={() => onSelect(student)}
            >
              <span>{student.fullName}</span>
              <span>grade: {student.grade}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default SearchStudents;
