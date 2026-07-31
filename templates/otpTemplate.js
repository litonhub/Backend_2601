exports.otpTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Verification</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
    <tr>
      <td align="center" style="padding:40px 15px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center"
              style="background:#2563eb;padding:35px 20px;color:#ffffff;font-size:28px;font-weight:bold;">
              Verify Your Email
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 35px;color:#333333;">

              <h2 style="margin:0 0 20px;">Hello 👋</h2>

              <p style="margin:0 0 25px;font-size:16px;line-height:1.7;color:#555555;">
                Thank you for choosing <strong>Node 2601</strong>.
                Use the verification code below to continue.
              </p>

              <!-- OTP -->
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td
                    style="background:#f3f4f6;border:2px dashed #2563eb;border-radius:10px;padding:18px 40px;font-size:34px;font-weight:bold;letter-spacing:8px;color:#2563eb;">
                    ${otp}
                  </td>
                </tr>
              </table>

              <p style="margin:30px 0 0;font-size:15px;line-height:1.7;color:#666666;">
                This OTP is valid for
                <strong>10 minutes</strong>.
              </p>

              <p style="margin:15px 0 0;font-size:15px;line-height:1.7;color:#666666;">
                Never share this code with anyone. Our team will never ask for your OTP.
              </p>

              <p style="margin:15px 0 0;font-size:15px;line-height:1.7;color:#666666;">
                If you didn't request this verification, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="padding:25px;border-top:1px solid #eeeeee;text-align:center;font-size:13px;color:#888888;">
              <strong>Node 2601</strong><br>
              This is an automated email. Please do not reply.<br><br>
              © 2026 Node 2601. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;