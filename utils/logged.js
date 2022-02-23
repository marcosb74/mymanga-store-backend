const jwt = require("jsonwebtoken");
const User = require("../models/User");

// constructor function to create a storage directory inside our project for all our localStorage setItem.

const isAuthenticatedUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.locals.userAuthed = false;
    return next();
  } // pensar otra forma
  //return next(new ErrorHandler(""), 401);
  const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
};

module.exports = isAuthenticatedUser;
