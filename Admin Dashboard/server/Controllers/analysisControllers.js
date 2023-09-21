const Teacher = require('../Models/teacherModel');
const Student = require('../Models/studentModel');
const ClassRoom = require('../Models/classRoomModel');
const Course = require('../Models/courseModel');
const { getMonthName } = require('../utils/helper');

exports.numberOfResources = async (req, res) => {
  try {
    const numTeachers = await Teacher.find({}).countDocuments();
    const numStudents = await Student.find({}).countDocuments();
    const numClassRooms = await ClassRoom.find({}).countDocuments();
    const numCourses = await Course.find({}).countDocuments();
    res.status(200).json({
      state: 'success',
      resources: {
        numTeachers,
        numStudents,
        numCourses,
        numClassRooms,
      },
    });
  } catch (err) {
    res.status(400).json({
      state: 'fail',
      message: err.message,
    });
  }
};

exports.getTeacherDataByMonth = async (req, res) => {
  try {
    const teacherData = await Teacher.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' }, // Group by month of the 'createdAt' field
          teacherCount: { $sum: 1 }, // Count teachers in each group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the MongoDB-generated _id field
          month: '$_id', // Rename _id to month
          teacherCount: 1, // Include the teacherCount field
        },
      },
    ]);

    // Map the result to match your desired format
    const formattedTeacherData = teacherData.map((item) => ({
      month: getMonthName(item.month), // Convert month number to name (e.g., 'January')
      teacherCount: item.teacherCount,
    }));

    res.status(202).json({
      status: 'success',
      teachers: formattedTeacherData,
    });
  } catch (error) {
    console.error('Error fetching teacher data:', error);
    throw error;
  }
};

// Helper function to get month name from month number
