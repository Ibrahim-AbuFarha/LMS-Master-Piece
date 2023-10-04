import React, { useContext, useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import AuthContext from "../../../store/authContext";

const AddClassModal = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);
  //validation to values
  const [form] = Form.useForm();
  //to show the add class modal
  const showModal = () => {
    setOpen(true);
  };
  //to hide add class modal
  const handleCancel = () => {
    setOpen(false);
  };
  //on ok add the new Class by sending the values and teacherId
  const handleOk = async () => {
    try {
      const value = await form.validateFields();
      setConfirmLoading(true);
      await onAdd({ ...value, teacherId: user._id });
      setOpen(false);
      message.success("Class has added");
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
      message.error("Check all the Value are correctly");
    }
    setConfirmLoading(false);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={showModal}>Add Class</Button>

      <Modal
        title="Add Class"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please select Gender" }]}
          >
            <Select size="large" placeholder="">
              <Select.Option value="math">Math</Select.Option>
              <Select.Option value="physics">Physics</Select.Option>
              <Select.Option value="english">English</Select.Option>
              <Select.Option value="chemistry">Chemistry</Select.Option>
              <Select.Option value="biology">Biology</Select.Option>
              <Select.Option value="history">Arts</Select.Option>
              <Select.Option value="computer-science">Computer</Select.Option>
              <Select.Option value="art">Geography</Select.Option>
              <Select.Option value="music">Economy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="grade"
            label="Grade"
            rules={[{ required: true, message: "Please enter grade" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="courseId"
            label="Course ID"
            rules={[{ required: true, message: "Please enter Course ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please enter student number" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddClassModal;
