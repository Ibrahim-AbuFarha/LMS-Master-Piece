import DeleteModal from "../../../components/common/DeleteModal";

const LessonsList = ({ lessons, onDelete, sectionId }) => {
  return (
    <div className="flex-col" style={{ marginBottom: "10px" }}>
      {lessons.map((lesson) => (
        <div key={lesson._id} className="flex">
          <a href={lesson.url} target="_blank">
            {lesson.title}
          </a>

          <DeleteModal
            text={"Are u sure you want to delete this lesson ?"}
            title={"Delete Lesson"}
            onDelete={() => onDelete(lesson._id, sectionId)}
          />
        </div>
      ))}
    </div>
  );
};

export default LessonsList;
