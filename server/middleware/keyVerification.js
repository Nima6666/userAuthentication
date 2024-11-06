const expressAsyncHandler = require("express-async-handler");
const User = require("../model/user");
const ResetKey = require("../model/resetKey");

module.exports.verifyResetLink = expressAsyncHandler(async (req, res, next) => {
  const { userId, resetKey } = req.body;

  const userFound = await User.findById(userId);

  if (userFound) {
    const passwordLinkVerification = await ResetKey.findOne({
      user_id: userId,
      _id: resetKey,
    });

    if (passwordLinkVerification) {
      const linkValid =
        new Date(passwordLinkVerification.created).getTime() + 5 * 60 * 1000 >
        Date.now();

      console.log("password reset link validation status ", linkValid);

      if (linkValid) {
        next();
      } else {
        res.json({
          success: false,
          message: "link expired",
        });
        await ResetKey.findByIdAndDelete(resetKey);
      }
    } else {
      res.status(404).json({
        message: "verificationkeynotfound",
      });
    }
  } else {
    res.status(404).json({
      message: "usernotfound",
    });
  }
});
