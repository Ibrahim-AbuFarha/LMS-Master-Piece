import { useState } from 'react';
import { Modal, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

const DeleteModal = ({ onDelete, title, text }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    onDelete();
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
