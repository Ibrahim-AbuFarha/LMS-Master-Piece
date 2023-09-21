import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

const EditClassModal = ({ onEdit, classRoom }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    try {
      const value = await form.validateFields();
      setConfirmLoading(true);
      await onEdit(value, classRoom._id);
      setConfirmLoading(false);
      setOpen(false);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={showModal}>Edit class</Button>

      <Modal
        title="Edit Class"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="subject"
            label="Subject"
            initialValue={classRoom.subject}
            rules={[{ required: true, message: "Please enter subject" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="grade"
            label="Grade"
            initialValue={classRoom.grade}
            rules={[{ required: true, message: "Please enter grade" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="courseId"
            label="Course ID"
            rules={[{ required: true, message: "Please enter Course ID" }]}
            initialValue={classRoom.courseId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please enter Capacity" }]}
            initialValue={classRoom.capacity}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditClassModal;
