import React from "react";
import { Space, Avatar, Card, Typography, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
const LastStudentsAdded = ({ students }) => {
  return (
    <Card>
      <Typography.Title style={{ fontSize: 25 }}>
        Last Added Students
      </Typography.Title>
      <Space size={20} direction="vertical">
        {students.map((student) => (
          //mapping students

          <Space size={10} key={student._id}>
            <Avatar icon={<UserOutlined />} size={40} src={student.url} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text>{student.fullName}</Typography.Text>
              <Typography.Text>{student.email}</Typography.Text>
            </div>
            <Divider></Divider>
          </Space>
        ))}
      </Space>
    </Card>
  );
};

export default LastStudentsAdded;
