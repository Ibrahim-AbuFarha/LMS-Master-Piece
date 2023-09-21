import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';

const EditStudentModal = ({ onEdit, record }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = (values) => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      setConfirmLoading(true);
      await onEdit(values, record.key);
      setOpen(false);
    } catch (error) {
      message.error(error.response.data.message);
    }
    setConfirmLoading(false);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <Button onClick={showModal}>Edit Student</Button>

      <Modal
        title="Edit Student"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter Full Name' }]}
            initialValue={record.fullName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email ID"
            rules={[{ required: true, message: 'Please enter Email ID' }]}
            initialValue={record.email}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
            initialValue={record.address}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[{ required: true, message: 'Please enter mobile' }]}
            initialValue={record.mobile}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="grade"
            label="Grade"
            rules={[{ required: true, message: 'Please enter Grade' }]}
            initialValue={record.grade}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter Course Age' }]}
            initialValue={record.age}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditStudentModal;
