import React, { useEffect, useState } from "react";
import { Layout, Table, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { LMS_API } from "../../../api/api";
const { Content } = Layout;
const { confirm } = Modal;

const AdminApprovalPage = () => {
  const [requests, setRequests] = useState([]);
  //get all requests
  const getAllRequests = async () => {
    try {
      const { data } = await LMS_API.get(`/teachers?status=pending`);
      console.log(data);
      setRequests(data.teachers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);
  //Approve request
  const handleApproval = async (id) => {
    await LMS_API.patch(`/teachers/updateRequest/${id}`);
    const updatedDataSource = requests.filter((item) => item._id !== id);
    setRequests(updatedDataSource);
    message.success("teacher has added");
  };
  //Decline request
  const handleDeclined = async (id) => {
    try {
      console.log(id);
      await LMS_API.delete(`/teachers/updateRequest/${id}`);
      const updatedDataSource = requests.filter((item) => item._id !== id);
      setRequests(updatedDataSource);
      message.success("teacher has declined");
    } catch (error) {
      console.log(error.message);
    }
  };

  const dataSource = requests.map((request) => ({
    key: request._id,
    fullName: request.fullName,
    email: request.email,
    status: request.status,
  }));

  const columns = [
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => showApproveConfirm(record.key)}>
            Approve
          </Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: "25px" }}
            onClick={() => showDeclineConfirm(record.key)}
          >
            Decline
          </Button>
        </>
      ),
    },
  ];
  //approval form
  const showApproveConfirm = (key) => {
    confirm({
      title: "Do you want to approve this request?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleApproval(key);
      },
      onCancel() {},
    });
  };
  //decline form
  const showDeclineConfirm = (key) => {
    confirm({
      title: "Do you want to decline this request?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeclined(key);
      },
      onCancel() {},
    });
  };

  return (
    <Content style={{ padding: "20px" }}>
      <h1>Approval Requests</h1>
      <Table dataSource={dataSource} columns={columns} />
    </Content>
  );
};

export default AdminApprovalPage;
