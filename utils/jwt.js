const jwt = require("jsonwebtoken");

const jwtSecret = "secret";

exports.generateToken = (payload) => {
  try {
    const token = jwt.sign({ _id: payload._id }, jwtSecret, { expiresIn: "60mins" });
    return token;
  } catch (error) {
    throw Error(error.message);
  }
};


exports.decodeToken = (token) => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    throw Error(error.message);
  }
};
