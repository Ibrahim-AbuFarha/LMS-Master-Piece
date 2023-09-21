const Section = require('./../Models/sectionModel');
const Lesson = require('./../Models/sectionModel');
const Course = require('./../Models/courseModel');
const ApiFeatures = require('./../utils/ApiFeatures');

exports.getAllSections = async (req, res) => {
  try {
    const features = new ApiFeatures(Section, req.query).filter();
    const sections = await features.query;

    res.status(200).json({
      status: 'success',
      sections,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.getSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      section,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.AddSection = async (req, res) => {
  try {
    //check if the column exist
    const { courseId: id } = req.body;
    console.log(req.body);
    const course = await Course.findById(id)
      .populate({ path: 'sections' })
      .exec();
    console.log(course);
    if (!course) throw new Error('course id is not found');
    //if the task exist then add subtask for it
    const section = await Section.create(req.body);
    //
    course.sections.push(section._id);
    await course.save();
    res.status(201).json({
      status: 'success',
      section,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.AddLesson = async (req, res) => {
  try {
    const { title, url, sectionId } = req.body;

    const section = await Section.findById(sectionId);
    console.log(title);
    if (!section) throw new Error('section is not found ');

    section.lessons.push({ title, url });
    await section.save();

    res.status(201).json({
      status: 'success',
      section,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteLesson = async (req, res) => {
  try {
    const { sectionId, lessonId } = req.params;
    console.log(sectionId, lessonId);
    const section = await Section.findById(sectionId);
    console.log(section);
    if (!section) throw new Error('section is not found ');

    section.lessons = section.lessons.filter(
      (item) => item._id.toString() !== lessonId
    );
    await section.save();

    res.status(201).json({
      status: 'success',
      section,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
