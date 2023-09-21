import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

import { useForm } from 'antd/es/form/Form';

const AddCourseModal = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = useForm();

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
    } catch (err) {
      console.log(err);
    }
    setConfirmLoading(false);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
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
            rules={[{ required: true, message: 'Please enter lesson name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            required
            label="Description"
            rules={[{ required: true, message: 'Please enter desription' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default AddCourseModal;
