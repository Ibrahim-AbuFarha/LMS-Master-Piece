import { useState } from "react";
import { Modal, Button, message } from "antd";

const DeleteModal = ({ onDelete, title, text }) => {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  //Delete function
  const handleDelete = () => {
    onDelete();
    message.success(`Deleted`);
    setModalVisible(false);
  };

  return (
    <>
      <Button danger type="primary" onClick={() => setModalVisible(true)}>
        Delete
      </Button>
      <Modal
        title={title}
        onOk={handleDelete}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>{text}</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
