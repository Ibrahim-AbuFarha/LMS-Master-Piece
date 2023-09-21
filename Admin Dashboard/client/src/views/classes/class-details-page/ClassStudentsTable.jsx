import { Space, Table, Avatar, Typography } from "antd";
import EditStudentMarkModal from "./EditStudentMarkModal";
import DeleteModal from "../../../components/common/DeleteModal";

const ClassStudentsTable = ({ onEdit, onDelete, students }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <Space>
          <Avatar onClick={console.log(record)} src={record.img} />
          <Typography.Paragraph>{record.fullName}</Typography.Paragraph>
        </Space>
      ),
    },
    {
      title: "Grade",
      key: "grade",
      dataIndex: "grade",
    },
    {
      title: "First",
      dataIndex: "first",
      key: "first",
    },
    {
      title: "Mid",
      dataIndex: "mid",
      key: "mid",
    },
    {
      title: "Final",
      dataIndex: "final",
      key: "Final",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditStudentMarkModal onEdit={onEdit} student={record} />
          <DeleteModal
            title={"Delete Student"}
            text={"Are  you sure you want to delete this Student"}
            onDelete={() => onDelete(record)}
          />
        </Space>
      ),
    },
  ];

  console.log(students);

  const adjustedData = students?.map((student) => {
    return {
      email: student._id.email,
      grade: student._id.grade,
      img: student._id.img,

      fullName: student._id.fullName,
      first: student.marks.first,
      mid: student.marks.mid,
      final: student.marks.final,
      key: student._id._id,
    };
  });
  return (
    <Table
      columns={columns}
      dataSource={adjustedData}
      pagination={false}
      style={{ overflowX: "scroll" }}
    />
  );
};
export default ClassStudentsTable;
