import React, { useState } from "react";
import { Button, Modal, Input, Alert, message } from "antd";
import SearchStudents from "./SearchStudents";
const AddStudentToClassModal = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  //show search modal
  const showModal = () => {
    setOpen(true);
  };
  //hide search modal
  const handleCancel = () => {
    setOpen(false);
  };
  //on select set the student which we are going to add
  const handleSelect = (student) => {
    setSelectedStudent(student);
  };
  console.log(selectedStudent);
  // on ok add the student in the class
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await onAdd(selectedStudent);
      setConfirmLoading(false);
      setOpen(false);
      message.success("Student has added");
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
      message.error("student is already exist");
    }
    setConfirmLoading(false);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={showModal}>Add student</Button>

      <Modal
        title="Add student"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <SearchStudents
          selectedStudent={selectedStudent}
          onSelect={handleSelect}
        ></SearchStudents>
      </Modal>
    </div>
  );
};

export default AddStudentToClassModal;
