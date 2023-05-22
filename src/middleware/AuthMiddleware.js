const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const baseResponse = require('../core/BaseResponse');
dotenv.config();
const verify = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json(baseResponse.unauthorizedResponse());
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    req.body.userId = verified._id;
    next();
  } catch (err) {
    res.status(400).json(baseResponse.unauthorizedResponse());
  }
};

const createToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
}

module.exports = {
    verify,
    createToken
}