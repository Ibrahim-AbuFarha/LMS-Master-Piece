const jwt = require('jsonwebtoken');
const Teacher = require('../Models/teacherModel');
const Student = require('../Models/studentModel');

const sendEmail = require('../utils/email');
const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

exports.signUpTeacher = async (req, res, next) => {
  try {
    console.log(req.body);
    const newTeacher = await Teacher.create(req.body); //return a promise

    res.status(201).json({
      status: 'success',
      newTeacher,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.signUpStudent = async (req, res, next) => {
  try {
    const newStudent = await Student.create({
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    }); //return a promise
    //create a token
    res.status(201).json({
      status: 'success',
      newStudent,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signInTeacher = async (req, res, next) => {
  try {
    console.log('122');
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error('Please provide email and password');

    const teacher = await Teacher.findOne({ email });
    if (
      !teacher ||
      !(await teacher.correctPassword(password, teacher.password))
    )
      throw new Error('Incorrect email or password');

    if (teacher.status === 'pending') throw new Error(' teacher is pending');

    //3)If everything ok, send token to client
    const token = signToken({ id: teacher._id, role: teacher.role });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + oneDay),
    });

    const { password: pass, ...result } = teacher._doc;

    res.status(200).json({
      status: 'success',
      teacher: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.signInStudent = async (req, res, next) => {
  //1)Check if email and password exist
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error('Please provide email and password');

    const student = await Student.findOne({ email });

    if (
      !student ||
      !(await student.correctPassword(password, student.password))
    )
      throw new Error('Incorrect email or password');

    //3)If everything ok, send token to client
    // const token = signToken(student._id);
    // res.cookie('token', token, { httpOnly: true });
    // const { password: pass, ...result } = student._doc;
    res.status(200).json({
      status: 'success',
      student,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  res.cookie('toekn', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 3 * 1000),
  });
  res.status(202).json({ msg: 'logout ' });
};

// exports.forgotPassword = async (req, res, next) => {
//   //1)Get user based on posted email
//   const { email } = req.body;
//   const teacher = await Teacher.findOne({ email });
//   if (!teacherEmail)
//     throw new Error('There is no teacher with this email address ');
//   //2) generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   //this will deactivate all the validators that we specified in our schema
//   await teacher.save({ validateBeforeSave: false });

//   //3)send it as a email using nodemailer
//   const resetUrl = ` `;
// };
