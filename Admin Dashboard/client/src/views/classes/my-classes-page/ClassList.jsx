import { useState, useEffect, useContext } from "react";
import AddClassModal from "./AddClassModal";
import ClassCard from "./ClassCard";

import AuthContext from "../../../store/authContext";
import { LMS_API } from "../../../../api/api";
const ClassList = () => {
  const [classRooms, setClassRooms] = useState([]);
  const { user } = useContext(AuthContext);

  //get all classRooms by teacher Id
  const getClassRooms = async () => {
    try {
      const { data } = await LMS_API.get(`classRooms?teacherId=${user._id}`);

      setClassRooms(data.classRooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassRooms();
  }, []);
  //add new class
  const handleAddClass = async (value) => {
    console.log(value);
    const { data } = await LMS_API.post("/classRooms", value);

    console.log(data);
    setClassRooms([...classRooms, data.classRoom]);
  };
  //delete class
  const handleDeleteClass = async (id) => {
    console.log(id);
    await LMS_API.delete(`/classRooms/${id}`);
    const updatedClassRooms = classRooms.filter((item) => item._id !== id);
    setClassRooms(updatedClassRooms);
  };
  //Edit class
  const handleEditClass = async (value, id) => {
    console.log(value);
    console.log(id);
    const { data } = await LMS_API.patch(`/classRooms/${id}`, value);
    console.log(data);
    const updatedClassRooms = classRooms.map((item) => {
      if (item._id == id) return data.classRoom;

      return item;
    });
    setClassRooms(updatedClassRooms);
  };

  return (
    <>
      <AddClassModal onAdd={handleAddClass} />
      {classRooms.map((classRoom, indx) => (
        <ClassCard
          key={indx}
          onDelete={handleDeleteClass}
          onEdit={handleEditClass}
          classRoom={classRoom}
        />
      ))}
    </>
  );
};

export default ClassList;
