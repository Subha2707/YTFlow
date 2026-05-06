const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter – uses Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,        // your Gmail address
    pass: process.env.EMAIL_APP_PASSWORD // Gmail App Password (NOT your normal password)
  }
});

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: `"YTFlow Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,          // sends to yourself
    replyTo: email,                      // so you can reply directly to the sender
    subject: `New Contact Form Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;