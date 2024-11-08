const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const ResetKey = require("../model/resetKey");

// token generator function
function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "1d", // Token expiration time
  });
  return `Bearer ${token}`;
}

// transporter for mail.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// registering user
module.exports.register = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 5000));

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const userFound = await User.findOne({ email: email });

  // checking if user exists using provided email
  if (userFound) {
    return res.json({
      success: false,
      message: "Email already in use",
    });
  }

  console.log("registering user");

  // hashing password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    name,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({
    success: true,
    message: "user registered",
  });
});

// user login
module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // validating password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // payload for jwt signing
  const payload = {
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
  };

  // generating token passing payload
  const token = generateToken(payload);

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      token,
      name: user.name,
      email: user.email,
    },
  });
});

// getting user by token
module.exports.getUserByToken = asyncHandler(async (req, res) => {
  const userAuthenticated = req.userAuthenticated;

  if (userAuthenticated) {
    return res.json({
      success: true,
      message: "user resolved",
      user: {
        name: userAuthenticated.name,
        email: userAuthenticated.email,
      },
    });
  } else {
    return res.status(404).json({
      message: "user not found",
    });
  }
});

// password reset using old password
module.exports.resetPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = req.userAuthenticated;
  const match = await bcrypt.compare(currentPassword, user.password);

  console.log(match);
  if (match) {
    if (currentPassword === newPassword) {
      return res.json({
        success: false,
        message: "New Password cannot be same as Old password.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({
      success: true,
      message: "Password Updated",
    });
  } else {
    res.status(401).json({
      message: "Incorrect Password",
    });
  }
});

// password reset link generation
module.exports.sendPasswordResetLink = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userFound = await User.findOne({ email: email });

  if (userFound) {
    let prevKeyValid = false;

    const prevKey = await ResetKey.findOne({ user_id: userFound._id }).sort(
      "-created"
    );

    if (prevKey) {
      // check if verification key is still valid
      if (new Date(prevKey.created).getTime() + 5 * 60 * 1000 > Date.now()) {
        prevKeyValid = true;
      }
    }

    // sending reset link if previous verification is not valid
    if (!prevKeyValid) {
      const forgetPasswordVerification = new ResetKey({
        user_id: userFound._id,
      });
      await forgetPasswordVerification.save();

      // sending password reset link
      const accountVerificationMailOptions = {
        from: process.env.EMAIL,
        to: userFound.email, // sending to user
        subject: "Reset Password Link",
        // sending verification id to user mail using client_origin to handle verifying
        html: `<div>DONT SHARE WITH ANYONE. Click on this link to reset password of your account. <a href=${process.env.CLIENT_ORIGIN}/password_reset/${userFound._id}/${forgetPasswordVerification._id} target="_blank">RESET PASSWORD</a></div>`,
      };

      // sending verification link to user
      transporter.sendMail(
        accountVerificationMailOptions,
        function (error, info) {
          if (error) {
            return res.status(500).json({
              message: "SERVER ERROR",
            });
          } else {
            console.log("registered User and email sent " + info.response);
            return res.json({
              success: true,
              message: "Password reset Link Sent to your email address",
            });
          }
        }
      );
    } else {
      res.json({
        success: true,
        message: "password reset link already sent",
      });
    }
  } else {
    res.json({
      success: true,
      message: "password reset link will be sent if your account exists",
    });
  }
});

// checking if reset link is valid
module.exports.verifyPasswordResetLink = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "please reset your password",
  });
});

// password reset using link
module.exports.setNewPassword = asyncHandler(async (req, res) => {
  const { newPassword, userId, resetKey } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  await ResetKey.findByIdAndDelete(resetKey);

  res.json({
    success: true,
    message: "Login with your new password",
  });
});
