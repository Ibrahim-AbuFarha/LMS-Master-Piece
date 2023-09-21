import { LMS_API } from '../../../../api/api';
import StudentTable from './StudentTable';
import { Input, Pagination, Typography } from 'antd';
import { useEffect, useState } from 'react';

const AllStudentsPage = () => {
  const [students, setStudents] = useState(null);

  const getStudents = async (page) => {
    try {
      const { data } = await LMS_API.get(`students?page=${page}&limit=2`);

      setStudents(data.students);
      console.log(data.students);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getStudents(1);
  }, []);

  const handelEdit = async (values, id) => {
    const { data } = await LMS_API.patch(`students/${id}`, values);

    const updatedStudents = students.map((item) =>
      item._id !== id ? item : data.student
    );

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
    setStudents(data.students);
  };

  const handlePagination = (value) => {
    getStudents(value);
  };
  console.log(students);

  if (!students) return <div>loading...</div>;
  return (
    <div>
      <Typography.Title level={1} style={{ margin: '0 0 20px' }}>
        All Students
      </Typography.Title>
      <Input.Search
        style={{ width: 247, marginBottom: 20 }}
        placeholder="search for students"
        onSearch={handleSearch}
      ></Input.Search>
      <StudentTable
        students={students.students}
        onDelete={handelDelete}
        onEdit={handelEdit}
      />
      <div className="end">
        <Pagination
          total={students.count}
          pageSize={2}
          onChange={handlePagination}
        ></Pagination>
      </div>
    </div>
  );
};

export default AllStudentsPage;
