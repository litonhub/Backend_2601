const express = require("express");
const router = express.Router();
const { sendOtp, login, logout } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiter");

/**
 * @swagger
 * /api/auth/sendotp:
 *   post:
 *     summary: Send OTP to user email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Email is required
 */
router.post("/sendotp", authLimiter, sendOtp);

/**
 * @swagger
 * /api/auth/login/{email}:
 *   post:
 *     summary: Verify OTP and login user
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         example: user@example.com
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid OTP
 *       404:
 *         description: User not found
 */
router.post("/login/:email", authLimiter, login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", logout);

module.exports = router;