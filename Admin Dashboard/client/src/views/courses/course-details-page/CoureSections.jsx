import { Collapse } from "antd";
import AddLessonModal from "./AddLessonModal";
import AddSectionModal from "./AddSectionModal";
import LessonsList from "./LessonsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CoureSections = () => {
  const { id: courseId } = useParams();

  const [sections, setSections] = useState([]);
  const getSections = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/v1/sections?courseId=${courseId}`
    );
    console.log(data);
    setSections(data.sections);
  };
  useEffect(() => {
    getSections();
  }, []);

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

  async function handleAddLesson(title, url, sectionId) {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/v1/sections/addLesson",
        {
          title,
          url,
          sectionId,
        }
      );
      console.log(data);
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

  async function handleDeleteLesson(lessonId, sectionId) {
    try {
      console.log(lessonId, sectionId);
      const { data } = await axios.delete(
        `http://127.0.0.1:8000/api/v1/sections/${sectionId}/deleteLesson/${lessonId}`
      );
      console.log(data);
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

  async function handleAddSection(section) {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/v1/sections",
        {
          ...section,
          courseId,
        }
      );
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
