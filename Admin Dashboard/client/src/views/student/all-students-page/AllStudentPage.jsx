import { LMS_API } from "../../../../api/api";
import StudentTable from "./StudentTable";
import { Input, Pagination, Typography } from "antd";
import { useEffect, useState } from "react";

const AllStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);

  const getStudents = async (page) => {
    try {
      const { data } = await LMS_API.get(`students?page=${page}&limit=2`);
      console.log(data);
      setStudents(data.results.students);
      setCount(data.results.count);
      console.log(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getStudents(1);
  }, []);

  const handelEdit = async (values, id) => {
    console.log(values, id);
    const { data } = await LMS_API.patch(`students/${id}`, values);
    console.log(data);
    const updatedStudents = students.map((item) =>
      item._id !== id ? item : data.student
    );
    console.log(updatedStudents);
    setStudents(updatedStudents);
  };

  const handelDelete = async (record) => {
    await LMS_API.delete(`students/${record.key}`);
    const updatedStudents = students.filter((item) => item._id !== record.key);
    setStudents(updatedStudents);
  };

  const handleSearch = async (value) => {
    const { data } = await LMS_API.get(
      `/students/searchByName?searchString=${value}`
    );
    console.log(data);
    setStudents(data.results.students);
  };

  const handlePagination = (value) => {
    getStudents(value);
  };
  console.log(students);

  return (
    <div>
      <Typography.Title level={1} style={{ margin: "0 0 20px" }}>
        All Students
      </Typography.Title>
      <Input.Search
        style={{ width: 247, marginBottom: 20 }}
        placeholder="search for students"
        onSearch={handleSearch}
      ></Input.Search>
      <StudentTable
        students={students}
        onDelete={handelDelete}
        onEdit={handelEdit}
      />
      <div className="end">
        <Pagination
          total={count}
          pageSize={10}
          onChange={handlePagination}
        ></Pagination>
      </div>
    </div>
  );
};

export default AllStudentsPage;
