const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports.isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (typeof bearerToken !== "undefined") {
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET, async (err, authData) => {
      if (err) {
        console.log(err);
        return res.status(403).json({
          success: false,
          message: "Token Expired",
        });
      } else {
        req.headers.authData = authData; // Attaching payload on successful token verification to req.headers
        const userAuthenticated = await User.findById(authData.userId);
        req.userAuthenticated = userAuthenticated; // Sending userAuthenticated as requset object

        // checking if the user exists on database
        if (!userAuthenticated) {
          return res.status(404).json({
            message: "logged in user not found",
          });
        }
        next();
      }
    });
  } else {
    console.log("smthng went wrong validating token");
    return res.status(403).json({
      message: "token not found",
    });
  }
});
