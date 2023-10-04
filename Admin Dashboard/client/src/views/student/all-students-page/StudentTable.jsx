import { Space, Table, Avatar } from "antd";

import EditStudentModal from "./EditStudentModal";
import DeleteModal from "../../../components/common/DeleteModal";
import { useContext } from "react";
import AuthContext from "../../../store/authContext";

const StudentTable = ({ students, onDelete, onEdit }) => {
  const { user } = useContext(AuthContext);

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <Space>
          <Avatar src={record.url} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{record.fullName}</span>
          </div>
        </Space>
      ),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Grade",
      key: "grade",
      dataIndex: "grade",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  if (user.role === "admin")
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditStudentModal onEdit={onEdit} record={record} />
          <DeleteModal
            onDelete={() => onDelete(record)}
            text={"Are you sure to delete this student"}
            title={"Delete the Student"}
          />
        </Space>
      ),
    });

  const data = students.map((item) => ({
    key: item._id,
    fullName: item.fullName,
    age: item.age,
    email: item.email,
    address: item.address,
    grade: item.grade,
    mobile: item.mobile,
    gender: item.gender,
    url: item.img,
  }));

  console.log(data);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{ overflowX: "scroll" }}
    />
  );
};
export default StudentTable;
