const express = require('express');
const app = express();
// to log information about incoming HTTP requests
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const mongoSanitize = require('express-mongo-sanitize');
const classRoomRouter = require('./Routes/classRoomRoutes');
const courseRouter = require('./Routes/courseRoutes');
const videoRouter = require('./Routes/videoRoutes');
const studentRouter = require('./Routes/studentRoutes');
const teacherRouter = require('./Routes/teacherRoutes');
const markRouter = require('./Routes/markRoutes');
const sectionRouter = require('./Routes/sectionRoutes');
const analysisRouter = require('./Routes/analysisRoutes');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Credentials',
  ],
};
//Limit request from same Api 'preventing attacks
//100 req per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP,please try again in an hour!',
});
// app.use('/api', limiter);

//Data sanitization against no sql query injection
app.use(mongoSanitize()); // Looking at req.body ,req.querystring and req.params and filter out all

//Data sanitization against xss "scripting attacks"

app.use(cors(corsOptions));
app.use(express.json());
//third party middleware // helps you to see data inside the req

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//to check every request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// to enable the parsing and handling of cookies in incoming HTTP requests
app.use(cookieParser());
// routes
app.use('/api/v1/classRooms', classRoomRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/marks', markRouter);
app.use('/api/v1/sections', sectionRouter);
app.use('/api/v1/analysis', analysisRouter);

module.exports = app;
