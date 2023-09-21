const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

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

app.use(cors(corsOptions));
app.use(express.json());
//third party middleware // helps you to see data inside the req

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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
