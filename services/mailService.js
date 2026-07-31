const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendMail = async ({ to, subject, html }) => {
  return await transporter.sendMail({
    from: `"Node 2601" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};