import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

const AddClassModal = ({ onAdd }) => {
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
      await onAdd({ ...value, teacherId: '64e99fd628088aea43866180' });

      setOpen(false);
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
    setConfirmLoading(false);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
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
            rules={[{ required: true, message: 'Please select Gender' }]}
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
            rules={[{ required: true, message: 'Please enter grade' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="courseId"
            label="Course ID"
            rules={[{ required: true, message: 'Please enter Course ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: 'Please enter student number' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddClassModal;
