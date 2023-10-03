import { useState } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";
import { uploadFile } from "../../../hooks/useUpload";
import { useForm } from "antd/es/form/Form";

const AddLessonModal = ({ onAdd, sectionId }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState();
  const [form] = useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const { name } = await form.validateFields();
      const url = await uploadFile(file);
      await onAdd(name, url, sectionId);
      setOpen(false);
      form.resetFields();
    } catch (err) {
      console.log(err);
    }

    setConfirmLoading(false);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={showModal}>+ Add Lesson</Button>

      <Modal
        title="Add Lesson"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="Lesson Name"
            rules={[{ required: true, message: "Please enter lesson name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="video"
            label="Lesson Video"
            rules={[{ required: true, message: "Please add the lesson video" }]}
          >
            <Upload
              accept="video/*"
              beforeUpload={(newFile) => {
                setFile(newFile);
                return false;
              }}
            >
              <Button>Select Video</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default AddLessonModal;
