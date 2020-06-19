const jwt = require("jsonwebtoken");
const User = require("../models/user");

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.query.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error()
    }

    socket.user = user

    // req.token = token;
    // req.user = user;
    return next();
  } catch (error) {
    return next(new Error("Please Authenticate"))
  }
};

module.exports = socketAuth;