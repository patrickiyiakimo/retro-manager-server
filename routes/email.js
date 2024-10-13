const express = require("express");
const router = express.Router();
const { sendMail } = require("../sendMail"); // Import the sendMail function

router.post("/send-email", (req, res) => {
  const { to, subject, message } = req.body;
  sendMail(to, subject, message);
  res.send("Email sent successfully!");
});

module.exports = router;