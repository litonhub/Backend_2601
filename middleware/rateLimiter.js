const rateLimit = require("express-rate-limit");

// General API Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 7 * 60 * 1000,
  max: 77,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Whoa! 77 requests already? 😅 Take a 7-minute break. Grab a 7UP, touch some grass, then come back!",
    });
  },
});

// Authentication Rate Limiter
const authLimiter = rateLimit({
  windowMs: 7 * 60 * 1000,
  max: 7,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message:
         "7 tries already? You're attacking this API harder than Germany attacked! Wait 7 minutes, drink a 7UP, then try again. ⚽🥤",
    });
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
};