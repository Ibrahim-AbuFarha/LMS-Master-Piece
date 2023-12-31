import { Avatar, Card, Typography } from "antd";
import { Space, Tooltip } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { LMS_API } from "../../../../api/api";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  //get all approved teachers

  const getTeachers = async () => {
    try {
      const { data } = await LMS_API.get("/teachers?status=approved");
      const updateData = data.teachers.map((item) => {
        return { ...item, key: item._id };
      });
      setTeachers(updateData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTeachers();
  }, []);
  console.log(teachers);
  return (
    <div className="grid-200">
      {teachers.map((item) => (
        <Card key={item.key} style={{ textAlign: "center" }}>
          <Avatar
            src={item.img}
            style={{ height: "120px", width: "120px" }}
          ></Avatar>
          <Typography.Title style={{ fontSize: "30px" }}>
            {item.fullName}
          </Typography.Title>
          <Typography.Paragraph>{item.course}</Typography.Paragraph>
          <Space direction="horizontal">
            <Tooltip title={item.email}>
              <MailOutlined style={{ fontSize: "20px" }}></MailOutlined>
            </Tooltip>
            <Tooltip title={item.mobile}>
              <PhoneOutlined style={{ fontSize: "20px" }} />
            </Tooltip>
          </Space>
        </Card>
      ))}
    </div>
  );
};

export default TeacherList;
