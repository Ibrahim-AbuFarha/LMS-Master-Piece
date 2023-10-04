import { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";

import { useForm } from "antd/es/form/Form";

const AddCourseModal = ({ onAdd, userId }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = useForm();
  //to show the add course modal
  const showModal = () => {
    setOpen(true);
  };
  //to hide the add course modal
  const handleCancel = () => {
    setOpen(false);
  };
  // to add the new Course
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const value = await form.validateFields();
      console.log(value);
      await onAdd({ ...value, teacherId: userId });
      setOpen(false);
      message.success("course has added");
    } catch (err) {
      console.log(err);
      message.error("Check all input are correct");
    }
    setConfirmLoading(false);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={showModal}>+ Add Course</Button>

      <Modal
        title="Add Course"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            required
            label="Course Name"
            rules={[{ required: true, message: "Please enter lesson name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            required
            label="Description"
            rules={[{ required: true, message: "Please enter desription" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default AddCourseModal;
