const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const User = require("../models/userSchema");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const info = await transporter.sendMail({
      from: '"Node 2601" <liton01766@gmail.com>',
      to: email,
      subject: "Your OTP Verification Code",
      html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>OTP Verification</title></head><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;"><tr><td align="center"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;"><tr><td align="center" style="background:#2563eb;padding:30px;color:#fff;font-size:28px;font-weight:bold;">Verify Your Email</td></tr><tr><td style="padding:40px 35px;color:#333;"><h2 style="margin:0 0 20px;">Hello 👋</h2><p style="margin:0 0 25px;font-size:16px;line-height:1.7;color:#555;">Use the OTP below to verify your email address.</p><table role="presentation" align="center" cellpadding="0" cellspacing="0"><tr><td style="background:#f3f4f6;border:2px dashed #2563eb;border-radius:10px;padding:18px 40px;font-size:34px;font-weight:bold;letter-spacing:8px;color:#2563eb;">${otp}</td></tr></table><p style="margin:30px 0 0;font-size:15px;color:#666;">This OTP is valid for <strong>10 minutes</strong>. Never share it with anyone.</p></td></tr></table></td></tr></table></body></html>`,
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