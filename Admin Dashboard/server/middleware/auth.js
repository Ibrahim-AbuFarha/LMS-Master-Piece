const Teacher = require('./../Models/teacherModel');
//goal is to convert callback-based functions
//(functions that use the traditional callback pattern)
//into functions that return promises
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

//protects
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

  //grant access to protected route
  req.user = { id: decoded.id, role: decoded.role }; //for future that we can then use it in a next mw func

  next();
};
//roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles['admin',lead-guide],role='user'
    console.log('=============', req.user);
    if (!roles.includes(req.user.role))
      return res.status(403).json({
        error: "you don't have permission to do this action",
      });
    next();
  };
};
