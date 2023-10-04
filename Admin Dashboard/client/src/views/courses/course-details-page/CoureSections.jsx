import { Collapse } from "antd";
import AddLessonModal from "./AddLessonModal";
import AddSectionModal from "./AddSectionModal";
import LessonsList from "./LessonsList";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { LMS_API } from "../../../../api/api";

const CoureSections = () => {
  const { id: courseId } = useParams();

  const [sections, setSections] = useState([]);

  //get sections for the courseId
  const getSections = async () => {
    const { data } = await LMS_API.get(`/sections?courseId=${courseId}`);
    console.log(data);
    setSections(data.sections);
  };
  useEffect(() => {
    getSections();
  }, []);
  //mapping for show the section lessons
  const initSections = sections.map((section) => ({
    key: section._id,
    label: section.title,
    children: (
      <div>
        <LessonsList
          lessons={section.lessons}
          sectionId={section._id}
          onDelete={handleDeleteLesson}
        />
        <AddLessonModal sectionId={section._id} onAdd={handleAddLesson} />
      </div>
    ),
  }));
  //add lesson
  async function handleAddLesson(title, url, sectionId) {
    try {
      const { data } = await LMS_API.post("/sections/addLesson", {
        title,
        url,
        sectionId,
      });
      console.log(data);
      //to avoid the manipulation
      const sectionIndex = sections.findIndex((item) => item._id === sectionId);

      setSections((prev) => {
        const updated = [...prev];
        updated[sectionIndex] = data.section;
        return updated;
      });
    } catch (error) {
      console.log(error.response.message);
    }
  }
  //delete lesson
  async function handleDeleteLesson(lessonId, sectionId) {
    try {
      console.log(lessonId, sectionId);
      const { data } = await LMS_API.delete(
        `/sections/${sectionId}/deleteLesson/${lessonId}`
      );
      console.log(data);
      //to avoid the manipulation
      const sectionIndex = sections.findIndex((item) => item._id === sectionId);
      console.log(sectionIndex);
      setSections((prev) => {
        const updated = [...prev];
        updated[sectionIndex] = data.section;
        return updated;
      });
    } catch (error) {
      console.log(error.response.message);
    }
  }
  //add new Section
  async function handleAddSection(section) {
    try {
      const { data } = await LMS_API.post("/sections", {
        ...section,
        courseId,
      });
      console.log(data.section);
      setSections([...sections, data.section]);
    } catch (error) {
      console.log(error.response.message);
    }
  }

  return (
    <div>
      <AddSectionModal onAdd={handleAddSection} />
      <Collapse items={initSections} defaultActiveKey={1}>
        CoureSections
      </Collapse>
    </div>
  );
};

export default CoureSections;
