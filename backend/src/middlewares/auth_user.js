require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const auth = req.headers["authorization"];
  if (auth != undefined) {
    try {
      const barier = auth.split(" ");
      const token = barier[1];
      jwt.verify(token, process.env.SECRET);
      return next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        error: error,
        message: "Usuario não autenticado",
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "Usuario não autenticado",
    });
  }
};
