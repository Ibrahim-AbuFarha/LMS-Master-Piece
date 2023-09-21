import React, { useEffect, useState } from "react";
import { Layout, Table, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
const { Content } = Layout;
const { confirm } = Modal;

const AdminApprovalPage = () => {
  const [requests, setRequests] = useState([]);
  const getAllRequests = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/v1/teachers?status=pending`
      );
      console.log(data);
      setRequests(data.teachers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  const handleApproval = async (id) => {
    await axios.patch(
      `http://127.0.0.1:8000/api/v1/teachers/updateRequest/${id}`
    );
    const updatedDataSource = requests.filter((item) => item._id !== id);
    setRequests(updatedDataSource);
    message.success("teacher has added");
  };
  const handleDeclined = async (id) => {
    try {
      console.log(id);
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/teachers/updateRequest/${id}`
      );
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
