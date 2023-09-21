const Teacher = require('./../Models/teacherModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  //1)Getting token and check of it's there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  } else {
    token = req.cookies.token;
  }

  if (!token) {
    console.log('test');
    res.status(401).json({
      error: 'no token',
    });
    return;
  }

  //2)Verification token
  //we verify if someone manipulated the data or the token has expired
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded); //{ id: '64c0dc91d4bdbd432cf3712a', iat: 1690360978, exp: 1698136978 }

  //4)Check if teacher changed password after the token has issued

  //grant access to protected route
  req.user = { id: decoded.id }; //for future that we can then use it in a next mw func

  next();
};

exports.restrictTo = async (...roles) => {
  return (req, res, next) => {
    //roles['admin',lead-guide],role='user'
    if (!roles.includes(req.user.role))
      res.status(404).json({
        error: "you don't have permission to do this action",
      });
  };
};
