import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

import { useForm } from "antd/es/form/Form";

const AddSectionModal = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = useForm();
  //show add section
  const showModal = () => {
    setOpen(true);
  };
  //hide add section
  const handleCancel = () => {
    setOpen(false);
  };

  //add new Section
  const handleOk = async () => {
    setConfirmLoading(true);
    const value = form.getFieldsValue();
    await onAdd(value);
    console.log(value);
    form.resetFields();
    setConfirmLoading(false);
    setOpen(false);
  };

  return (
    <div className="flex-end">
      <Button type="primary" onClick={showModal}>
        + Add Section
      </Button>
      <Modal
        title="Add Section"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="title"
            label="Section Name"
            rules={[{ required: true, message: "Please enter section name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default AddSectionModal;
