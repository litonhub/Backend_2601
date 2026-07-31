const User = require("../models/userSchema");
const { generateOtp } = require("../services/otpService");
const { sendMail } = require("../services/mailService");
const { otpTemplate } = require("../templates/otpTemplate");

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const otp = generateOtp();

    await sendMail({
      to: email,
      subject: "Your OTP Verification Code",
      html: otpTemplate(otp),
    });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      existingUser.otp = otp;
      await existingUser.save();
    } else {
      await User.create({
        email,
        otp,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.params;
    const { otp } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!existingUser.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (existingUser.otp === otp) {
      await User.findOneAndUpdate(
        { email },
        {
          otp: "",
          isLogin: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    }

    return res.status(400).json({
      success: false,
      message: "OTP not matched",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { email } = req.params;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!existingUser.isLogin) {
      return res.status(400).json({
        success: false,
        message: "User is already logged out",
      });
    }

    await User.findOneAndUpdate(
      { email },
      {
        isLogin: false,
        otp: "",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};