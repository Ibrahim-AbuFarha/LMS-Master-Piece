import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

const EditStudentMarkModal = ({ onEdit, student }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
//show edit modal
  const showModal = () => {
    setOpen(true);
  };
//hide edit modal
  const handleCancel = () => {
    setOpen(false);
  };
//edit the student when click "ok"
  const handleOk = async () => {
    try {
      //validate inputs
      const values = await form.validateFields();

      setConfirmLoading(true);
      await onEdit(values, student.key);
      setConfirmLoading(false);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={showModal}>Edit Marks</Button>

      <Modal
        title="Edit Marks"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="first"
            label="First"
            initialValue={student.first}
            rules={[{ required: true, message: "Please enter first mark" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="mid"
            label="Midterm"
            initialValue={student.mid}
            rules={[{ required: true, message: "Please enter midterm mark" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="final"
            label="Final"
            initialValue={student.final}
            rules={[{ required: true, message: "Please enter final mark" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditStudentMarkModal;
