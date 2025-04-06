const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { transporter } = require('./config/Email.js');

router.post('/send-message', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Gửi email cho admin
    const adminMailOptions = {
      to: process.env.NODEMAILER_USER,
      subject: 'New Message from User',
      html: `
        <h3>New Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // Gửi email tự động cho người dùng
    const userMailOptions = {
      to: email,
      subject: 'Thank You for Your Message - Tran Thang',
      text: `Hello,\n\nThank you for your Message, we will try to answer you as soon as possible, around 1-7 business days.\n\nBest regards,\nTran Thang\n\n*This is an automated email from the system, please don't respond to this email*`
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Message submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;